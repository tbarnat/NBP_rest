import DataSource from "../enum/DataSource";

declare module DataInterface {

    interface Presentable {
        dataSource: DataSource;
        objectDatedInfo: any; //objectDatedInfo without dateCreated property
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