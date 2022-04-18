export class User{
    public id:number;
    public role:string;
    public name:string;
    public surname:string;
    public password:string;
    public email:string;
    public getToken:boolean;
    constructor(id:number,role:string,name:string,surname:string,password:string,email:string,getToken:boolean){
        this.id=id;
        this.role=role;
        this.name=name;
        this.surname=surname;
        this.password=password;
        this.email=email;
        this.getToken=getToken;
    }
}