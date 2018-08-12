import DataInterface from "./PresentableDataInterface";
import GoldInfo = DataInterface.GoldInfo

export interface HandlerInterface{

    getApiGold(clientCode: string, date: string): Promise<GoldInfo>;

}