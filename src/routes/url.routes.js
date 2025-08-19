import express from 'express';
import { nanoid } from 'nanoid';
const urlRouter = express.Router();
import { validateMiddleware } from '../middlewares/validate.middleware.js';
import urlSchema from '../validations/url.valdiation.js';
import Url from '../models/url.model.js'; 

urlRouter.post('/', validateMiddleware(urlSchema), async (req, res) => {
  const { originalUrl, clicks } = req.body;
  // Generate a short URL
  const shortUrl = nanoid(10);
  // Save the URL in the database
  const url = { originalUrl, shortUrl, clicks };
  
  await Url.create(url);
  // Send the response
  res.status(200).json({ shortenedUrl: shortUrl });
});
urlRouter.get('/stats', async (req, res) => {
  try {
    const urls = await Url.find().select('-__v');
    res.status(200).json(urls);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
urlRouter.get('/:shortUrl', async (req, res) => {
  try {
    // Find the URL in the database
    const url = await Url.findOne({ shortUrl: req.params.shortUrl });
    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }
    // Increment the click count
    url.clicks += 1;
    await url.save();                                       
    return res.status(200).redirect(url.originalUrl);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default urlRouter;