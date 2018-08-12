import ClientCode from "../enum/ClientCode";
import CurrencyCode from "../enum/CurrencyCode";
import DataInterface from "./PresentableDataInterface";
import ItemPrice = DataInterface.ItemPrice;

export interface ClientInterface {

    getStartDate(): Date;

    getEndDate(): Date;

    getClientCode(): ClientCode;

    // price is defined as PLN/g
    getGoldPrice(date: Date): Promise<number>;

    getExchangeRates(date: Date, currencyCodes: CurrencyCode[]): Promise<ItemPrice[]>;

}