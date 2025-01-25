import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { getRequest, postRequest, putRequest } from "../../utils/authority";
import { {{domainName}} } from "../../types/common-types";

const initialState = {
  entity: {
    {{#each attributes}}
    {{this.attributeName}}: {{#if (eq this.dataType "Boolean")}} false {{else}} "" {{/if}},
    {{/each}}
  } as {{domainName}},
  status: ""
};

export const fetch{{domainName}} = createAsyncThunk<{{domainName}}, string>(
  "{{domainCamelCase}}/fetch{{domainName}}",
  async (url) => {
    const data = await getRequest(url);
    return data;
  }
);

const DRIVER_SAVE_URI = "api/{{domainCamelCase}}";
export const save{{domainName}} = createAsyncThunk<{{domainName}}, {{domainName}}>(
  "{{domainCamelCase}}/save{{domainName}}",
  async ( {{domainCamelCase}}: {{domainName}} ) => {
    const data =
      {{domainCamelCase}}.{{idAttribute}} === ""
        ? await postRequest(DRIVER_SAVE_URI, {{domainCamelCase}})
        : await putRequest(DRIVER_SAVE_URI + "/" + {{domainCamelCase}}.{{idAttribute}}, {{domainCamelCase}});
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
    created: (state) => {
      state.entity = initialState.entity;
    },
    new{{domainName}}: (state) => {
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

export const { edited, created, new{{domainName}} } = {{domainCamelCase}}Slice.actions;
export default {{domainCamelCase}}Slice.reducer;
