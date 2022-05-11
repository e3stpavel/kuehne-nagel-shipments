import axios from 'axios'
import type { Shipment } from './shipmentsSlice'

export const getShipmentsData = async (url: string) => {
  return axios
    .get<Shipment[]>(url)
    .then(shipments => shipments)
}
