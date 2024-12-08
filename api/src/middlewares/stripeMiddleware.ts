import express from 'express';
import rawBody from 'raw-body';

const app = express();

app.use('/stripe/webhook', async (req, res, next) => {
  try {
    req.rawBody = await rawBody(req);
    next();
  } catch (err) {
    res.status(400).send('Unable to parse webhook request body');
  }
});
