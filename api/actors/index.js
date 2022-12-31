import express from 'express';
import asyncHandler from 'express-async-handler';
import { getPersonMovies, getPerson, getPersonImages, getPopularPeople } from '../tmdb/tmdb-api';

const router = express.Router(); 

router.get('/popular/:page', asyncHandler( async(req, res) => {
    const page = parseInt(req.params.page);
    const actors = await getPopularPeople(page);
    res.status(200).json(actors);
  }));



router.get('/:id', asyncHandler( async(req, res,) => {
  const actor = await getPerson(req.params.id);
  res.status(200).json(actor);
}));

// Get actor movie credits from tmdb
router.get('/:id/movies', asyncHandler( async(req, res,) => {
  const movies = await getPersonMovies(req.params.id);
  res.status(200).json(movies);
}));

// Get actor images from tmdb
router.get('/:id/images', asyncHandler( async(req, res,) => {
  const images = await getPersonImages(req.params.id);
  res.status(200).json(images);
}));


export default router;