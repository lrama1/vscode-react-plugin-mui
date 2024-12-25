
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { getRequest, postRequest, putRequest } from "../../utils/authority";

const initialState = {
  entity: {
    {{#each attributes}}
    {{this.attributeName}}: "",
    {{/each}}
  },
};

export const fetch{{domainName}} = createAsyncThunk(
  "{{domainCamelCase}}/fetch{{domainName}}",
  async (url) => {
    const data = await getRequest(url);
    return data;
  }
);

const DRIVER_SAVE_URI = "{{domainCamelCase}}";
export const save{{domainName}} = createAsyncThunk(
  "{{domainCamelCase}}/save{{domainName}}",
  async ({{domainCamelCase}}) => {
    const data =
      {{domainCamelCase}}.{{domainCamelCase}}Id === ""
        ? await postRequest(DRIVER_SAVE_URI, {{domainCamelCase}})
        : await putRequest(DRIVER_SAVE_URI + "/" + {{domainCamelCase}}.{{domainCamelCase}}Id, {{domainCamelCase}});
    return data;
  }
);

export const {{domainCamelCase}}Slice = createSlice({
  name: "{{domainCamelCase}}",
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
      .addCase(fetch{{domainName}}.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetch{{domainName}}.fulfilled, (state, action) => {
        state.entity = { ...current(state.entity), ...action.payload };
        state.status = "done";
      })
      .addCase(save{{domainName}}.pending, (state) => {
        state.status = "loading";
      })
      .addCase(save{{domainName}}.fulfilled, (state, action) => {
        state.entity = action.payload;
        state.status = "done";
      });
  },
});

export const { edited, created } = {{domainCamelCase}}Slice.actions;
export default {{domainCamelCase}}Slice.reducer;
