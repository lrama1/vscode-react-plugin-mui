
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { getRequest, postRequest, putRequest } from "../../utils/authority";

const initialState = {
  entity: { driverId: 0, driverName: "", driverBalance: "" },
};

export const fetchDriver = createAsyncThunk(
  "driver/fetchDriver",
  async (url) => {
    const data = await getRequest(url);
    return data;
  }
);

const DRIVER_SAVE_URI = "driver";
export const saveDriver = createAsyncThunk(
  "driver/saveDriver",
  async (driver) => {
    const data =
      driver.driverId === ""
        ? await postRequest(DRIVER_SAVE_URI, driver)
        : await putRequest(DRIVER_SAVE_URI + "/" + driver.driverId, driver);
    return data;
  }
);

export const driverSlice = createSlice({
  name: "driver",
  initialState,
  reducers: {
    edited: (state, action) => {
      state.entity[action.payload.name] = action.payload.value;
    },
    created: (state, action) => {
      state.entity = initialState.entity;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDriver.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDriver.fulfilled, (state, action) => {
        state.entity = { ...current(state.entity), ...action.payload };
        state.status = "done";
      })
      .addCase(saveDriver.pending, (state) => {
        state.status = "loading";
      })
      .addCase(saveDriver.fulfilled, (state, action) => {
        state.entity = action.payload;
        state.status = "done";
      });
  },
});

export const { edited, created } = driverSlice.actions;
export default driverSlice.reducer;
