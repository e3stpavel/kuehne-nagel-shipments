import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '~/app/store'
// import { AppThunk } from '~/app/store'

export interface TableState {
  value: number
  status: 'idle' | 'loading' | 'failed'
}

const initialState: TableState = {
  value: 5,
  status: 'idle',
}

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
  },
})

export const { increment } = tableSlice.actions

// export const selectTable = (state: RootState) => state.table.value

export default tableSlice.reducer
