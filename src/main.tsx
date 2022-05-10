import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import Theme from '../chakra.config'
import Table from './views/shipments/Table/Table'
import Home from './views/home/Home'
import Details from './views/shipments/Details'
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
                <Route index element={<Home />} />
                <Route path="shipments">
                  <Route index element={<Table />} />
                  <Route path=":orderNo" element={<Details />} />
                </Route>
              </Route>
            </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </ReduxProvider>
  </StrictMode>,
)

reportWebVitals()
