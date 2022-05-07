import { Box, Stack, Heading } from "@chakra-ui/react";
import styles from './Sidebar.module.css'
import logo from '../../assets/path1484.svg'

function Tab (prop: { name: string, active: boolean }) {
  return (
    <Stack direction='column' spacing={2}>
      <Heading size='md' letterSpacing={"0.1px"} color={prop.active ? 'black' : 'gray.600' }>{prop.name}</Heading>
      <Box display={prop.active ? 'block' : 'none'} width='100%' height='px' bg="brand.900" />
    </Stack>
  )
}

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <Stack bg='gray.50' width='100%' height='100%' direction='column' px={16} py={20}>
        {/* LOGO */}
        <Stack direction='row' spacing={4} align='center' pb={24}>
          <Heading size='md' color='brand.900' letterSpacing={0}>{ 'Kuehne+Nagel'.toUpperCase() }</Heading>
          <img src={logo} alt="Logo" width={49.8} height={49.5} />
        </Stack>

        {/* TABS */}
        <Stack direction='column' spacing={8}>
          <Tab
            name="Shipments"
            active={true}
          />
          <Tab
            name="About"
            active={false}
          />
        </Stack>

        <Heading size='xs' color='gray.400' mb={0} mt='auto !important'>Powered by Pavel Mayorov</Heading>
      </Stack>
    </aside>
  )
}