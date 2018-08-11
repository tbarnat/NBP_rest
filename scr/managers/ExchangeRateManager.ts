import BaseCurrencies from "../model/BaseCurrencies";
import "isomorphic-fetch"
import {ClientInterface} from "../model/ClientInterface";
import ItemPrice = dataInterface.ItemPrice;


export default class ExchangeRateManager {

    private readonly effectiveDate: Date;
    private activeClient: ClientInterface;

    constructor(date: Date, client: ClientInterface) {
        this.effectiveDate = date;
        this.activeClient = client;
    }

    // all rates are referenced to PLN (4ex. EUR/PLN)
    public getExchangeRates(): Promise<ItemPrice[]>{
        return this.activeClient.getExchangeRates(this.effectiveDate, BaseCurrencies.getTable());
    }

}

