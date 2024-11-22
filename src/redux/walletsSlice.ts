import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Card, Wallet } from '../types';
import { cards, firstWallet } from '../mockData';

interface WalletsState {
  wallets: Wallet[];
  choosenWallet: Wallet;
  chooseWalletOpened: boolean;
  cards: Card[];
  lastTransaction: { ammountRub: number; ammountEtc: number; ammountBtc: number };
}

const initialState: WalletsState = {
  wallets: [firstWallet] as Wallet[], // portfolios
  choosenWallet: firstWallet,
  chooseWalletOpened: false,
  cards: cards,
  lastTransaction: { ammountRub: 0, ammountEtc: 0, ammountBtc: 0 },
};

const walletsSlice = createSlice({
  name: 'wallets',
  initialState: initialState,
  reducers: {
    setWallets: (state, action: PayloadAction<Wallet[]>) => {
      state.wallets = { ...action.payload };
    },
    addWallet: (state, action: PayloadAction<Wallet>) => {
      state.wallets.push(action.payload);
    },
    setChoosenWallet(state, action: PayloadAction<Wallet>) {
      state.choosenWallet = action.payload;
    },
    toggleChooseWallet(state, action: PayloadAction<boolean>) {
      state.chooseWalletOpened = action.payload;
    },
    transaction(state, action: PayloadAction<{ card: Card; ammount: number }>) {
      const card = action.payload.card;
      state.cards.forEach((stateCard) => {
        if (stateCard.id === card.id) {
          stateCard.balance -= action.payload.ammount;
        }
      });
    },
    currencyBuy(state, action: PayloadAction<{ currencyAmmount: number; curIndex: number; wallet: Wallet }>) {
      state.wallets.forEach((wallet) => {
        if (wallet.portfolioId === action.payload.wallet.portfolioId) {
          switch (action.payload.curIndex) {
            case 0: {
              wallet.wallets[0].ammount -= action.payload.currencyAmmount;
              break;
            }
            case 1: {
              wallet.wallets[1].ammount -= action.payload.currencyAmmount;
              break;
            }
            default: {
              break;
            }
          }
        }
      });
    },
    setLastTransaction(state, action: PayloadAction<{ ammountRub: number; ammountEtc: number; ammountBtc: number }>) {
      state.lastTransaction = action.payload;
    },
  },
});

export const {
  setWallets,
  addWallet,
  setChoosenWallet,
  toggleChooseWallet,
  transaction,
  currencyBuy,
  setLastTransaction,
} = walletsSlice.actions;
export default walletsSlice.reducer;
