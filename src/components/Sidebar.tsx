import { Heading, Stack } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import logo from '/path1484.svg'

function Tab(prop: { name: string; route?: string }): JSX.Element {
  return (
    <NavLink to={`/${prop.route ? prop.route : prop.name}`}
      className={({ isActive }) => isActive ? 'border border-b-brand-900 text-black' : 'border border-transparent text-gray-600'}
    >
      <Heading size={'md'} letterSpacing={'0.1px'} pb={1} style={{ textTransform: 'capitalize' }}>{ prop.name }</Heading>
    </NavLink>
  )
}

export default function SideBar() {
  return (
    <div className="px-16 py-20 h-full bg-gray-200 flex flex-col">
      <Stack spacing={4} direction="row" align="center">
        <Heading size={'md'} letterSpacing={0} color="brand.900">
          { 'Kuehne+Nagel'.toUpperCase() }
        </Heading>
        <img src={logo} alt="Logo" className="w-12 h-auto" />
      </Stack>

      <Stack spacing={8} mt={24} direction="column">
        <Tab
          name="shipments"
        />
        <Tab
          name="about"
        />
      </Stack>

      <Heading mt={'auto'} mb={0} size={'xs'} letterSpacing={'0.1px'} color="gray.400">Powered by Pavel Mayorov</Heading>
    </div>
  )
}
