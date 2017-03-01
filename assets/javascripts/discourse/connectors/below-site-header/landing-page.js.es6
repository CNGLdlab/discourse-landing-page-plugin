import { ajax } from 'discourse/lib/ajax';
import { withPluginApi } from 'discourse/lib/plugin-api';


const api_key = '0115ca82b81e4884c95ed31a1d0291083599596a5fc377514b57bc7277092742';
const username = 'api_user';
const query_end = `?api_key=${api_key}&api_username=${username}`;

// This is needs to be updated and checked for each instance
const live_category = {
  name: "Live Management",
  id: 16,
  slug: "live-management"
}
const next_category = {
  name: "Next Management",
  id: 17,
  slug: "next-management"
}

var render_page = false;


export default {
  setupComponent(args, component) {
    withPluginApi('0.8', api => initializePlugin(api, component, args));
  }
}

function initializePlugin(api, component, args)
{

  var date = "10:00 - 12:00"
  component.set('today', new Date());
  component.set('time-now', date);
  api.onPageChange((url, title) => {
      //console.log(api.container);
      /**
       *  Can add more endpoints to the list here
       *
      **/
      if (url === '/') {
        render_page = true;

        // get the live_category topic list
        ajax(`/c/${live_category.id}.json${query_end}`).then((res) => {
          getCategoryCallback(res, component, 'live-topics')
        }).catch((e) => {
          console.log(e);
        });

        // get the next_category topic list
        ajax(`/c/${next_category.id}.json${query_end}`).then((res) => {
          getCategoryCallback(res, component, 'next-topics')
        }).catch((e) => {
          console.log(e);
        });
      }
      else {
        render_page = false;
      }
      component.set('render_page', render_page);
  });
}

function getCategoryCallback(result, component, componentString) {
  if (result && result.topic_list) {
    var topics = result.topic_list.topics;
    var time = '';
    var arr = [];
    for (var i = 0; i < topics.length; i++) {
      if (!(topics[i].title.startsWith("About the")) && topics[i].closed == false) {
        arr.push(topics[i]);

        console.log(topics[i]);//var body = topics[i];
      }
    }
    component.set('time-next', time);
    component.set(componentString, arr);
  }
  else {
    // console.log("Could not get category!);
  }
}
