import userModel from '../api/users/userModel';
import users from './users';
import dotenv from 'dotenv';
import movies from './movies';
import movieModel from '../api/movies/movieModel';
dotenv.config();

// deletes all user documents in collection and inserts test data
async function loadUsers() {
  console.log('load user Data');
  try {
    await userModel.deleteMany();
    await users.forEach(user => userModel.create(user));
    console.info(`${users.length} users were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load user Data: ${err}`);
  }
}
export async function loadMovies() {
  console.log('load seed data');
  
  try {
    await movieModel.deleteMany();
    await movieModel.collection.insertMany(movies);
    console.info(`${movies.length} Movies were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load movie Data: ${err}`);
  }
}

if (process.env.SEED_DB == 'true') {
  loadUsers();
loadMovies();
}