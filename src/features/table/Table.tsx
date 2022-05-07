import { Heading, Stack } from "@chakra-ui/react";
import {
  Table as ChakraTable,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'

export function Table() {
  return (
    <Stack px={16} py={20}>
      <Heading>Shipments</Heading>

      <TableContainer>
        <ChakraTable>
          <TableCaption>
            Caption
          </TableCaption>
          <Thead>
            <Tr>
              <Th>Order No</Th>
              <Th>Delivery Date</Th>
              <Th>Customer</Th>
              <Th>Tracking No</Th>
            </Tr>
          </Thead>
          {/* Here should be a loop */}
          <Tbody>
            <Tr>
              <Td>some</Td>
              <Td>sort</Td>
              <Td>of</Td>
              <Td>info</Td>
            </Tr>
          </Tbody>
        </ChakraTable>
      </TableContainer>
    </Stack>
  )
}