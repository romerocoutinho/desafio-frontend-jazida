import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialFilterState = {
  state: "all",
  labels: [],
  sort: "created",
  direction: "desc",
};

const filterSlice = createSlice({
  name: "filter",
  initialState: initialFilterState,
  reducers: {
    filterByState(state, action) {
      state.state = action.payload;
    },
    filterByLabel(state, action) {
      state.labels = action.payload;
    },
    changeSort(state, action) {
      state.sort = action.payload.sort;
      state.direction = action.payload.direction;
    },
  },
});

const store = configureStore({
  reducer: { filter: filterSlice.reducer },
});

export const filterActions = filterSlice.actions;

export default store;
