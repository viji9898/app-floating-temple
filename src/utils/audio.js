export function getAudioUrl(audioPath) {
  const baseUrl = import.meta.env.VITE_AUDIO_BASE_URL?.replace(/\/$/, '') ?? ''
  return `${baseUrl}/${audioPath}`
}
