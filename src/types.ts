export type Wallet = {
  id: string;
  name: string;
  currensies: CurrenciesItem[];
};

export type CurrenciesItem = { currency: Currency; ammount: number };

export type Currency = {
  currency: CurrencyEnum;
  cource: number;
};

export enum CurrencyEnum {
  RUB = 'RUB',
  BTC = 'BTC',
  ETC = 'ETC',
}

export type Card = {
  id: string;
  cardHolderName?: string;
  CardName?: string;
  cardNumber: string;
  cardExpiryDate?: string;
  balance: number;
};
