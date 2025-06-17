import type { Person } from "@/types/person";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface PersonState {
  currentPerson: Person | null;
  loading: boolean;
  error: string | null;
}

const initialState: PersonState = {
  currentPerson: null,
  loading: false,
  error: null,
};

const personSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    setPerson: (state, action: PayloadAction<Person>) => {
      state.currentPerson = action.payload;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearPerson: (state) => {
      state.currentPerson = null;
      state.error = null;
    },
  },
});

export const { setPerson, setLoading, setError, clearPerson } =
  personSlice.actions;
export default personSlice.reducer;
