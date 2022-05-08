import { theme as base, extendTheme } from '@chakra-ui/react'

const overrides = {
  colors: {
    brand: {
      900: '#12316E',
    },
  },
  fonts: {
    heading: `SuisseIntl, ${base.fonts?.heading}`,
    body: `SuisseIntl, ${base.fonts?.body}`,
  },
  components: {
    Heading: {
      baseStyle: {
        letterSpacing: '-0.4px',
      },
    },
    Text: {
      baseStyle: {
        letterSpacing: '0.1px',
      },
    },
  },
}

const Theme = extendTheme(overrides)

export default Theme
