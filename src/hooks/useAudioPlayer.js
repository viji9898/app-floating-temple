import { useCallback, useEffect, useRef, useState } from 'react'

export function useAudioPlayer(src) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [ended, setEnded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return undefined

    const onLoadedMetadata = () => {
      setDuration(Number.isFinite(audio.duration) ? audio.duration : 0)
      setIsLoading(false)
      setError(false)
    }
    const onTimeUpdate = () => setCurrentTime(audio.currentTime)
    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    const onEnded = () => {
      setIsPlaying(false)
      setEnded(true)
    }
    const onError = () => {
      setIsPlaying(false)
      setIsLoading(false)
      setError(true)
    }

    audio.addEventListener('loadedmetadata', onLoadedMetadata)
    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('ended', onEnded)
    audio.addEventListener('error', onError)

    return () => {
      audio.pause()
      audio.removeEventListener('loadedmetadata', onLoadedMetadata)
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('error', onError)
    }
  }, [src])

  const play = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return
    setEnded(false)
    setError(false)
    try {
      await audio.play()
    } catch {
      setIsLoading(false)
      setError(true)
    }
  }, [])

  const pause = useCallback(() => audioRef.current?.pause(), [])

  const seek = useCallback((time) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = Math.max(0, Math.min(time, audio.duration || time))
    setCurrentTime(audio.currentTime)
  }, [])

  const restart = useCallback(() => {
    seek(0)
    setEnded(false)
  }, [seek])

  const retry = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    setError(false)
    setIsLoading(true)
    audio.load()
  }, [])

  return {
    audioRef,
    play,
    pause,
    seek,
    restart,
    retry,
    isPlaying,
    currentTime,
    duration,
    progress: duration ? currentTime / duration : 0,
    ended,
    isLoading,
    error,
  }
}
