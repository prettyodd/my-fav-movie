import express from 'express';
import mongoose from 'mongoose';
import { 
    addNewUser,
    addNewMovie,
    loadSingleMovieData,
    editReview
} from '../controllers/userController';

// mongoose setuo
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/CRMdb', {
    useMongoClient: true
});

const Routes = express.Router();

// home route
Routes.get('/', (req, res) => {
    res.send(`home. api data render with mongoose`)
});
Routes.post('/', addNewUser);

// /movie route
Routes.get('/movie', (req, res) => {
    res.send('movie. api data render with mongoose')
});

Routes.get('/movie/:id', loadSingleMovieData)
Routes.post('/movie/:id', addNewMovie)
Routes.put('/movie/:id/:_id', editReview)

export default Routes;
