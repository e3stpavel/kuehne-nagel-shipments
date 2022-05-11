import { Heading, Stack } from '@chakra-ui/react'
import clsx from 'clsx'
import { NavLink } from 'react-router-dom'
import logo from '/path1484.svg'

function Tab(prop: { name: string; route?: string }): JSX.Element {
  let route = prop.name
  if (typeof prop.route !== 'undefined')
    route = prop.route

  return (
    <NavLink
      to={`/${route}`}
      className={
        ({ isActive }) => clsx(
          'border border-transparent',
          'hover:text-brand-600',
          { 'border-b-brand-900 text-brand-900': isActive },
          { 'text-gray-600': !isActive },
        )}
    >
      <Heading
        size={'md'}
        letterSpacing={'0.1px'}
        pb={1}
        style={{ textTransform: 'capitalize' }}
      >
        { prop.name }
      </Heading>
    </NavLink>
  )
}

export default function SideBar() {
  // TODO: make responsive a bit
  return (
    <div className="px-16 py-20 h-full bg-gray-50 flex flex-col">
      <Stack spacing={4} direction="row" align="center">
        <Heading size={'md'} letterSpacing={0} color="brand.900">
          { 'Kuehne+Nagel'.toUpperCase() }
        </Heading>
        <img src={logo} alt="Logo" className="w-12 h-auto" />
      </Stack>

      <Stack spacing={8} mt={24} direction="column">
        <Tab
          name="home"
          route=""
        />
        <Tab
          name="shipments"
        />
      </Stack>

      <Heading mt={'auto'} mb={0} size={'xs'} letterSpacing={'0.1px'} color="gray.400">
        Powered by Pavel Mayorov
      </Heading>
    </div>
  )
}
