import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PopupData } from '../mockData';

const data: PopupData = {
  waypoint: '',
  msg: '',
  desc: '',
  img: '',
  buttonText: '',
  minibuttonText: '',
  type: null,
};

const popUpSlice = createSlice({
  name: 'popUp',
  initialState: {
    data: data,
    isOpen: false,
  },
  reducers: {
    openPopUp: (state) => {
      state.isOpen = true;
    },
    closePopUp: (state) => {
      state.isOpen = false;
    },
    updatePopUpData: (state, action: PayloadAction<PopupData>) => {
      state.data = action.payload;
    },
  },
});

export const { openPopUp, closePopUp, updatePopUpData } = popUpSlice.actions;
export default popUpSlice.reducer;
