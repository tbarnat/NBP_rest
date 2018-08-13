
export default class ObjectDatedInfo {

    private _effectiveDate: string;
    private _dateCreated!: Date; //optional parameter which is not exposed
    [key: string]: any;

    constructor(effectiveDate: string){
        this._effectiveDate = effectiveDate;
    }


    get effectiveDate(): string {
        return this._effectiveDate;
    }

    set effectiveDate(value: string) {
        this._effectiveDate = value;
    }

    get dateCreated(): Date {
        return this._dateCreated;
    }

    set dateCreated(value: Date) {
        this._dateCreated = value;
    }


}