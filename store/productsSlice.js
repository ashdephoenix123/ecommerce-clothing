import { createSlice } from "@reduxjs/toolkit";

const initialFilters = {
  categories: {},
  brands: {},
  fromPrice: "",
  toPrice: "",
  colors: {},
  discount: "",
  sortby: "recommended",
};

const initialState = {
  hasFilters: false,
  filters: initialFilters,
  products: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    resetFilters: () => {
      return initialState;
    },
    updateFilter: (state, action) => {
      const { id, optionID } = action.payload;
      const prev = state.filters[id];
      state.filters[id] = {
        ...prev,
        [optionID]: !prev[optionID],
      };
    },
  },
});

export const { resetFilters, updateFilter } = productsSlice.actions;
export default productsSlice.reducer;
