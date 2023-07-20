import { Department } from "./department";
import { Institute } from "./institute";

export interface User {
    id:string;
    email:string;
    password:string;
    name:string;
    academicRegister:string;
    institute:Institute;
    department:Department;
    socialMedias:string[];
    city:string;
    photoURL:any;
/*    private _id:any;
    private _email:string;
    private _password:string;
    private _name:string;
    private _academicRegister: string;
    private _institute:Institute
    private _department:Department
    private _socialMedias:string;
    private _city: string;
    private _photoURL:any;
    
    public get id():any{
        return this._id;
    }
    
    constructor(email:string,password:string,name:string,academicRegister:string,
        institute:Institute,department:Department,city:string){
        this._email=email;
        this._password=password;
        this._name=name;
        this._academicRegister=academicRegister;
        this._institute=institute;
        this._department=department;
        this._socialMedias=" ";
        this._city=city;
    }

    public get email(): string {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }

    public get password(): string {
        return this._password;
    }
    public set password(value: string) {
        this._password = value;
    }

    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }

    public get academicRegister(): string {
        return this._academicRegister;
    }
    public set academicRegister(value: string) {
        this._academicRegister = value;
    }

    public get institute(): Institute {
        return this._institute;
    }
    public set institute(value: Institute) {
        this._institute = value;
    }

    public get department(): Department {
        return this._department;
    }
    public set department(value: Department) {
        this._department = value;
    }

    public get socialMedias(): string {
        return this._socialMedias;
    }
    public set socialMedias(value: string) {
        this._socialMedias = value;
    }

    public get city(): string {
        return this._city;
    }
    public set city(value: string) {
        this._city = value;
    }

    public get photoURL(): string {
        return this._photoURL;
    }
    public set photoURL(value: string) {
        this._photoURL = value;
    }
*/
}
