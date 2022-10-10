import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { body } from 'express-validator'
import { logErrorHandler, handleError } from './routes/router-utils.js'
import dbConfig from '../db.config.json.js'
import shortenRouter from './routes/shorten.router.js'
import { originalUrlFor } from './shorten.service.js'

const app = express();


app.use(morgan('tiny', { immediate: true })); // log the moment request hits the server
app.use(morgan('tiny'));
app.use(cors({
    credentials: true,
    origin: [/localhost/] // only localhost for now
}));
app.use(express.json());
app.use('/shorten', shortenRouter)

app.get('/:id', async (req, res, next) => {
    try {
        return res.redirect(await originalUrlFor(req.params.id))
    }
    catch(e) {
        next(e)
    }
})



app.get('/', (req, res) => res.send('Success, running'));

app.get('/test', (req, res) => {
    res.send("Test successful. App is running.")
});


// error handler middleware come last
app.use(logErrorHandler);
app.use(handleError);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('running on port', port));




