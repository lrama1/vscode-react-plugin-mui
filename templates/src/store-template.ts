import { configureStore } from "@reduxjs/toolkit";
import {{domainCamelCase}}s from "./features/{{domainCamelCase}}/{{domainCamelCase}}sSlice";
import {{domainCamelCase}} from "./features/{{domainCamelCase}}/{{domainCamelCase}}Slice";

export const store = configureStore({
    reducer: {
      {{domainCamelCase}},
      {{domainCamelCase}}s,
    },
  });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;