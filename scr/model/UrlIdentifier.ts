
export class UrlIdentifier {

    private client: string;
    private _objectType: string;
    private effectiveDate: string;

    constructor(client: string, objectType: string, date: string){
        this.client = client;
        this._objectType = objectType;
        this.effectiveDate = date;
    }

    public toString(): string{
        return '/'+this.client+'/'+this._objectType+'/'+this.effectiveDate;
    }

    get objectType(): string {
        return this._objectType;
    }

}