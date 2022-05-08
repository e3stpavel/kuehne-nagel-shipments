import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import Theme from '../chakra.config'
import Table from './views/shipments/Table/Table'
import About from './views/about/About'
import Index from './views/index/Index'
import App from './App'
import { store } from './app/store'
import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
import './styles/fonts.css'
import './index.css'
import 'virtual:windi-utilities.css'

// dev
import 'virtual:windi-devtools'
import reportWebVitals from './reportWebVitals'

ReactDOM.createRoot(document.getElementById('root')! as HTMLElement).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <ChakraProvider theme={Theme}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />}>
                <Route index element={<Index />} />
                <Route path="shipments" element={<Table />} />
                <Route path="about" element={<About />} />
              </Route>
            </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </ReduxProvider>
  </StrictMode>,
)

reportWebVitals()
