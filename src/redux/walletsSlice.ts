import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CurrencyEnum, Wallet } from '../types';

const firstWallet: Wallet = {
  id: '0',
  name: 'Mock Wallet',
  currensies: [
    {
      currency: {
        currency: CurrencyEnum.BTC,
        cource: 100,
      },
      ammount: 100,
    },
    {
      currency: {
        currency: CurrencyEnum.ETC,
        cource: 100,
      },
      ammount: 0.45,
    },
  ],
};

interface WalletsState {
  wallets: Wallet[];
  choosenWallet: Wallet;
  chooseWalletOpened: boolean;
}

const initialState: WalletsState = {
  wallets: [firstWallet] as Wallet[], // portfolios
  choosenWallet: firstWallet,
  chooseWalletOpened: false,
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
