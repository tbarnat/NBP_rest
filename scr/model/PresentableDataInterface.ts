import DataSource from "../enum/DataSource";

declare module DataInterface {

    interface Presentable {
        dataSource: DataSource;
        datedObjectInfo: DatedObjectInfo;
    }

    interface DatedObjectInfo {
        effectiveDate: string;
    }

    interface GoldInfo extends DatedObjectInfo{
        goldPrices: ItemPrice[];
    }

    interface ItemPrice {
        currency: string;
        price: number;
    }

    interface Rate {
        currency: string;
        rate: number;
    }

} export default DataInterface