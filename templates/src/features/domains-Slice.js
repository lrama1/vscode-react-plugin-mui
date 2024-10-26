
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRequest, postRequest, putRequest } from "../../utils/authority";
import { first } from "lodash";

const initialState = {
  entities: [],
  totalRecords: 0,
  first: 0,
  page: 0,
  perPage: 10,
  filters: {},
  sortField: "",
  sortOrder: "",
};

const DRIVERS_URI = "drivers";
export const fetchDrivers = createAsyncThunk(
  "drivers/fetchDrivers",
  async (na, extra) => {
    const { page, perPage, sortField, sortOrder, filters } =
      extra.getState().drivers;
    const data = await postRequest(
      DRIVERS_URI +
      `?page=${page + 1
      }&per_page=${perPage}&sort_by=${sortField}&order=${sortOrder}`,
      filters
    );
    return data;
  }
);

export const driversSlice = createSlice({
  name: "drivers",
  initialState: initialState,
  reducers: {
    pageChanged: (state, action) => {
      console.log("Cahgne page ", action.payload);
      state.first = action.payload.first;
      state.page = action.payload.page;
    },
    sorted: (state, action) => {
      state.sortField = action.payload.sortField;
      state.sortOrder = action.payload.sortOrder;
    },
    filterEdited: (state, action) => {
      state.filters[action.payload.name] = action.payload.value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDrivers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDrivers.fulfilled, (state, action) => {
        state.entities = action.payload.rows;
        state.totalRecords = action.payload.totalRecords;
        state.page = action.payload.currentPage;
        state.status = "done";
      });
  },
});

export const { pageChanged, sorted, filterEdited } = driversSlice.actions;
export default driversSlice.reducer;
