import { Button, ButtonGroup, EditableInput as ChakraEditableInput, Editable, EditablePreview, Stack, useEditableControls } from '@chakra-ui/react'
import type { Shipment } from '../views/shipments/shipmentsSlice'

function EditableControls() {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls()

  return isEditing
    ? (
    <ButtonGroup>
      <Button
        variant={'ghost'}
        paddingLeft={0}
        color="brand.900"
        _hover={{
          bg: 'transparent',
          textDecoration: 'underline',
        }}
        {...getSubmitButtonProps()}
      >
        Save
      </Button>
      <Button
        variant={'ghost'}
        paddingLeft={0}
        colorScheme={'red'}
        _hover={{
          bg: 'transparent',
          textDecoration: 'underline',
        }}
        {...getCancelButtonProps()}
      >
        Cancel
      </Button>
    </ButtonGroup>
      )
    : (
    <Button
      variant={'ghost'}
      color="gray.600"
      paddingLeft={0}
      alignSelf={'start'}
      height={4}
      _hover={{
        bg: 'transparent',
        textDecoration: 'underline',
      }}
      {...getEditButtonProps()}
      >
        Edit
      </Button>
      )
}

export default function EditableInput(prop: { defaultValue: string; shipment: Shipment }) {
  return (
  <Editable
    defaultValue={prop.defaultValue}
    isPreviewFocusable={false}
    submitOnBlur={false}
  >
    <Stack direction={'column'}>
      <EditablePreview />
      <ChakraEditableInput borderRadius={0} />
      <EditableControls />
    </Stack>
  </Editable>
  )
}
