import DataInterface from "../model/PresentableDataInterface";
import ItemPrice = DataInterface.ItemPrice;
import ObjectDatedInfo from "./ObjectDatedInfo";

export default class GoldDatedInfo extends ObjectDatedInfo{

    private _goldPrices: ItemPrice[];

    constructor(effectiveDate: string, goldPrices: ItemPrice[]){
        super(effectiveDate);
        this._goldPrices = goldPrices;
    }


    get goldPrices(): ItemPrice[] {
        return this._goldPrices;
    }

    set goldPrices(value: ItemPrice[]) {
        this._goldPrices = value;
    }

}