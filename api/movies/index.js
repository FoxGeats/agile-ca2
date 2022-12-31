import express from 'express';
import asyncHandler from 'express-async-handler';
import {getMovies,getMovie, getUpcomingMovies, getTopRatedMovies, getMovieImages } from '../tmdb/tmdb-api';


const router = express.Router(); 

router.get('/home/:page', asyncHandler( async(req, res) => {
    const page = parseInt(req.params.page);
    const Movies = await getMovies(page);
    res.status(200).json(Movies);
  }));



router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await getMovie(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'The resource you requested could not be found.', status_code: 404});
    }
}));




router.get('/tmdb/upcoming/:page', asyncHandler( async(req, res) => {
    const page = parseInt(req.params.page);
    const upcomingMovies = await getUpcomingMovies(page);
    res.status(200).json(upcomingMovies);
  }));


  router.get('/tmdb/topRated/:page', asyncHandler( async(req, res) => {
    const page = parseInt(req.params.page);
    const topRatedMovies = await getTopRatedMovies(page);
    res.status(200).json(topRatedMovies);
}));

router.get('/tmdb/movie/:id/images', asyncHandler( async(req, res) => {
    const images = await getMovieImages(req.params.id);
    res.status(200).json(images);
}));

export default router;