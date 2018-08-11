import ClientCode from "../enum/ClientCode";
import CurrencyCode from "../enum/CurrencyCode";
import {ClientInterface} from "../model/ClientInterface";

import * as request from "request-promise-native"
import DataInterface from "../model/DataInterface";
import ItemPrice = DataInterface.ItemPrice;

export default class NBPClient implements ClientInterface {

    private httpsEndpoint: string = 'http://api.nbp.pl/api/';
    //example: http://api.nbp.pl/api/cenyzlota/2018-01-04/?format=json
    //example: http://api.nbp.pl/api/exchangerates/rates/A/USD/2018-07-12/?format=json

    private readonly startDate = new Date('2013-01-02');
    private readonly endDate = new Date();

    public constructor() {
        this.request = this.request.bind(this)
    }

    public request(path: string): Promise<any> {
        return request.get(this.httpsEndpoint+path)
            .then(res => {
                return JSON.parse(res);
            }).catch(err => {
                    console.log('ERROR:'+err);
                    return err
                }
            )
    }

    //http://api.nbp.pl/api/cenyzlota/2018-07-12/?format=json
    public getGoldPrice(date: Date): Promise<number> {
        let isoDate = (date.toISOString()).substring(0, 10);
        return this.request(`cenyzlota/${isoDate}/?format=json`)
            .then(value => {
                return value[0].cena
            }).catch((err) => {
                return err;
            })
    }

    // convert table of promises into promise of table
    public getExchangeRates(date: Date, currencyCodes: CurrencyCode[]): Promise<ItemPrice[]> {
        let rates: Promise<ItemPrice>[] = [];
        currencyCodes.forEach(code => {
            rates.push(this.getSingleExchangeRate(date, code))
        });
        return Promise.all(rates).then(value => {
            return value;
        }).catch((err) => {
            return err;
        })
    }

    //http://api.nbp.pl/api/exchangerates/rates/A/USD/2018-07-12/?format=json
    private getSingleExchangeRate(date: Date, code: CurrencyCode): Promise<ItemPrice> {
        let isoDate = (date.toISOString()).substring(0, 10);
        return this.request(`exchangerates/rates/A/${code}/${isoDate}/?format=json`)
            .then(value => {
                return {
                    "currency": code.valueOf(),
                    "price": value.rates[0].mid
                }
            }).catch((err) => {
                return err;
            })
    }

    /*private getSingleExchangeRate(date: Date, code: CurrencyCode): Promise<number> {
        let isoDate = (date.toISOString()).substring(0, 10);
        return this.request(`/exchangerates/rates/A/${code}/${isoDate}/?format=json`)
            .then(value => {
                return value.rates[0].mid
            }).catch((err) => {
                return err;
            })
    }*/

    public getStartDate(): Date {
        return this.startDate;
    }

    public getEndDate(): Date {
        return this.endDate;
    }

    //static method cannot be passed to interfaces - think of work around
    public getClientCode(): ClientCode {
        return ClientCode.NBP;
    }

    public static getClientCode(): ClientCode {
        return ClientCode.NBP;
    }

}