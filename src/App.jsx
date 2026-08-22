import { Navigate, Route, Routes } from 'react-router-dom'
import Complete from './pages/Complete.jsx'
import Feel from './pages/Feel.jsx'
import Journey from './pages/Journey.jsx'
import Journeys from './pages/Journeys.jsx'
import Landing from './pages/Landing.jsx'
import Player from './pages/Player.jsx'
import Prepare from './pages/Prepare.jsx'
import Reflection from './pages/Reflection.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/prepare" element={<Prepare />} />
      <Route path="/feel" element={<Feel />} />
      <Route path="/journeys/:feeling" element={<Journeys />} />
      <Route path="/journey/:slug" element={<Journey />} />
      <Route path="/journey/:slug/play" element={<Player />} />
      <Route path="/journey/:slug/complete" element={<Reflection />} />
      <Route path="/complete" element={<Complete />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
