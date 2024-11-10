import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Card, Wallet } from '../types';
import { cards, firstWallet } from '../mockData';

interface WalletsState {
  wallets: Wallet[];
  choosenWallet: Wallet;
  chooseWalletOpened: boolean;

  cards: Card[];
}

const initialState: WalletsState = {
  wallets: [firstWallet] as Wallet[], // portfolios
  choosenWallet: firstWallet,
  chooseWalletOpened: false,
  cards: cards,
};

const walletsSlice = createSlice({
  name: 'wallets',
  initialState: initialState,
  reducers: {
    setWallets: (state, action: PayloadAction<Wallet[]>) => {
      state.wallets = action.payload;
    },
    addWallet: (state, action: PayloadAction<Wallet>) => {
      state.wallets.push(action.payload);
    },
    setChoosenWallet(state, action: PayloadAction<Wallet>) {
      state.choosenWallet = action.payload;
    },
    toggleChooseWallet(state, action: PayloadAction<boolean>) {
      console.log(action.payload);

      state.chooseWalletOpened = action.payload;
    },
  },
});

export const { setWallets, addWallet, setChoosenWallet, toggleChooseWallet } = walletsSlice.actions;
export default walletsSlice.reducer;
