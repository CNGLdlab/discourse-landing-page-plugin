import { ajax } from 'discourse/lib/ajax';
import { withPluginApi } from 'discourse/lib/plugin-api';


const api_key = '6d4ecfdab5251a24e6f67a698772b324dc134e8e30b4379f962d39588f8d1497';
const username = 'daniel.turner';
const query_end = `?api_key=${api_key}&api_username=${username}`;

var render_page = false;


export default {
  setupComponent(args, component) {
    withPluginApi('0.8', api => initializePlugin(api, component));

    var categoryId;
    var live_topics;

    ajax(`/categories.json${query_end}`).then((result) => {

      if (result) {
        var categories = result.category_list.categories;
        categories.forEach(function(element, index, array) {
          if(element.name === 'Live') {
            categoryId = element.id;

            ajax(`/c/${categoryId}.json${query_end}`).then((cat) => {
              if (cat && cat.topic_list) {
                var topics = cat.topic_list.topics;
                var result = [];
                for (var i = 0; i < topics.length; i++) {
                  if (!(topics[i].title === "About the Live category")) {
                    result.push(topics[i]);
                  }
                }
                component.set('topics', result);
              }
            });
          }
        });
      }
      else {

      }
    });

    var date = "10:00 - 12:00"
    component.set('today', new Date());
    component.set('time', date);
  }
}

function initializePlugin(api, component)
{
  api.onPageChange((url, title) => {
      console.log('bla bla');

      if (url === "/") {
        render_page = true;
      }
      else {
        render_page = false;
      }
      component.set('render_page', render_page);
  });
}
