import { Routes, Route } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import DashboardPage from './pages/DashboardPage'
import CoinDetailPage from './pages/CoinDetailPage'

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="coin/:coinId" element={<CoinDetailPage />} />
      </Route>
    </Routes>
  )
}
