import { Rating } from "./Rating";

export class Producto {
    private title: string;
   
    private price: number;
    private description: string;
    private category: string;
    private image: string;
    private _rating: Rating;
   

    constructor(title: string, price: number, description: string, category: string, image: string, rating: Rating) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.category = category;
        this.image = image;
        this._rating = rating;
    }

}
