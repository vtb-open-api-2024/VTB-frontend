export type Wallet = {
  id: string;
  name: string;
  currensies: CurrenciesItem[];
};

// export type SubWallet = {
//   walletId: number;
//   address: string;
//   tokenId: number;
//   balance: string; //нужно парсить - parseFloat(a.balance.shift())
// };

// export type Wallet = {
//   title: string;
//   portfolioId: number;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   wallets: any[];
// };

export type Portfolio = {
  title: string;
  portfolioId: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  wallets: any[];
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

export type Transaction = {
  type: string;
  productId: string;
  transactionDate: string;
  transactionTime: string;
  transactionId: string;
  transactionType: 'INCOME' | 'OUTCOME';
  amount: number;
  currency: 'USD';
  merchantId: string;
  merchantName: string;
  merchantCategory: string;
  paymentMeta: string;
};
