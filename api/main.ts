import { app, port } from './lib/infrastructure/webserver';
import { default as createTopicUpdatedConsumer } from './lib/interfaces/events/consumers/topicUpdatedConsumer';
import { default as createTopicMatchFoundConsumer } from './lib/interfaces/events/consumers/chatTopicMatchFoundConsumer';

function createEventConsumers() {
  createTopicUpdatedConsumer();
  createTopicMatchFoundConsumer();
}

function init() {
  createEventConsumers();

  app.listen(port, () => {
    console.log('Started Taboo API', port);
  });
}

init();
