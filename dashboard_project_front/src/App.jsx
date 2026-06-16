import { useState, useEffect } from 'react'

function App() {

  const [coins, setCoins] = useState([])

  useEffect(() => {

    async function cargarDatos() {

      const response = await fetch('http://127.0.0.1:8000/api/coins/')

      const data = await response.json()

      setCoins(data)
    }

    cargarDatos()

  }, [])

  console.log(coins)

  return (
    <div>
      <h1>Dashboard Cripto</h1>
    </div>
  )
}

export default App