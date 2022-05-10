import {
  Button,
  Table as ChakraTable,
  Heading,
  IconButton,
  PopoverTrigger as OriginalPopoverTrigger,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  Portal,
  Stack,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
// import { increment, selectTable } from './tableSlice'
import React from 'react'
import { Link } from 'react-router-dom'
import {
  decrementPageNumber,
  deleteSelectedShipment,
  incrementPageNumber,
  updateRowsPerPageOnResize,
  updateStartingIndexForRow,
} from '../shipmentsSlice'
import PhMoreIcon from '~icons/ph/dots-three'
import PhCaretRight from '~icons/ph/caret-right-bold'
import PhCaretLeft from '~icons/ph/caret-left-bold'
import { useAppDispatch, useAppSelector } from '~/app/hooks'

// Some Chakra UI PopoverTrigger quick fix
export const PopoverTrigger: React.FC<{ children: React.ReactNode }> = OriginalPopoverTrigger

export default function Table() {
  const shipments = useAppSelector(state => state.shipments)
  const dispatch = useAppDispatch()

  // paginate
  window.addEventListener('resize', () => {
    dispatch(updateRowsPerPageOnResize(window.innerHeight))
  })

  // truncate the array
  const endIndexForRow = shipments.startingIndexForRow + shipments.rowsPerPage
  const shipmentsList = shipments.data.slice(shipments.startingIndexForRow, endIndexForRow)

  return (
    <div className="max-w-full h-full flex flex-col">
      <Heading mb={24}>Shipments</Heading>

      <TableContainer height={'full'}>
        <ChakraTable variant={'simple'} size="sm" className="">
          <TableCaption paddingX={0} fontSize="md">
            <div className="flex flex-row justify-between items-center">
              <Text color={'gray.500'}>
                Last update {}
              </Text>
              <Stack spacing={6} align="center" direction={'row'}>
                <Text fontSize={'sm'} color={'gray.700'}>
                  { shipments.startingIndexForRow + 1 }-{ `${endIndexForRow > shipments.data.length ? shipments.data.length : endIndexForRow} ` }
                  <span className="text-gray-500">
                    of { `${shipments.data.length} (Page ${shipments.page})`}
                  </span>
                </Text>

                <Stack spacing={2} align="center" direction={'row'}>
                  <IconButton
                    onClick={() => {
                      dispatch(updateStartingIndexForRow(shipments.startingIndexForRow - shipments.rowsPerPage))
                      dispatch(decrementPageNumber())
                    }}
                    isDisabled={ shipments.startingIndexForRow <= 0 }
                    aria-label="Previous Page"
                    variant={'ghost'}
                    color={'gray.700'}
                    bgColor={'transparent'}
                    icon={<PhCaretLeft />}
                  />
                  <IconButton
                    onClick={() => {
                      dispatch(updateStartingIndexForRow(endIndexForRow))
                      dispatch(incrementPageNumber())
                    }}
                    isDisabled={ endIndexForRow > shipments.data.length - 1 }
                    aria-label="Next Page"
                    variant={'ghost'}
                    color={'gray.700'}
                    bgColor={'transparent'}
                    icon={<PhCaretRight />}
                  />
                </Stack>
              </Stack>
            </div>
          </TableCaption>

          <Thead>
            <Tr>
              <Th>Order no</Th>
              <Th>Delivery Date</Th>
              <Th>Customer</Th>
              <Th>Tracking no</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {shipmentsList.map((shipment, i) => (
              <Tr key={shipment.orderNo} bg={ i % 2 === 0 ? 'gray.50' : 'white' }>
                <Td>{ shipment.orderNo }</Td>
                <Td>{ shipment.date }</Td>
                <Td style={{ whiteSpace: 'normal', maxWidth: '200px' }}><Text isTruncated>{ shipment.customer }</Text></Td>
                <Td>{ shipment.trackingNo }</Td>
                <Td>
                  {/* <IconButton
                    onClick={() => dispatch(deleteLastRow())}
                    aria-label={`Shipment ${shipment.orderNo} actions`}
                    variant={'ghost'}
                    colorScheme={'whiteAplha'}
                    icon={<PhMoreIcon style={{ fontSize: '1.5em' }} />}
                  /> */}
                  <Popover>
                    <PopoverTrigger>
                      <IconButton
                        aria-label={`Shipment ${shipment.orderNo} actions`}
                        variant={'ghost'}
                        colorScheme={'whiteAplha'}
                        icon={<PhMoreIcon style={{ fontSize: '1.5em' }} />}
                      />
                    </PopoverTrigger>
                    <Portal>
                      <PopoverContent borderRadius={0}>
                        <PopoverArrow />
                        <PopoverHeader>
                          <Stack direction={'row'} align="center">
                            <Heading size={'sm'} style={{ textTransform: 'capitalize' }}>shipment actions</Heading>
                            <PopoverCloseButton borderRadius={0} />
                          </Stack>
                        </PopoverHeader>
                        <PopoverBody>
                          <Stack direction={'column'} spacing={2}>
                            <Button
                              width={'full'}
                              style={{ textTransform: 'capitalize' }}
                            >
                              <Link to={ shipment.orderNo }>
                                open details
                              </Link>
                            </Button>
                            <Button
                              width={'full'}
                              colorScheme={'red'}
                              style={{ textTransform: 'capitalize' }}
                              onClick={() => dispatch(deleteSelectedShipment(shipment))}
                            >
                              delete shipment
                            </Button>
                          </Stack>
                        </PopoverBody>
                      </PopoverContent>
                    </Portal>
                  </Popover>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </ChakraTable>
      </TableContainer>
    </div>
  )
}
