import { createSlice } from '@reduxjs/toolkit'
import shipmentsJson from '~/app/shipments.json'

// count pagination numbers
// not the best approach to make responsive design but Chakra doesnt provide any tools for that
const windowOffsetHeight = 80 * 2 + 96 + 48
const thHeight = 28
const tdHeight = 56
const captionHeight = 56 + 16

const rowsPerPage = Math.round((window.innerHeight - windowOffsetHeight - thHeight - captionHeight) / tdHeight)

interface shipment {
  orderNo: string
  date: string
  customer: string
  trackingNo: string
  status: string
  consignee: string
}

const initialState = {
  data: shipmentsJson,
  page: 1,
  rowsPerPage,
  startingIndexForRow: 0,
}

export const shipmentsSlice = createSlice({
  name: 'shipments',
  initialState,
  reducers: {
    deleteSelectedShipment: (state, action: { payload: shipment; type: string }) => {
      // technicaly need to send request to server using rest to delete
      // but for now using only state
      const index = shipmentsJson.indexOf(action.payload)
      if (index > -1)
        state.data.splice(index, 1)
    },
    updateStartingIndexForRow: (state, action: { payload: number; type: string }) => {
      state.startingIndexForRow = action.payload
    },
    incrementPageNumber: (state) => {
      state.page++
    },
    decrementPageNumber: (state) => {
      state.page--
    },
    updateRowsPerPageOnResize: (state, action: { payload: number; type: string }) => {
      state.rowsPerPage = Math.round((action.payload - windowOffsetHeight - thHeight - captionHeight) / tdHeight)
    },
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
