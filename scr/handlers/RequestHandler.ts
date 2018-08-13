import GoldInfoManager from "../managers/GoldInfoManager";
import HandlerUtils from "./HandlerUtils";
import {HandlerInterface} from "../model/HandlerInterface";
import GoldDatedInfo from "../model/GoldDatedInfo";

export default class RequestHandler implements HandlerInterface {

    private goldInfoManager: GoldInfoManager = new GoldInfoManager();
    private handlerUtils: HandlerUtils;

    constructor(handlerUtils: HandlerUtils){
        this.handlerUtils = handlerUtils;
    }

    public getApiGold(clientCode: string, date: string): Promise<GoldDatedInfo>{
        if(this.handlerUtils.isValidInput(clientCode, date)){
            return this.goldInfoManager.getGoldInfoRequest(new Date(date), this.handlerUtils.getClientByString(clientCode));
        }else{
            return Promise.resolve(GoldInfoManager.getErrorGoldInfo());
        }
    }


}

