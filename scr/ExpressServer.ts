import express from 'express';
import RequestHandler from "./handlers/RequestHandler";
import GlobalVarialbe from "./model/GlobalVarialbe";
import DataSource from "./enum/DataSource";
import HandlerUtils from "./handlers/HandlerUtils";
import CacheHandler from "./handlers/CacheHandler";
import ArchiveHandler from "./handlers/ArchiveHandler";
import DataInterface from "./model/PresentableDataInterface";
import DatedObjectInfo = DataInterface.DatedObjectInfo;
import {UrlIdentifier} from "./model/UrlIdentifier";



export default class ExpressServer {
    private expServer: any;
    private port = process.env.PORT || 3000;
    private handlerUtils: HandlerUtils = new HandlerUtils();
    private requestHandler: RequestHandler = new RequestHandler(this.handlerUtils);
    private cacheHandler: CacheHandler = new CacheHandler();
    private archiveHandler: ArchiveHandler = new ArchiveHandler();


    constructor() {
        this.expServer = express();
        this.mountRoutes();
        this.listen(this.port)
    }

    private mountRoutes(): void {
        const router = express.Router();

        //passing the information about gold prices for different currencies for specified client
        router.route('/:client/gold/:date').get((req, res) => {

            let identifier = new UrlIdentifier(req.params.client,'gold',req.params.date);

            let datedObjectInfo: DatedObjectInfo;


            /*//find in archive
            datedObjectInfo= this.archiveHandler.get(identifier)
            if(datedObjectInfo !== null){
                res.json(this.handlerUtils.addDataSourceInfo(datedObjectInfo,DataSource.archive))
            }else{
                //cache/request
            }*/

            //find in cache only
            datedObjectInfo= this.cacheHandler.get(identifier);
            if(datedObjectInfo != null){
                res.json(this.handlerUtils.addDataSourceInfo(datedObjectInfo,DataSource.cache))
            }else{
                this.requestHandler.getApiGold(req.params.client, req.params.date).then(goldInfo => {
                    if (goldInfo.effectiveDate !== GlobalVarialbe.invalidDate) {
                        this.cacheHandler.put(identifier, goldInfo);
                        res.json(this.handlerUtils.addDataSourceInfo(goldInfo,DataSource.request));
                    } else {
                        res.status(404).send('Data not found');
                    }
                })
            }
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

