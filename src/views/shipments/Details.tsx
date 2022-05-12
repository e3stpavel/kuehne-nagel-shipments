import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Badge, Box, Button, Heading, Stack, Stat, StatLabel, StatNumber, Text } from '@chakra-ui/react'
import clsx from 'clsx'
import { useAppSelector } from '~/app/hooks'
import EditableInput from '~/components/EditableInput'
import DeleteShipmentModal from '~/components/DeleteShipmentModal'
import PhCaretRight from '~icons/ph/caret-right-bold'
import PhCaretLeft from '~icons/ph/caret-left-bold'

function DetailsHeader(prop: { updatedAt: string; shipmentStatus?: string }): JSX.Element {
  const navigate = useNavigate()
  const location = useLocation()

  const status = prop.shipmentStatus?.slice(1, prop.shipmentStatus?.length - 1)

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
        <Stack direction={'row'} spacing={4} align={'center'}>
          <Heading>Details</Heading>
          <Badge
            variant={'subtle'}
            colorScheme={clsx(
              { gray: status !== 'Shipped' && status !== 'Delivered' },
              { blue: status === 'Shipped' },
              { green: status === 'Delivered' },
            )}
            fontSize={'lg'}
            className={clsx(
              { hidden: !prop.shipmentStatus },
            )}
          >
            { status }
          </Badge>
        </Stack>
      </Stack>

      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
        <Button
          onClick={() => navigate(`/shipments/${location.search}`)}
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
          Last updated { prop.updatedAt }
        </Text>
      </Stack>
    </div>
  )
}

export default function Details() {
  const params = useParams()

  const shipmentsState = useAppSelector(state => state.shipments)
  const shipment = shipmentsState.data.find(
    s => s.orderNo === params.orderNo,
  )

  // if shipment doesnt exist who throw the message
  return shipment
    ? (
    <div className="max-w-full h-full flex flex-col">
      <DetailsHeader updatedAt={ shipmentsState.updatedAt } shipmentStatus={ shipment.status } />

      <div className="grid grid-cols-2">
        {Object.entries(shipment).map(([key, value], i) => (
          <div key={key} className="relative">
            <Box width={'px'} height={'full'} className={clsx(
              'absolute',
              'top-0',
              'right-0',
              { hidden: i % 2 !== 0 },
              { 'bg-gradient bg-gradient-to-b from-transparent to-gray-200': i === 0 },
              { 'bg-gray-200': i % 2 === 0 && i > 0 && i < Object.entries(shipment).length - 2 },
              { 'bg-gradient bg-gradient-to-t from-transparent to-gray-200': i === Object.entries(shipment).length - 2 },
            )} />
            <Stat p={6}>
              <StatLabel fontWeight={'semibold'} color={'gray.600'}>
                { key.replace(/([a-z])([A-Z])/g, '$1 $2').toUpperCase() }
              </StatLabel>
              <StatNumber>
                <EditableInput
                  defaultValue={value}
                  shipment={shipment}
                />
              </StatNumber>
            </Stat>
            <Box height={'px'} width={'full'} className={clsx(
              'bg-gradient from-transparent to-gray-200',
              { 'bg-gradient-to-r ': i % 2 === 0 },
              { 'bg-gradient-to-l': i % 2 !== 0 },
              { hidden: i >= Object.entries(shipment).length - 2 },
            )} />
          </div>
        ))}
      </div>

      <DeleteShipmentModal shipment={ shipment } buttonStyle={{
        variant: 'ghost',
        ml: 'auto',
        mr: 0,
        paddingRight: 0,
        _hover: {
          bg: 'transparent',
          textDecoration: 'underline',
        },
      }} />

    </div>
      )
    : (
    <div className="max-w-full h-full flex flex-col">
      <DetailsHeader updatedAt={ shipmentsState.updatedAt } />
      <Stack
        direction={'column'}
        spacing={4}
        width={'full'}
        height={'full'}
        align="center"
      >
        <Text>Seems like we couldn`t find the shipment</Text>
      </Stack>
    </div>
      )
}
