import { Rating } from "./Rating";

export class Producto {
    private _title: string;
   
    private price: number;
    private description: string;
    private category: string;
    private image: string;
    private _rating: Rating;
   

    constructor(title: string, price: number, description: string, category: string, image: string, rating: Rating) {
        this._title = title;
        this.price = price;
        this.description = description;
        this.category = category;
        this.image = image;
        this._rating = rating;
    }

    public get title(): string {
        return this._title;
    }
    public set title(value: string) {
        this._title = value;
    }

    public get rating(): Rating {
        return this._rating;
    }
    public set rating(value: Rating) {
        this._rating = value;
    }
  }