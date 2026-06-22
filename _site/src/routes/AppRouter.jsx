import { Routes, Route } from 'react-router-dom'
import { Layout } from '../components/layout'
import { HomePage, GamePage, ResultsPage } from '../pages'

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="game" element={<GamePage />} />
        <Route path="results" element={<ResultsPage />} />
      </Route>
    </Routes>
  )
}
