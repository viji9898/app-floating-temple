import { useParams } from 'react-router-dom'
import AppLayout from '../components/AppLayout.jsx'
import PrimaryAction from '../components/PrimaryAction.jsx'
import JourneyPlayer from '../components/JourneyPlayer.jsx'
import { findJourney } from '../data/journeys.js'

export default function Player() {
  const { slug } = useParams()
  const journey = findJourney(slug)

  if (!journey) {
    return (
      <AppLayout className="message-screen">
        <p className="statement">Journey not found.</p>
        <PrimaryAction to="/">RETURN HOME →</PrimaryAction>
      </AppLayout>
    )
  }

  return <JourneyPlayer journey={journey} />
}
