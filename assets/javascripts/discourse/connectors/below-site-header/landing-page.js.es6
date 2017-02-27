import { ajax } from 'discourse/lib/ajax';


const api_key = '6d4ecfdab5251a24e6f67a698772b324dc134e8e30b4379f962d39588f8d1497';
const username = 'daniel.turner';
const query_end = `?api_key=${api_key}&api_username=${username}`;

export default {
  setupComponent(args, component) {

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
                  if (!topics[i].closed) {
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
    component.set('today', new Date());
  }
}
