import e from 'express';
import express from 'express';
import asyncHandler from 'express-async-handler';
import { getPersonMovies, getPerson, getPersonImages, getPopularPeople } from '../tmdb/tmdb-api';

const router = express.Router(); 
const imgId= /^[0-9]*[1-9][0-9]*$/;
router.get('/popular', asyncHandler( async(req, res) => {
   
    const actors = await getPopularPeople();
    res.status(200).json(actors);
  }));



router.get('/:id', asyncHandler( async(req, res,) => {
  const actor = await getPerson(req.params.id);
  res.status(200).json(actor);
}));

// Get actor movie credits from tmdb
router.get('/:id/movies', asyncHandler( async(req, res,) => {
  if (imgId.test(req.params.id)) {
  const movies = await getPersonMovies(req.params.id);
  res.status(200).json(movies);
  }else{
    res.status(403).json({message: 'Invalid actor id.', status_code: 403});
  }
}));

// Get actor images from tmdb
router.get('/:id/images', asyncHandler( async(req, res,) => {
  if (imgId.test(req.params.id)) {
  const images = await getPersonImages(req.params.id);
  res.status(200).json(images);
  }
  else{
    res.status(403).json({message: 'Invalid actor id.', status_code: 403});
  }
}));


export default router;