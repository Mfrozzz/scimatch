import { User } from "./user";

export interface Project {
    id:string;
    idOwner:User;
    name:string;
    description:string;
    type:string;
    members:string;
    instituteId:string;
    docURL:any;
/*
    private _id:any;
    private _idOwner:any;
    private _name:string;
    private _description:string;
    private _type:string;
    private _docURL:any;

    public get id():any{
        return this._id;
    }

    constructor(idOwner:any,name:string,
        description:string,type:string){
        this._idOwner=idOwner;
        this._name=name;
        this._description=description;
        this._type=type;
    }

    public get idOwner(): any {
        return this._idOwner;
    }
    public set idOwner(value: any) {
        this._idOwner = value;
    }

    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }

    public get description(): string {
        return this._description;
    }
    public set description(value: string) {
        this._description = value;
    }

    public get type(): string {
        return this._type;
    }
    public set type(value: string) {
        this._type = value;
    }

    public get docURL(): any {
        return this._docURL;
    }
    public set docURL(value: any) {
        this._docURL = value;
    }
*/
}
