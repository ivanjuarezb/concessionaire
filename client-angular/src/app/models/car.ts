export class Car{
    public id:number;
    public title:string;
    public description:string;
    public price:number;
    public status:string;
    public createdAt:any;
    public updatedAt:any;
    constructor(id:number, title:string, description:string, price:number, status:string,  createdAt:any, updatedAt:any){
        this.id=id;
        this.title=title;
        this.description=description;
        this.price=price;
        this.status=status;
        this.createdAt=createdAt;
        this.updatedAt=updatedAt;
    }
}