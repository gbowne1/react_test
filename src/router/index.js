import { app as appController } from '/router/controllers/appController.js';
import { appItems as appItemsController } from '/controllers';

export default (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the app API!',
  }));

  app.post('/api/app', appController.create);
  app.get('/api/app', appController.list);
  app.get('/api/app/:appId', appController.retrieve);
  app.put('/api/app/:appId', appController.update);
  app.delete('/api/app/:appId', appController.destroy);

  app.post('/api/app/:appId/items', appItemsController.create);
  app.put('/api/app/:appId/items/:appItemId', appItemsController.update);
  app.delete(
    '/api/app/:appId/items/:appItemId', appItemsController.destroy
  );

  // For any other request method on app items, we're going to return "Method Not Allowed"
  app.all('/api/app/:appId/items', (req, res) =>
    res.status(405).send({
      message: 'Method Not Allowed',
  }));
};
