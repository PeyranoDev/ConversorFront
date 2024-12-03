import { Currency } from "./currency";

export interface ConversionHistory {
    id: number;
    initialAmount: number;
    convertedAmount: number;
    initialCurrency: Currency;
    finalCurrency: Currency;
    dateTime: string;
}  