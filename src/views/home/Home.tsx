import { Stack, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import PhHandWaving from '~icons/ph/hand-waving-fill'
import PhHandWavingFill from '/path1142.svg'

export default function Home() {
  return (
    <Stack
      direction={'column'}
      spacing={4}
      width={'full'}
      height={'full'}
      align="center"
      justify="center"
      className="relative"
    >
      <PhHandWaving className="text-black w-42 h-42 z-1 hand-svg" />
      <Text textAlign={'center'} width={'45%'} fontSize={'xl'} className="z-1">
        Hey! Nice to see you here! Start discovering by
        <span className="font-bold cursor-pointer">
          <Link to={'/shipments'}> clicking shipments </Link>
        </span>
        in left sidebar menu.
      </Text>
      <img
        src={PhHandWavingFill}
        alt="Hand Waving"
        className="absolute top-3/10 left-4/9 w-42 h-42 !m-0 z-0 hand-svg
        transform -translate-x-4/9 -translate-y-3/10 text-yellow-500"
      />
    </Stack>
  )
}
