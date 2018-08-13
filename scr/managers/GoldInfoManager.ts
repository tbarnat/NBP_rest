import DataInterface from "../model/PresentableDataInterface";
import ItemPrice = DataInterface.ItemPrice;
import GlobalVarialbe from "../model/GlobalVarialbe";
import ExchangeRateManager from "./ExchangeRateManager";
import {ClientInterface} from "../model/ClientInterface";
import {GoldInfoMap} from "../model/HandlerInterface";
import GoldDatedInfo from "../model/GoldDatedInfo";
import ObjectDatedInfo from "../model/ObjectDatedInfo";

export default class GoldInfoManager {

    private exchangeRateManager: ExchangeRateManager = new ExchangeRateManager();
    private goldCacheMap: GoldInfoMap = {};
    private goldArchiveMap: GoldInfoMap = {};

    constructor() {}

    public getGoldInfoRequest(effectiveDate: Date, activeClient: ClientInterface): Promise<GoldDatedInfo> {
        return this.getGoldPrices(effectiveDate, activeClient).then(goldPrices => {
            let goldInfoJson = JSON.stringify({
                effectiveDate: (effectiveDate.toISOString()).substring(0, 10),
                goldPrices: goldPrices
            });
            //console.log(goldInfoJson);//VVV
            return JSON.parse(goldInfoJson);
        });
    }

    public getGoldPrices(effectiveDate: Date, activeClient: ClientInterface): Promise<ItemPrice[]> {

        // TODO define type
        let rawInfo: Promise<any>[] =
            [ activeClient.getGoldPrice(effectiveDate),
                this.exchangeRateManager.getExchangeRates(effectiveDate, activeClient)];

        return Promise.all(rawInfo).then(value => {
            let goldPriceInPLN: number = value[0];
            return value[1].map((item: any) => {
                return {
                    "currency": item.currency,
                    "price": item.price * goldPriceInPLN
                }
            })
        }).catch((err) => {
            return err;
        });
    }

    public getGoldInfoCache(key: string):GoldDatedInfo {
        return this.goldCacheMap[key];
    }

    public putGoldInfoCache(key: string, objectDatedInfo: ObjectDatedInfo){
        let goldInfo = objectDatedInfo as GoldDatedInfo;
        if(this.isNotNullShortHand(goldInfo)){
            this.goldCacheMap[key] = goldInfo;
            console.log('cached value for: '+key);
        }
    }

    public getCacheMap(): GoldInfoMap{
        return this.goldCacheMap;
    }

    //temporary solution (checking fo null should have separate workflow with supplementation)
    //this method should be moved to GoldDatedInfo recognized as class
    private isNotNullShortHand(goldInfo: GoldDatedInfo): boolean{
        if( goldInfo.effectiveDate == null){
            return false;
        }
        let isNotNull:boolean = true;
        goldInfo.goldPrices.forEach(goldPrice => {
            if(goldPrice.price == null){
                isNotNull = false;
            }
        });
        return isNotNull;
    }

    //Invalid JSON is associated with 404 response
    public static getErrorGoldInfo(): GoldDatedInfo {
        let goldInfoJson = JSON.stringify({
            effectiveDate: GlobalVarialbe.invalidDate,
            goldPrices: {
                "currency": "XXX",
                "price": 0
            }
        });
        return JSON.parse(goldInfoJson);
    }
}