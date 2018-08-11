import BaseCurrencies from "../model/BaseCurrencies";
import {ClientInterface} from "../model/ClientInterface";
import ItemPrice = dataInterface.ItemPrice;


export default class ExchangeRateManager {

    constructor() {}

    // all rates are referenced to PLN (4ex. EUR/PLN)
    public getExchangeRates(effectiveDate: Date, activeClient: ClientInterface): Promise<ItemPrice[]>{
        return activeClient.getExchangeRates(effectiveDate, BaseCurrencies.getTable());
    }

}

