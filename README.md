
# Assignment 2 - Agile Software Practice.
​
Name: Shu Chen
Student Number: 20099883
​
## API endpoints.

### Genres
+ /api/genres/ | GET | Gets all genres from tmdb
### Movies
+ /api/movies/home/:page | GET | Gets discover movie from tmdb based on page number
+ /api/movies/:id | GET | Gets a single movie from tmdb
+ /api/movies/tmdb/upcoming/:page | GET | Get upcoming movies from tmdb based on page number
+ /api/movies/tmdb/topRated/:page | GET | Get top rated movies from tmdb based on page number
+ /api/movies/tmdb/movie/:id/images | GET | Get movie images from tmdb

### Users
+ /api/users/ | GET | Gets all users information from MongoDB
+ /api/users/ | POST | Registers/authenticates a user
+ /api/users/:id | Put | Updates information about a user
+ /api/users/:userName/favourites | GET | Gets users favourites
+ /api/users/:userName/favourites | POST | Add a favourite movieId to user's favourites
+ /api/users/:username/movie/:id/favourites | POST | Deletes a movieId from a user's favourites

### Actors
+ /api/actors/popular | GET | Gets popular actors from movies-api
+ /api/actors/:id | GET | Gets detailed information of an actor from movies-api
+ /api/actors/:id/images | GET | Gets actor images from movies-api
### Reviews
+ /api/reviews/movie/:id/reviews | GET | Gets a movie reviews
+ /api/reviews/movie/:id/reviews/:username | POST | posts or updates a review


## Test cases.

 Users endpoint
    GET /api/users
database connected to movies on ac-qwijndm-shard-00-02.zrczo3w.mongodb.net
      √ should return the 2 users and a status 200
    POST /api/users 
      For a register action
        when the payload is correct
          √ should return a 201 status and the confirmation message (184ms)
      For an authenticate action
        when the payload is correct
          √ should return a 200 status and a generated token (167ms)
    POST /api/users/:username/favourites
      for valid user name
        when the movie is not in favourites
          √ should return user message and a status 201 (131ms)
        when the movie is in favourites
          √ return error message and a status 401 (102ms)
      for invalid user name
        √ return error message and a status 500
    GET /api/users/:username/favourites
      √ should return the favourites list and status 200
    POST /api/users/:username/movie/:id/favourites
      for valid user name
        when the movie is in favourites
          √ should return user message and a status 201 (60ms)
        when the movie is not in favourites
          √ return error message and a status 404
      for invalid user name
        √ return error message and a status 404

  Movies endpoint
    GET /api/movies
      √ should return 20 movies and a status 200 (160ms)
    GET /api/movies/:id
      when the id is valid
        √ should return the matching movie
      when the id is invalid
        √ should return the NOT found message
    GET /api/movies/tmdb/upcoming/:page
      when the page is valid number
        √ should return 20 movies of corresponding page from tmdb and a status 200 (177ms)
      when the page is an invalid character
        √ should return a status 404 and the corresponding message
    GET /api/movies/tmdb/topRated/:page
      when the page is valid number
        √ should return 20 movies of corresponding page from tmdb and a status 200 (148ms)
      when the page is an invalid character
        √ should return a status 404 and the corresponding message
    GET /api/movies/movie/:id/images
      when the id is valid number
        √ should return an object containing the images and status 200 (157ms)
      when the id is not number
        √ should return a status 403 and the corresponding message

  Reviews endpoint
    GET /api/reviews/movie/:id/reviews
      when the id is valid
        √ should a object contains a list of the reviews of the movie and a status 200 (192ms)
      when movie id is invalid characters like letters
        √ should return a status 403 and the corresponding message
      when movie id is invalid
        √ should return a status 404 and the corresponding message (188ms)
    POST /api/reviews/movie/:id/reviews/:username
      when the id is valid
        for both the author and content are not empty
          √ should a object contains a list of the reviews of the movie and a status 200 (131ms)
        for author is not empty and content is empty
          √ should return a status 403 and the corresponding message (92ms)
        when movie id is invalid
          √ should return a status 404 and the corresponding message (172ms)

  Genres endpoint
    GET /api/genres/
failed to Load user Data: ReferenceError: genres is not defined
      √ should return a list of genres and a status 200 (78ms)

  People endpoint
    GET /api/actors/popular
      √ should return 20 people and a status 200 (87ms)
    GET /api/actors/:id
      for valid id
        √ should an object of people and a status 200 (82ms)
        for invalid id
          √ should return the NOT found message
    GET /api/actors/:id/images
      for a valid id
        √ should return a person's images from tmdb and a status 200 (91ms)
      for an invalid id
        √ should return error message and a status 403
    GET /api/actors/:id/movies
      for a valid id
        √ should return a person's movie credits from tmdb and a status 200 (110ms)
        for an invalid id
          √ should return error message and a status 404     

## Coveralls.

---|---------|----------|---------|---------|-------------------
... | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s

---|---------|----------|---------|---------|-------------------
... |   83.21 |    72.64 |   81.48 |    83.5 |                  

 ... |   96.42 |       50 |     100 |   96.42 |                 
 
   |   96.42 |       50 |     100 |   96.42 | 18                
 ... |     100 |      100 |     100 |     100 |                 
 
   |     100 |      100 |     100 |     100 |                   
   |     100 |      100 |     100 |     100 |                   
 ... |     100 |      100 |     100 |     100 |                 
 
   |     100 |      100 |     100 |     100 |                   
   |     100 |      100 |     100 |     100 |                   
 ... |     100 |      100 |     100 |     100 |                 
 
   |     100 |      100 |     100 |     100 |                   
   |     100 |      100 |     100 |     100 |                   
   |     100 |      100 |     100 |     100 |                   
 ... |   81.01 |     72.5 |   88.88 |   79.62 |                 
 
   |   80.55 |     72.5 |     100 |   79.16 | 38,47,55-66       
   |   85.71 |      100 |       0 |   83.33 | 17                
 ... |    77.5 |    54.16 |   76.31 |   75.67 |                 
 
   |    77.5 |    54.16 |   76.31 |   75.67 | ...28,134,143,148 
 ... |   85.18 |    76.81 |   90.32 |   85.39 |                 
 
   |   84.54 |    77.96 |      88 |   84.61 | 20,26,30,43,51-59 
   |      88 |       70 |     100 |    87.5 | 20,31,35          
 ... |   66.66 |        0 |      25 |   73.68 |                 
 
   |   66.66 |        0 |      25 |   73.68 | 15-20             
 ... |   81.81 |      100 |   33.33 |   81.81 |                 
 
   |   81.81 |      100 |   33.33 |   81.81 | 11,14             
 ... |   30.95 |     7.14 |       0 |    42.3 |                 
 
   |   19.44 |     7.14 |       0 |   31.81 | 10-30,35-36       
   |     100 |      100 |     100 |     100 |                   
   |     100 |      100 |     100 |     100 |                   
---|---------|----------|---------|---------|-------------------

## Independent Learning 
+ https://coveralls.io/gitlab/FoxGeats/agile-ca2?branch=develop
+ [![Coverage Status](https://coveralls.io/repos/gitlab/FoxGeats/agile-ca2/badge.svg?branch=develop)](https://coveralls.io/gitlab/FoxGeats/agile-ca2?branch=develop)

## Other related links
+ gitlab: https://gitlab.com/FoxGeats/agile-ca2.git
+ github: https://github.com/FoxGeats/agile-ca2.git
+ HEROKU Staging App: https://dashboard.heroku.com/apps/agile-ca2-sc
+ HEROKU Production App: https://dashboard.heroku.com/apps/agile-ca2-sc-production
+ Coverall: https://coveralls.io/gitlab/FoxGeats/agile-ca2?branch=develop