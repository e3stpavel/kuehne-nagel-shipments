import React from "react"
import { Stack } from "@chakra-ui/react"
import { Sidebar } from './features/sidebar/Sidebar';
import { Table } from "./features/table/Table";

function App() {
  return (
    <Stack spacing={0} direction='row' height='100%' className="app">
      <Sidebar />
      <Table />
    </Stack>
  )
}

export default App
