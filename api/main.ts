import { app, port } from './lib/infrastructure/webserver';
import { default as createTopicUpdatedConsumer } from './lib/interfaces/events/consumers/topicUpdated';

function createEventConsumers() {
  createTopicUpdatedConsumer();
}

function init() {
  createEventConsumers();

  app.listen(port, () => {
    console.log('Started Taboo API', port);
  });
}

init();
