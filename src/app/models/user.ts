export class User {
    private _id:any;
    private _email:string;
    private _password:string;
    private _name:string;
    private _institute:string;
    private _department:string;
    private _socialMedias:string;
    private _city: string;
    //private _projects: Project[] = []
    private _photoURL:any;
    
    public get id():any{
        return this._id;
    }
    
    constructor(email:string,password:string,name:string,
        institute:string,department:string,city:string){
        this._email=email;
        this._password=password;
        this._name=name;
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

    public get institute(): string {
        return this._institute;
    }
    public set institute(value: string) {
        this._institute = value;
    }

    public get department(): string {
        return this._department;
    }
    public set department(value: string) {
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

}