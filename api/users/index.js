import express from 'express';
import User from './userModel';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import movieModel from '../movies/movieModel';



const router = express.Router(); // eslint-disable-line

// Get all users
router.get('/', async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

// Register OR authenticate a user
router.post('/',asyncHandler( async (req, res, next) => {
    if (!req.body.username || !req.body.password) {
      res.status(401).json({success: false, msg: 'Please pass username and password.'});
      return next();
    }
    if (req.query.action === 'register') {
      await User.create(req.body);
      if(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(req.body.password)){
      res.status(201).json({code: 201, msg: 'Successful created new user.'});
    }else{
        res.status(401).json({success: false, msg: 'passwords are at least 5 characters long and contain at least one number and one letter.'});
        return next();
    }
    } else {
      const user = await User.findByUserName(req.body.username);
        if (!user) return res.status(401).json({ code: 401, msg: 'Authentication failed. User not found.' });
        user.comparePassword(req.body.password, (err, isMatch) => {
          if (isMatch && !err) {
            // if user is found and password matches, create a token
            const token = jwt.sign(user.username, process.env.SECRET);
            // return the information including token as JSON
            res.status(200).json({success: true, token: 'BEARER ' + token});
          } else {
            res.status(401).json({code: 401,msg: 'Authentication failed. Wrong password.'});
          }
        });
      }
  }));

  // Update a user
  router.put('/:id', async (req, res) => {
    if (req.body._id) delete req.body._id;
    const result = await User.updateOne({
        _id: req.params.id,
    }, req.body);
    if (result.matchedCount) {
        res.status(200).json({ code:200, msg: 'User Updated Sucessfully' });
    } else {
        res.status(404).json({ code: 404, msg: 'Unable to Update User' });
    }
});

//Add a favourite. No Error Handling Yet. Can add duplicates too!
router.post('/:userName/favourites', asyncHandler(async (req, res) => {
    const newFavourite = req.body.movie;
    const userName = req.params.userName;
    const movie = await movieModel.findByMovieDBId(newFavourite);
    const user = await User.findByUserName(userName);
    if(!user.favourites.includes(movie.id)){
    await user.favourites.push(movie.id);
    await user.save(); 
    res.status(201).json(user); 
}else
{
    res.status(401).json({success: false, msg: 'Can not add duplicates.'});
    
}

  }));
  router.get('/:userName/favourites', asyncHandler( async (req, res) => {
    const userName = req.params.userName;
    const user = await User.findByUserName(userName);
    res.status(200).json(user.favourites);
  }));


//Delete a favourite
router.post('/:username/movie/:id/favourites', asyncHandler(async (req, res) => {
  const newFavourite = req.params.id;
  const userName = req.params.username;
  const user = await User.findByUserName(userName);
  const index = user.favourites.indexOf(newFavourite)
  await user.favourites.splice(index, 1);
  await user.save(); 
  return res.status(201).json(user); 
}));

export default router;