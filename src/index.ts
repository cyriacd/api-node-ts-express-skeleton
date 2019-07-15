import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as HttpStatus from 'http-status-codes';
// import RouteManger from './routes/RouteManger'

const app = express();

app.use(bodyParser.json());
app.get('*', (req: express.Request, res: express.Response) => {
    res.status(HttpStatus.NOT_FOUND).json({
        "status": 404
    });
});

const port = process.env.PORT || 8080;

app.listen(port, (): void => {
    console.log(`Listening on port: ${port}`);
})