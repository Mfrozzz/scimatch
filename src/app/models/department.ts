export interface Department {
    id:string;
    idInstitute:string;
    name:string;
    city:string;
/*
    private _id:any;
    private _idInstitute!:string;
    private _name!:string;
    private _city!:string;

    public get id():any{
        return this._id;
    }

    constructor(idInstitute:string,name:string,city:string){
        this._idInstitute=idInstitute;
        this._name=name;
        this._city=city;
    }

    public get idInstitute(): string {
        return this._idInstitute;
    }
    public set idInstitute(value: string) {
        this._idInstitute = value;
    }

    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }

    public get city(): string {
        return this._city;
    }
    public set city(value: string) {
        this._city = value;
    }
*/
}
