import express from 'express';
import RequestHandler from "./managers/RequestHandler";
import GlobalVarialbe from "./model/GlobalVarialbe";

export default class ExpressServer {
    private expServer: any;
    private port = process.env.PORT || 3000;

    constructor() {
        this.expServer = express();
        this.mountRoutes();
        this.listen(this.port)
    }

    private mountRoutes(): void {
        const router = express.Router();

        //passing the information about gold prices for different currencies for specified client
        router.route('/:client/gold/:date').get((req, res) => {
            new RequestHandler().getApiGold(req.params.client, req.params.date).then(goldInfo => {
                if (goldInfo.effectiveDate !== GlobalVarialbe.invalidDate) {
                    res.json(goldInfo);
                } else {
                    res.status(404).send('Data not found');
                }
            })
        });

        //default response: 404
        router.get('/:path', (req, res) => {
            res.status(404).send('Check URL');
        });

        this.expServer.use('/api', router)
    }

    private listen(port: any): void {
        this.expServer.listen(port, (err: any) => {
            if (err) {
                return console.log(err)
            }
        });
        console.log(`server is listening on ${port}`);
    }
}

