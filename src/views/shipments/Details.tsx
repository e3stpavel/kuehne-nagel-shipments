import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Box, Button, Heading, Stack, Stat, StatGroup, StatHelpText, StatLabel, StatNumber, Text, chakra } from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from '~/app/hooks'
import PhCaretRight from '~icons/ph/caret-right-bold'
import PhCaretLeft from '~icons/ph/caret-left-bold'
import EditableInput from '~/components/EditableInput'

function DetailsHeader(): JSX.Element {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div>
      <Stack direction={'row'} align="center" mb={24}>
        <Heading
          onClick={() => navigate(`/shipments/${location.search}`)}
          color="gray.600"
          _hover={{
            color: 'black',
            cursor: 'pointer',
          }}
        >
          Shipments
        </Heading>
        <PhCaretRight className="w-6 h-6" />
        <Heading>Details</Heading>
      </Stack>

      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
        <Button
          leftIcon={<PhCaretLeft style={{ fontSize: '0.75em' }} />}
          variant={'ghost'}
          color="brand.900"
          style={{ textTransform: 'capitalize' }}
          paddingX={0}
          _hover={{
            bg: 'transparent',
            textDecoration: 'underline',
          }}
        >
          go back
        </Button>
        <Text color={'gray.500'}>
          Last updated {}
        </Text>
      </Stack>
    </div>
  )
}

export default function Details() {
  const params = useParams()

  const shipments = useAppSelector(state => state.shipments)
  const shipment = shipments.data.find(
    s => s.orderNo === params.orderNo,
  )

  // let statStack: JSX.Element
  // for (let i = 0; i < Object.entries(shipment as object).length; i++) {
  //   const keys = Object.keys(shipment as object)
  //   const values = Object.values(shipment as object)

  //   statStack = <StatGroup>
  //     <Stat p={6}>
  //       <StatLabel>{ keys[i] }</StatLabel>
  //       <StatNumber>
  //         <EditableInput defaultValue={values[i]} />
  //       </StatNumber>
  //     </Stat>
  //     <Box width={'px'} height={'full'} className="bg-gradient bg-gradient-to-b from-transparent to-gray-400" />
  //     <Stat p={6}>
  //       <StatLabel>{ keys[i % Object.entries(shipment as object).length === 0 ? i : i + 1] }</StatLabel>
  //       <StatNumber>
  //         <EditableInput defaultValue={ values[i % Object.entries(shipment as object).length === 0 ? i : i + 1] } />
  //       </StatNumber>
  //     </Stat>
  //   </StatGroup>
  // }

  // if shipment doesnt exist who throw the message
  return shipment
    ? (
    <div className="max-w-full h-full flex flex-col">
      <DetailsHeader />

      <div className="grid grid-cols-2">
        {Object.entries(shipment).map(([key, value], i) => (
          <div key={key} className="relative">
            <Box width={'px'} height={'full'} className={
              i % 2 === 0
                ? 'absolute top-0 right-0 bg-gradient bg-gradient-to-b from-transparent to-gray-400'
                : 'absolute top-0 right-0 hidden' } />
            <Stat p={6}>
              <StatLabel>{key}</StatLabel>
              <StatNumber>
                <EditableInput defaultValue={value} />
              </StatNumber>
            </Stat>
            <Box height={'px'} width={'full'} className={
              i % 2 === 0
                ? 'bg-gradient bg-gradient-to-r from-transparent to-gray-400'
                : 'bg-gradient bg-gradient-to-l from-transparent to-gray-400' } />
          </div>
        ))}
        {/* <StatGroup>
          <Stat p={6}>
            <StatLabel>Order no</StatLabel>
            <StatNumber>
              <EditableInput defaultValue={shipment.orderNo} />
            </StatNumber>
          </Stat>
          <Box width={'px'} height={'full'} className="bg-gradient bg-gradient-to-b from-transparent to-gray-400" />
          <Stat p={6}>
            <StatLabel>Date</StatLabel>
            <StatNumber>
              <EditableInput defaultValue={shipment.date} />
            </StatNumber>
          </Stat>
        </StatGroup> */}
      </div>
    </div>
      )
    : (
    <div className="max-w-full h-full flex flex-col">
      <DetailsHeader />
      <Text>Seems like we couldn`t find the shipment</Text>
    </div>
      )
}
