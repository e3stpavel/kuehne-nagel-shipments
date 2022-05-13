import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getShipmentsData } from './shipmentsAPI'
import shipmentsJson from '~/app/shipments.json'

// count pagination numbers
// not the best approach to make responsive design but Chakra doesnt provide any tools for that
const windowOffsetHeight = 80 * 2 + 96 + 48
const thHeight = 28
const tdHeight = 56
const captionHeight = 56 + 16

const rowsPerPage = Math.round((window.innerHeight - windowOffsetHeight - thHeight - captionHeight) / tdHeight)

export interface Shipment {
  orderNo: string
  date: string
  customer: string
  trackingNo: string
  status: string
  consignee: string
}

export interface ShipmentsState {
  data: Shipment[]
  page: number
  rowsPerPage: number
  startingIndexForRow: number
  updatedAt: string
  status: 'idle' | 'loading' | 'failed'
}

const initialState: ShipmentsState = {
  data: <Shipment[]>shipmentsJson,
  page: 1,
  rowsPerPage,
  startingIndexForRow: 0,
  updatedAt: 'a long time ago',
  status: 'idle',
}

export const getShipments = createAsyncThunk(
  'shipments/getShipmentsData',
  async (url: string) => {
    const response = await getShipmentsData(url)

    return response.data
  },
)

export const shipmentsSlice = createSlice({
  name: 'shipments',
  initialState,
  reducers: {
    deleteSelectedShipment: (state: ShipmentsState, action: { payload: Shipment; type: string }) => {
      // technicaly need to send request to server using rest to delete
      // but for now using only state
      const index = state.data.findIndex(
        ({ orderNo }) => orderNo === action.payload.orderNo,
      )

      if (index > -1)
        state.data.splice(index, 1)
    },
    // to edit shipment easier to make put request to the server and then get new data from it
    updateStartingIndexForRow: (state: ShipmentsState, action: { payload: number; type: string }) => {
      state.startingIndexForRow = action.payload
    },
    incrementPageNumber: (state: ShipmentsState) => {
      state.page++
    },
    decrementPageNumber: (state: ShipmentsState) => {
      state.page--
    },
    updateRowsPerPageOnResize: (state: ShipmentsState, action: { payload: number; type: string }) => {
      state.rowsPerPage = Math.round((action.payload - windowOffsetHeight - thHeight - captionHeight) / tdHeight)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getShipments.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getShipments.fulfilled, (state, { payload }) => {
        state.status = 'idle'
        state.data = payload

        const time = new Date()
        state.updatedAt = time.toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
        })
      })
      .addCase(getShipments.rejected, (state, { error }) => {
        state.status = 'failed'
        console.error(`${error.code}: ${error.message}`)
      })
  },
})

export const {
  deleteSelectedShipment,
  updateStartingIndexForRow,
  incrementPageNumber,
  decrementPageNumber,
  updateRowsPerPageOnResize,
} = shipmentsSlice.actions

export default shipmentsSlice.reducer
