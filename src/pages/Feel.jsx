import { Link } from 'react-router-dom'
import AppLayout from '../components/AppLayout.jsx'
import BackButton from '../components/BackButton.jsx'
import { feelings } from '../data/feelings.js'

export default function Feel() {
  return (
    <AppLayout className="feel-screen">
      <BackButton to="/prepare" />
      <h1 className="statement">How would you<br />like to feel?</h1>
      <div className="feeling-list">
        {feelings.map((feeling) => (
          <Link key={feeling.id} to={`/journeys/${feeling.id}`}>{feeling.label}</Link>
        ))}
      </div>
    </AppLayout>
  )
}
