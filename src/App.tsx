// import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from './components/Sidebar'
import './styles/App.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className="App flex flex-row items-center">
      <aside className="h-full" style={{ minWidth: 'fit-content' }}>
        <SideBar />
      </aside>
      <div className="h-full w-full bg-white px-16 py-20">
        <Outlet />
      </div>
    </div>
  )
}

export default App
