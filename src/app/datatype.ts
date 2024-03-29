export interface SignUp{
    name: string,
    password: string,
    email: string
}

export interface login{
    email: String,
    password: String
}

export interface product{
    forEach(arg0: (product: product) => void): unknown
    name: string,
    price: number,
    category: string,
    color: string,
    description: string
    image: string,
    id: number,
    Quantity:undefined|number
}
export interface cart{
    name: string,
    price: number,
    category: string,
    color: string,
    description: string
    image: string,
    id: number | undefined,
    Quantity: undefined | number,
    userId: number,
    productId:number
}