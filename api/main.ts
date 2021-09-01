import { app, port } from './lib/infrastructure/webserver';

function init() {
  app.listen(port, () => {
    console.log('Started Taboo API', port);
  });
}

init();
