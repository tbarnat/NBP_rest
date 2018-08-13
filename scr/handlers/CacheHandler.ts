/*import DataInterface from "../model/PresentableDataInterface";
import DatedObjectInfo = DataInterface.DatedObjectInfo;*/
import GoldInfoManager from "../managers/GoldInfoManager";
import {UrlIdentifier} from "../model/UrlIdentifier";
import ObjectDatedInfo from "../model/ObjectDatedInfo";
import {ObjectDatedMap} from "../model/HandlerInterface";



export default class CacheHandler{ //implements HandlerInterface

    private goldInfoManager: GoldInfoManager = new GoldInfoManager();

    constructor(){}

    public get(identifier: UrlIdentifier): ObjectDatedInfo{
        let key: string = identifier.toString();
        if(identifier.objectType === 'gold'){
            return this.goldInfoManager.getGoldInfoCache(key);
        }
        //so far only 'gold' object type is handled
        return new ObjectDatedInfo('_invalid_');
    }

    public put(identifier: UrlIdentifier, objectDatedInfo: ObjectDatedInfo){
        let key: string = identifier.toString();
        if(identifier.objectType === 'gold'){
            objectDatedInfo.dateCreated = new Date();
            this.goldInfoManager.putGoldInfoCache(key, objectDatedInfo);
        }
        //so far only 'gold' object type is handled
    }

    public getMap(objectType: string): ObjectDatedMap | undefined{
        if(objectType === 'gold'){
            return this.goldInfoManager.getCacheMap();
        }
        return;
    }
}