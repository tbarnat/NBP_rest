import DataInterface from "../model/PresentableDataInterface";
import GoldInfo = DataInterface.GoldInfo;
import GoldInfoManager from "../managers/GoldInfoManager";
import HandlerUtils from "./HandlerUtils";
import {HandlerInterface} from "../model/HandlerInterface";

export default class RequestHandler implements HandlerInterface {

    private goldInfoManager: GoldInfoManager = new GoldInfoManager();
    private handlerUtils: HandlerUtils;

    constructor(handlerUtils: HandlerUtils){
        this.handlerUtils = handlerUtils;
    }

    public getApiGold(clientCode: string, date: string): Promise<GoldInfo>{
        if(this.handlerUtils.isValidInput(clientCode, date)){
            return this.goldInfoManager.getGoldInfo(new Date(date), this.handlerUtils.getClientByString(clientCode));
        }else{
            return Promise.resolve(GoldInfoManager.getErrorGoldInfo());
        }
    }


}

