
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

const DRIVERS_URI = "api/{{domainCamelCase}}s";
export const fetch{{domainName}}s = createAsyncThunk(
  "{{domainCamelCase}}s/fetch{{domainName}}s",
  async (na, extra) => {
    const { page, perPage, sortField, sortOrder, filters } =
      extra.getState().{{domainCamelCase}}s;
    const data = await postRequest(
      DRIVERS_URI +
      `?page=${page + 1
      }&per_page=${perPage}&sort_by=${sortField}&order=${sortOrder}`,
      filters
    );
    return data;
  }
);

export const {{domainCamelCase}}sSlice = createSlice({
  name: "{{domainCamelCase}}s",
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
      .addCase(fetch{{domainName}}s.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetch{{domainName}}s.fulfilled, (state, action) => {
        state.entities = action.payload.rows;
        state.totalRecords = action.payload.totalRecords;
        state.page = action.payload.currentPage;
        state.status = "done";
      });
  },
});

export const { pageChanged, sorted, filterEdited } = {{domainCamelCase}}sSlice.actions;
export default {{domainCamelCase}}sSlice.reducer;
