import ClientCode from "../enum/ClientCode";
import NBPClient from "../clients/NBPClient";
import {ClientInterface} from "../model/ClientInterface";
import DataSource from "../enum/DataSource";
import DataInterface from "../model/PresentableDataInterface";
import Presentable = DataInterface.Presentable;
import ObjectDatedInfo from "../model/ObjectDatedInfo";



export default class HandlerUtils{

    private date: Date = new Date(); // initialized value has to be discarded
    private regexDatePattern = new RegExp('\\b[0-9]{4}-[0-9]{2}-[0-9]{2}\\b');
    private clientCode: ClientCode = ClientCode.NBP; // initialized value has to be discarded

    private nbp: ClientInterface = new NBPClient();

    constructor(){}

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
        let client: ClientInterface = this.getClientByCode(this.clientCode);
        if (client != null) {
            return ((client.getStartDate()<this.date)&&(this.date<client.getEndDate())) ;
        }
        return false;
    }
    // TODO add client specific validation for instance: dates which are not available for each client


    /* vvv   MODIFY OBJECT FOR PRESENTATION   vvv */

    public present(objectDatedInfo: ObjectDatedInfo, dataSource: DataSource): Presentable{
        return {
            dataSource: dataSource,
            objectDatedInfo: this.limitExposure(objectDatedInfo)
        }
    }

    // method returns copy of object without this.dateCreated key
    private limitExposure(objectDatedInfo: ObjectDatedInfo): any{

        let duplicate: any = {};
        console.log('jestem');
        Object.keys(objectDatedInfo).forEach(key => {
            if(key != 'dateCreated'){
                duplicate[key] = objectDatedInfo[key];
                console.log('ping');
            }
        });
        return duplicate;
    }

    /* vvv   RETURN CLIENT   vvv */

    // there might be a better way to associate ClientCode this Client class
    private getClientByCode(clientCode: ClientCode): any {
        switch (clientCode) {
            case ClientCode.NBP:
                return this.nbp;
            default:
                return null;
        }
    }

    public getClientByString(clientCode: string): any{
        return this.getClientByCode(<ClientCode> clientCode.toUpperCase());
    }

}