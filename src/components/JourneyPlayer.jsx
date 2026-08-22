import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAudioPlayer } from '../hooks/useAudioPlayer.js'
import { getAudioUrl } from '../utils/audio.js'
import AudioProgress from './AudioProgress.jsx'
import BreathCircle from './BreathCircle.jsx'

export default function JourneyPlayer({ journey }) {
  const navigate = useNavigate()
  const [controlsVisible, setControlsVisible] = useState(true)
  const audioUrl = getAudioUrl(journey.audioPath)
  const {
    audioRef,
    play,
    pause,
    seek,
    restart,
    retry,
    isPlaying,
    currentTime,
    duration,
    ended,
    isLoading,
    error,
  } = useAudioPlayer(audioUrl)

  useEffect(() => {
    if (!ended) return undefined
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timeout = window.setTimeout(
      () => navigate(`/journey/${journey.slug}/complete`, { replace: true }),
      reducedMotion ? 0 : 500,
    )
    return () => window.clearTimeout(timeout)
  }, [ended, journey.slug, navigate])

  const togglePlayback = () => {
    if (isPlaying) pause()
    else play()
  }

  return (
    <main
      className={`app-shell player-screen screen-enter${ended ? ' screen-exit' : ''}`}
      onClick={() => setControlsVisible((visible) => !visible)}
    >
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      <button
        type="button"
        className={`player-exit ${controlsVisible ? 'is-visible' : ''}`}
        aria-label="Exit journey"
        onClick={(event) => {
          event.stopPropagation()
          pause()
          navigate(`/journey/${journey.slug}`)
        }}
      >
        EXIT
      </button>

      {error ? (
        <div className="player-message" onClick={(event) => event.stopPropagation()}>
          <p>This journey couldn't<br />be loaded.</p>
          <button type="button" onClick={retry}>TRY AGAIN</button>
        </div>
      ) : (
        <>
          <div className="player-prompt">
            <p>Close your eyes.</p>
            <p>Take a slow<br />breath in.</p>
          </div>
          <BreathCircle />
          <div className="player-controls" onClick={(event) => event.stopPropagation()}>
            {isLoading && <p className="loading-copy">Preparing your journey...</p>}
            <AudioProgress
              currentTime={currentTime}
              duration={duration}
              fallbackDuration={journey.durationSeconds}
              onSeek={seek}
            />
            <button
              type="button"
              className="play-control"
              aria-label={isPlaying ? 'Pause journey' : 'Play journey'}
              onClick={togglePlayback}
            >
              {isPlaying ? 'PAUSE' : 'PLAY'}
            </button>
            <button
              type="button"
              className={`restart-control ${controlsVisible ? 'is-visible' : ''}`}
              onClick={restart}
            >
              RESTART
            </button>
          </div>
        </>
      )}
    </main>
  )
}
