declare module dataInterface {

    export interface GoldInfo {
        effectiveDate: string;
        goldPrices: ItemPrice[];
    }

    export interface ItemPrice {
        currency: string;
        price: number;
    }

    export interface Rate {
        currency: string;
        rate: number;
    }

}