export class Geolocation {
    lat!: string;
    long!: string;

    constructor(data?: any) {
        if (data) {
            this.lat = data.lat;
            this.long = data.long; 
        }
    }
}

export class Address {
    geolocation!: Geolocation;
    city!: string;
    street!: string;
    number!: number;
    zipcode!: string;

    constructor(data?: any) {
        if (data) {
            this.geolocation = new Geolocation(data.geolocation);
            this.city = data.city;
            this.street = data.street;
            this.number = data.number;
            this.zipcode = data.zipcode;
        }
    }
}

export class Name {
    firstname!: string;
    lastname!: string;

    constructor(data?: any) {
        if (data) {
            this.firstname = data.firstname;
            this.lastname = data.lastname; 
        }

    }
}

export class Usuario {
    address!: Address;
    id!: number ;
    email!: string;
    username!: string;
    password!: string;
    name!: Name;
    phone!: string;
    __v!: number;

    constructor(data?: any) {
        if (data) {
            this.address = new Address(data.address);
            this.id = data.id;
            this.email = data.email;
            this.username = data.username;
            this.password = data.password;
            this.name = new Name(data.name);
            this.phone = data.phone;
            this.__v = data.__v;
        }
    }
}