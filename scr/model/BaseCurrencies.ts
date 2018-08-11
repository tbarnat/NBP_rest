import CurrencyCode from "../enum/CurrencyCode";

export default class BaseCurrencies{

    private static readonly table = [CurrencyCode.EUR,CurrencyCode.USD,CurrencyCode.CHF,CurrencyCode.GBP];

    public static getTable(): CurrencyCode[]{
        return this.table;
    }

}