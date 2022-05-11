import { useLocation, useNavigate } from 'react-router-dom'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Stack,
  useDisclosure,
} from '@chakra-ui/react'
import React from 'react'
import type { Shipment } from '~/views/shipments/shipmentsSlice'
import { deleteSelectedShipment } from '~/views/shipments/shipmentsSlice'
import PhTrash from '~icons/ph/trash-bold'
import { useAppDispatch } from '~/app/hooks'

export default function DeleteShipmentModal(prop: { shipment: Shipment; buttonStyle: any }) {
  const navigate = useNavigate()
  const location = useLocation()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef<any>()

  const dispatch = useAppDispatch()

  // creating the full button object properties object
  const props = prop.buttonStyle
  props.colorScheme = 'red'
  props.style = {
    textTransform: 'capitalize',
  }
  props.onClick = onOpen

  return (
    <div className="flex">
      { React.createElement(Button, props, 'delete shipment') }

      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent borderRadius={0} alignItems={'center'} justifyContent={'center'}>
          <AlertDialogHeader paddingBottom={0}>
            <div className="flex mx-auto mb-2 w-12 h-12 bg-red-100 rounded-full items-center justify-center">
              <PhTrash className="text-red-600" />
            </div>
            Are you sure?
          </AlertDialogHeader>
          <AlertDialogBody maxWidth={'80%'} textAlign={'center'}>
            Are you sure you want to delete this shipment from the shipment table? This action can`t be undone afterwards.
          </AlertDialogBody>
          <AlertDialogFooter width={'full'}>
            <Stack spacing={2} direction={'row'} width={'full'}>
              <Button
                variant={'outline'}
                width={'50%'}
                ref={cancelRef}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                width={'50%'}
                colorScheme={'red'}
                onClick={() => {
                  dispatch(deleteSelectedShipment(prop.shipment))
                  navigate(`/shipments/${location.search}`)
                }}
              >
                Delete
              </Button>
            </Stack>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
