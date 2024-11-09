import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PopUpData {
  waypoint: string;
  msg: string;
  desc: string;
  img: string;
}

const popUpSlice = createSlice({
  name: 'popUp',
  initialState: {
    data: {
      waypoint: '',
      msg: '',
      desc: '',
      img: '',
    } as PopUpData,
    isOpen: false,
  },
  reducers: {
    openPopUp: (state) => {
      state.isOpen = true;
    },
    closePopUp: (state) => {
      state.isOpen = false;
    },
    updatePopUpData: (state, action: PayloadAction<PopUpData>) => {
      state.data = action.payload;
    },
  },
});

export const { openPopUp, closePopUp, updatePopUpData } = popUpSlice.actions;
export default popUpSlice.reducer;
