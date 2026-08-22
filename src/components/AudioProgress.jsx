import { formatTime } from '../utils/formatTime.js'

export default function AudioProgress({ currentTime, duration, fallbackDuration, onSeek }) {
  const displayDuration = duration || fallbackDuration
  const maximum = duration || fallbackDuration || 1

  return (
    <div className="audio-progress">
      <span>{formatTime(currentTime)}</span>
      <input
        type="range"
        min="0"
        max={maximum}
        step="1"
        value={Math.min(currentTime, maximum)}
        aria-label="Journey progress"
        style={{ '--progress': `${(currentTime / maximum) * 100}%` }}
        onChange={(event) => onSeek(Number(event.target.value))}
      />
      <span>{formatTime(displayDuration)}</span>
    </div>
  )
}
