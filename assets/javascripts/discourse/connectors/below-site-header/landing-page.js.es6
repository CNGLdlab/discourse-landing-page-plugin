import {ajax} from 'discourse/lib/ajax';
import {withPluginApi} from 'discourse/lib/plugin-api';


const apiKey = '0115ca82b81e4884c95ed31a1d0291083599596a5fc377514b57bc7277092742';
const username = 'api_user';
const queryEnd = `?api_key=${apiKey}&api_username=${username}`;

const apiAccess = {api_key: apiKey, api_username: username};
let renderPage = false;
// This is needs to be updated and checked for each instance
const liveCategory = {
  name: 'Live Management',
  id: 16,
  slug: 'live-management',
};
const nextCategory = {
  name: 'Next Management',
  id: 17,
  slug: 'next-management',
};


function resolveTopic(res, arr, i) {
  const body = res.post_stream.posts[0].cooked;
  let lines = [];
  let time = '';
  let url = '';
  let speakers = [];
  let other = '';
  let description = '';
  lines = body.split('<br>');
  lines.forEach((text) => {
    let line = text;
    line = line.replace('<p>', '');
    line = line.replace('</p>', '');
    line = line.trim();
    if (line.startsWith('Actual URL:' || line.startsWith('URL:') || line.startsWith('url:'))) {
      url = line.split(':')[1].trim();
    }
    else if (line.startsWith('Time=') || line.startsWith('time=')) {
      time = line.split('=')[1].trim();
    }
    else if (line.startsWith('Speakers:') || line.startsWith('speakers:')) {
      speakers = line.split(':')[1].trim().split(',');
      if (speakers.length === 1 && speakers[0] === '') {
        speakers = [];
      }
    }
    else if (line.startsWith('Other:') || line.startsWith('other:')) {
      other = line.split(':')[1].trim();
    }
    else if (line.startsWith('Description:') || line.startsWith('description:')) {
      description = line.split(':')[1].trim();
    }
  });
  arr[i].url = url;
  arr[i].time = time;
  arr[i].speakers = speakers;
  arr[i].other = other;
  arr[i].description = description;
}

function getCategoryCallback(result, component, componentString) {
  if (result && result.topic_list) {
    const topics = result.topic_list.topics;
    const arr = [];
    const topicPromiseArr = [];
    for (let i = 0; i < topics.length; i += 1) {
      if (!(topics[i].title.startsWith('About the')) && topics[i].closed === false) {
        arr.push(topics[i]);
        const p1 = ajax(`/t/${topics[i].id}.json${queryEnd}`);
        topicPromiseArr.push(p1);
      }
    }
    Promise.all(topicPromiseArr).then((values) => {
      values.forEach((value, index) => {
        resolveTopic(value, arr, index);
      });
    }).then(() => {
      component.set(componentString, arr);
    }).catch((e) => {
      console.log('Promise error:');
      console.log(e);
    });
  }
}

function initializePlugin(api, component) {
  ajax({
    url: '/t/139.json',
    data: apiAccess,
  }).then((res) => {
    let body = res.post_stream.posts[0].cooked;
    body = body.replace('<p>', '');
    body = body.replace('</p>', '');
    const lines = body.split('<br>');
    lines.forEach((line) => {
      let x = '';
      let type = '';
      if (line.startsWith('video')) {
        x = line.split('@')[1].trim();
        type = 'video';
      }
      else if (line.startsWith('image')) {
        x = line.split('@')[1].trim();
        type = 'image';
      }
      else if (line.startsWith('other')) {
        x = line.split('@')[1].trim();
        type = 'other';
      }
      if (x !== '') {
        component.set(type, x);
        console.log(type);
        console.log(x);
      }
    });
  });

  api.onPageChange((url) => {
    // console.log(api.container);
    /**
     *  Can add more endpoints to the list here
     *
    **/
    if (url === '/' || url === '/latest') {
      renderPage = true;

      // get the live_category topic list
      ajax(`/c/${liveCategory.id}.json${queryEnd}`).then((res) => {
        getCategoryCallback(res, component, 'live-topics');
      }).catch((e) => {
        console.log('A liveCategory error occurred: ');
        console.log(e);
      });

      // get the next_category topic list
      ajax(`/c/${nextCategory.id}.json${queryEnd}`).then((res) => {
        getCategoryCallback(res, component, 'next-topics');
      }).catch((e) => {
        console.log('A nextCategory error occurred: ');
        console.log(e);
      });
    }
    else {
      renderPage = false;
    }
    component.set('renderPage', renderPage);
  });
}

export default {
  setupComponent(args, component) {
    withPluginApi('0.8', api => initializePlugin(api, component, args));
  },
};
