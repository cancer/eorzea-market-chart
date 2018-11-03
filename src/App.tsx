import * as React from 'react'
import './App.css'
import Header from "./screens/shared/Header"

const App = ({ component }: { component: React.Component }) => {
  return (
    <div className="App">
      <Header />
      {component}
    </div>
  )
}

export default App
