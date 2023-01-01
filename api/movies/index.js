import express from 'express';
import asyncHandler from 'express-async-handler';
import {getMovies, getUpcomingMovies, getTopRatedMovies, getMovieImages } from '../tmdb/tmdb-api';
import movieModel from './movieModel';

const router = express.Router(); 
const pageReg = /^[1-9]+.?[1-9]*$/;
const imgId= /^[0-9]*[1-9][0-9]*$/;

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




router.get('/tmdb/upcoming/:page', asyncHandler( async(req, res) => {
    if (pageReg.test(req.params.page)) {
    const page = parseInt(req.params.page);
    const upcomingMovies = await getUpcomingMovies(page);
    res.status(200).json(upcomingMovies);
    }else{
        res.status(404).json({message: 'The resource you requested could not be found.', status_code: 404});
    }
  }));


  router.get('/tmdb/topRated/:page', asyncHandler( async(req, res) => {
    if (pageReg.test(req.params.page)) {
        const page = parseInt(req.params.page);
    const topRatedMovies = await getTopRatedMovies(page);
    res.status(200).json(topRatedMovies);
    }else{
        res.status(404).json({message: 'The resource you requested could not be found.', status_code: 404});

    }
}));

router.get('/tmdb/movie/:id/images', asyncHandler( async(req, res) => {
    if (imgId.test(req.params.id)) {
    const images = await getMovieImages(req.params.id);
    res.status(200).json(images);
    }else{
        res.status(403).json({message: 'Invalid movie id.', status_code: 403});
    }
}));

export default router;