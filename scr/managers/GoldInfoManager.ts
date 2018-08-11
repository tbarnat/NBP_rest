import GoldInfo = dataInterface.GoldInfo;
import ItemPrice = dataInterface.ItemPrice;
import GlobalVarialbe from "../model/GlobalVarialbe";

import ExchangeRateManager from "./ExchangeRateManager";
import "isomorphic-fetch"
import {ClientInterface} from "../model/ClientInterface";

export default class GoldInfoManager {

    private readonly effectiveDate: Date;
    private activeClient: ClientInterface;
    private exchangeRateManager: ExchangeRateManager;

    constructor(date: Date, client: ClientInterface) {
        this.exchangeRateManager = new ExchangeRateManager(date, client);
        this.effectiveDate = date;
        this.activeClient = client;
    }

    public getGoldInfo(): Promise<GoldInfo> {
        return this.getGoldPrices().then(goldPrices => {
            let goldInfoJson = JSON.stringify({
                date: (this.effectiveDate.toISOString()).substring(0, 10),
                goldPrices: goldPrices
            });
            //console.log(goldInfoJson);//VVV
            return JSON.parse(goldInfoJson);
        });
    }

    public getGoldPrices(): Promise<ItemPrice[]> {

        // IT IS QUICKER, BUT LESS LEGIBLE (NO TYPE HANDICAP)
        let rawInfo: Promise<any>[] = [];
        rawInfo.push(this.activeClient.getGoldPrice(this.effectiveDate));
        rawInfo.push(this.exchangeRateManager.getExchangeRates());

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

        /*IT IS EASY TO READ, BUT IT IS SEQUENTIAL
        let goldPriceInPLN: number;
        return this.activeClient.getGoldPrice(this.effectiveDate).then(value => {
            goldPriceInPLN = value;
            return this.exchangeRateManager.getExchangeRates()
        }).then(value => {
            return value.map(item => {

                return {
                    "currency": item.currency,
                    "price": item.price * goldPriceInPLN
                }
            })
        }).catch((err) => {
            return err;
        })*/
    }

    //Error JSON is recognized to signal 404 response
    public static getErrorGoldInfo(): GoldInfo {
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