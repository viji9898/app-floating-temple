import { useNavigate } from 'react-router-dom'

export default function BackButton({ to }) {
  const navigate = useNavigate()

  return (
    <button
      className="back-button"
      type="button"
      aria-label="Go back"
      onClick={() => (to ? navigate(to) : navigate(-1))}
    >
      ←
    </button>
  )
}
