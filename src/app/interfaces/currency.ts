export interface Currency {
    id : number,
    code : string,
    legend : string,
    convertibilityIndex : number
}

export interface CurrencyUpdate {
    CurrencyId : number 
    code : string| null,
    legend : string| null,
    convertibilityIndex :  number | null
}
