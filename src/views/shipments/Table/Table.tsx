import { Text } from '@chakra-ui/react'
import { increment, selectTable } from './tableSlice'
import { useAppDispatch, useAppSelector } from '~/app/hooks'

export default function Table() {
  const table = useAppSelector(selectTable)
  const dispatch = useAppDispatch()

  return (
    <div className="bg-gray-500">
      <Text>{table}</Text>
      <button
        onClick={() => dispatch(increment())}
      >
        Click
      </button>
    </div>
  )
}
