import GoldInfo = dataInterface.GoldInfo;
import ClientCode from "../enum/ClientCode";
import NBPClient from "../clients/NBPClient";
import GoldInfoManager from "./GoldInfoManager";
import {ClientInterface} from "../model/ClientInterface";

export default class RequestHandler {

    private regexDatePattern = new RegExp('\\b[0-9]{4}-[0-9]{2}-[0-9]{2}\\b');
    private clientCode: ClientCode = ClientCode.NBP; // initialized value has to be discarded
    private date: Date = new Date(); // initialized value has to be discarded
    private goldInfoManager: GoldInfoManager = new GoldInfoManager();

    //should be passed as parameter, validated and then initialized
    private activeClient: ClientInterface = new NBPClient();

    constructor(){}

    public getApiGold(clientCode: string, date: string): Promise<GoldInfo>{
        if(this.isValidInput(clientCode, date)){
            return this.goldInfoManager.getGoldInfo(this.date, this.activeClient);
        }else{
            return Promise.resolve(GoldInfoManager.getErrorGoldInfo());
        }
    }

    /* vvv   VALIDATIONS   vvv */

    public isValidInput(clientCode: string, date: string): boolean {
        if (this.isValidClient(clientCode)) {
            if(this.isDateValidIsoFormat(date) && this.isDateValidForClient()){
                return true;
            }
        }
        return false;
    }

    private isValidClient(clientCode: string): boolean {
        clientCode = clientCode.toUpperCase();
        let index: number = Object.keys(ClientCode).indexOf(clientCode);
        if (index !== -1) {
            this.clientCode = <ClientCode>clientCode;
            return true;
        }
        return false;
    }

    //validation of shorthand of ISO-8601 format (YYYY-MM-DD)
    private isDateValidIsoFormat(date: string): boolean {
        if (this.regexDatePattern.test(date)) { //invalidates 4ex. "YYYY-M-DD"
            this.date = new Date(date);
            if (!isNaN(this.date.getTime())) {
                return true;
            }
        }
        return false;
    }

    private isDateValidForClient(): boolean {
        let client: ClientInterface = this.getClient(this.clientCode);
        if (client != null) {
            return ((client.getStartDate()<this.date)&&(this.date<client.getEndDate())) ;
        }
        return false;
    }

    // potentially this can be solved better
    private getClient(clientCode: ClientCode): any {
        switch (clientCode) {
            case ClientCode.NBP:
                return new NBPClient();
            default:
                return null;
        }
    }

    // TODO add client specific validation for instance: dates which are not available for each client
}

