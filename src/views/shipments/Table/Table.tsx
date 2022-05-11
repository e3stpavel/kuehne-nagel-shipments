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
  Skeleton,
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
import { Link, useNavigate } from 'react-router-dom'
import {
  decrementPageNumber,
  getShipments,
  incrementPageNumber,
  updateRowsPerPageOnResize,
  updateStartingIndexForRow,
} from '../shipmentsSlice'
import PhMoreIcon from '~icons/ph/dots-three'
import PhCaretRight from '~icons/ph/caret-right-bold'
import PhCaretLeft from '~icons/ph/caret-left-bold'
import PhArrowClockwise from '~icons/ph/arrow-clockwise-bold'
import { useAppDispatch, useAppSelector } from '~/app/hooks'
import DeleteShipmentModal from '~/components/DeleteShipmentModal'
import { API_GET_SHIPMENTS } from '~/app/consts'

// Some Chakra UI PopoverTrigger quick fix
export const PopoverTrigger: React.FC<{ children: React.ReactNode }> = OriginalPopoverTrigger

export default function Table() {
  const shipmentsState = useAppSelector(state => state.shipments)
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  // paginate, count rows per page on the fly
  window.addEventListener('resize', () => {
    dispatch(updateRowsPerPageOnResize(window.innerHeight))
  })

  // truncate the array to display the correct amount of rows per page
  const endIndexForRow = shipmentsState.startingIndexForRow + shipmentsState.rowsPerPage
  const shipmentsList = shipmentsState.data.slice(shipmentsState.startingIndexForRow, endIndexForRow)

  const isLoading = shipmentsState.status === 'loading'

  return (
    <div className="max-w-full h-full flex flex-col">
      <Heading mb={24}>Shipments</Heading>

      {/* TODO: Handle Failed State status */}
      <TableContainer height={'full'}>
        <ChakraTable variant={'simple'} size="sm" className="">
          <TableCaption paddingX={0} fontSize="md">
            <div className="flex flex-row justify-between items-center">
              <Stack direction={'row'} spacing={0} align="center">
                <Button
                  leftIcon={<PhArrowClockwise />}
                  variant={'ghost'}
                  color={'brand.900'}
                  _hover={{
                    bg: 'transparent',
                    textDecoration: 'underline',
                    color: 'brand.600',
                  }}
                  paddingLeft={0}
                  isLoading={isLoading}
                  loadingText="Updating"
                  spinner={<PhArrowClockwise className="animate-spin" />}
                  onClick={() => dispatch(getShipments(API_GET_SHIPMENTS))}
                >
                  Update
                </Button>
                <Skeleton isLoaded={!isLoading}>
                  <Text color={'gray.500'}>
                    Last updated { shipmentsState.updatedAt }
                  </Text>
                </Skeleton>
              </Stack>

              <Stack spacing={6} align="center" direction={'row'}>
                <Skeleton isLoaded={!isLoading}>
                  <Text fontSize={'sm'} color={'gray.700'}>
                    { shipmentsState.startingIndexForRow + 1 }-{ `${endIndexForRow > shipmentsState.data.length ? shipmentsState.data.length : endIndexForRow} ` }
                    <span className="text-gray-500">
                      of { `${shipmentsState.data.length} (Page ${shipmentsState.page})`}
                    </span>
                  </Text>
                </Skeleton>

                <Stack spacing={2} align="center" direction={'row'}>
                  <IconButton
                    onClick={() => {
                      dispatch(updateStartingIndexForRow(shipmentsState.startingIndexForRow - shipmentsState.rowsPerPage))
                      dispatch(decrementPageNumber())
                    }}
                    isDisabled={ shipmentsState.startingIndexForRow <= 0 || isLoading }
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
                    isDisabled={ endIndexForRow > shipmentsState.data.length - 1 || isLoading }
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
                <Td _hover={{
                  textDecoration: 'underline',
                  color: 'brand.600',
                  cursor: 'pointer',
                }}
                className={ isLoading ? 'text-gray-400 !cursor-default' : ''}
                onClick={() => {
                  if (!isLoading)
                    navigate(`/shipments/${shipment.orderNo}`)
                }}>{ shipment.orderNo }</Td>
                <Td className={ isLoading ? 'text-gray-400' : ''}>{ shipment.date }</Td>
                <Td
                  style={{ whiteSpace: 'normal', maxWidth: '200px' }}
                  className={ isLoading ? 'text-gray-400' : ''}
                >
                  <Text isTruncated>{ shipment.customer }</Text>
                </Td>
                <Td className={ isLoading ? 'text-gray-400' : ''}>{ shipment.trackingNo }</Td>
                <Td>
                  <Popover>
                    <PopoverTrigger>
                      <IconButton
                        aria-label={`Shipment ${shipment.orderNo} actions`}
                        variant={'ghost'}
                        icon={<PhMoreIcon style={{ fontSize: '1.5em' }} />}
                        isDisabled={isLoading}
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
                            <Link to={ shipment.orderNo }>
                              <Button
                                width={'full'}
                                style={{ textTransform: 'capitalize' }}
                              >
                                open details
                              </Button>
                            </Link>
                            <DeleteShipmentModal
                              shipment={shipment}
                              buttonStyle={{
                                width: 'full',
                              }}
                            />
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
