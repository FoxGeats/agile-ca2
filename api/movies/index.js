import express from 'express';
import asyncHandler from 'express-async-handler';
import {getMovies, getUpcomingMovies, getTopRatedMovies, getMovieImages } from '../tmdb/tmdb-api';
import movieModel from './movieModel';

const router = express.Router(); 

router.get('/', asyncHandler( async(req, res) => {
   
    const Movies = await getMovies();
    res.status(200).json(Movies);
  }));



router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await movieModel.findByMovieDBId(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'The resource you requested could not be found.', status_code: 404});
    }
}));




router.get('/tmdb/upcoming', asyncHandler( async(req, res) => {
    
    const upcomingMovies = await getUpcomingMovies();
    res.status(200).json(upcomingMovies);
  }));


  router.get('/tmdb/topRated', asyncHandler( async(req, res) => {
    
    const topRatedMovies = await getTopRatedMovies();
    res.status(200).json(topRatedMovies);
}));

router.get('/tmdb/movie/:id/images', asyncHandler( async(req, res) => {
    const images = await getMovieImages(req.params.id);
    res.status(200).json(images);
}));

export default router;