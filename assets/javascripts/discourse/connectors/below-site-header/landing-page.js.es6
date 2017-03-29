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

function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  var hoursSpan = clock.querySelector('.hours');
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
    var t = getTimeRemaining(endtime);

    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

function resolveTopic(res, arr, i) {
  const body = res.post_stream.posts[0].cooked;
  let lines = [];
  let time = '';
  let url = '';
  let speakers = [];
  let other = '';
  let description = '';
  let favicon = '';
  let faviconColor = '';
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
    else if (line.startsWith('Favicon:') || line.startsWith('favicon:')) {
      favicon = line.split(':')[1].trim();
    }
    else if (line.startsWith('Favicon-color:') || line.startsWith('favicon-color:') ||
    line.startsWith('Favicon-colour:') || line.startsWith('favicon-colour:')) {
      faviconColor = line.split(':')[1].trim();
    }
  });

  arr[i].url = url;
  arr[i].time = time;
  arr[i].speakers = speakers;
  arr[i].other = other;
  arr[i].description = description;
  arr[i].favicon = favicon;
  arr[i].faviconColor = faviconColor;
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
      else if (line.startsWith('clocktitle')) {
        x = line.split('@')[1].trim();
        type = 'clocktitle';
      }
      if (x !== '') {
        component.set(type, x);
      }
    });
  });

  api.onPageChange((url) => {
    switch (window.location.pathname) {
      case '/':
      case '/categories':
        document.getElementById('main-outlet').style.display = 'none';
        break;
      default:
        document.getElementById('main-outlet').style.display = 'block';
        break;
    }

    if (url === '/' || url === '/categories') {
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


      // clock stuff
      let deadline = new Date(2017, 2, 30, 11, 0, 0);
      setTimeout(function() {
          initializeClock('clockdiv', deadline);
      }, 2000);
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
