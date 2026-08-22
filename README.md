# Floating Temple

Floating Temple is a mobile-first digital wellness experience built around immersive journeys through breath and sound by Tereza Dos Santos. The free MVP is intentionally small: React renders local journey metadata, while finished audio streams directly from AWS S3 or a custom audio domain.

## Tech stack

- React 19 and Vite
- React Router
- HTML5 Audio with custom controls
- Plain CSS
- Cloudflare Pages hosting
- AWS S3 audio storage

There is no backend, database, authentication, payment system, CMS, or AWS credential in the browser application.

## Project structure

```text
src/
  components/   Shared layout and audio controls
  data/         Feelings and journey metadata
  hooks/        HTML5 Audio state and controls
  pages/        Route-level experience screens
  styles/       Reset, variables, and global styles
  utils/        Audio URL and time helpers
```

## Local development

Requires a current Node.js release supported by Vite.

```bash
npm install
cp .env.example .env
npm run dev
```

Set the audio origin in `.env`, then open the local URL printed by Vite. Run `npm run lint` and `npm run build` before deployment.

## Environment variables

```dotenv
VITE_AUDIO_BASE_URL=https://audio.floatingtemple.com
```

This is a public audio origin, not a secret. Never add `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, bucket credentials, or signed URL secrets to a Vite environment variable.

The seeded journeys currently use the five sample files under `app-floating-temple/sample_audio`, in journey order. Replace the base URL and each journey's `audioPath` when production masters are published.

## AWS S3 setup

Create a bucket for published streaming copies only. Keep WAV masters elsewhere. Upload AAC audio in an M4A container at 256 kbps stereo using this key structure:

```text
journeys/come-back/come-back.m4a
journeys/soft-landing/soft-landing.m4a
journeys/open-heart/open-heart.m4a
journeys/release/release.m4a
journeys/deep-rest/deep-rest.m4a
```

Objects must be publicly readable for this MVP, either through the S3 object endpoint or, preferably, through a public custom domain in front of the bucket. Set each object's `Content-Type` to `audio/mp4` and use a long-lived `Cache-Control` value such as `public, max-age=31536000, immutable` when filenames are versioned.

Configure bucket CORS for the deployed site and local development:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedOrigins": [
      "https://floatingtemple.com",
      "https://www.floatingtemple.com",
      "http://localhost:5173",
      "http://127.0.0.1:5173"
    ],
    "ExposeHeaders": ["Content-Length", "Content-Range", "Accept-Ranges", "ETag"],
    "MaxAgeSeconds": 3600
  }
]
```

Replace the production origins with the actual Cloudflare Pages and custom domains. S3 supports byte-range requests used by browser seeking; do not proxy audio through the React application.

### Upload the first audio file

With the AWS CLI authenticated outside this project:

```bash
aws s3 cp ./come-back.m4a s3://YOUR_BUCKET/journeys/come-back/come-back.m4a \
  --content-type audio/mp4 \
  --cache-control "public, max-age=31536000, immutable"
```

Confirm that `${VITE_AUDIO_BASE_URL}/journeys/come-back/come-back.m4a` loads and supports seeking. AWS credentials stay in the AWS CLI profile and never enter this repository.

## Adding a journey

1. Export the streaming file as AAC, M4A, 256 kbps, stereo.
2. Upload it under `journeys/<slug>/<slug>.m4a`.
3. Add one object to `src/data/journeys.js` with a unique `id`, `slug`, title, description, duration, one or more feeling IDs, instruments, and matching `audioPath`.
4. Use an existing ID from `src/data/feelings.js`, or add a new feeling there.
5. Build and test the detail, player, and completion routes.

## Production build

```bash
npm run build
npm run preview
```

Vite writes the deployable application to `dist/`. The app loads only audio metadata until the listener explicitly presses play.

## Cloudflare Pages deployment

Connect the GitHub repository in Cloudflare Pages and configure:

- Framework preset: `Vite`
- Build command: `npm run build`
- Build output directory: `dist`
- Environment variable: `VITE_AUDIO_BASE_URL`

The committed `public/_redirects` file becomes `dist/_redirects` and rewrites unknown paths to `index.html`, so direct React Router URLs such as `/journey/come-back` work.

## Future membership architecture

Membership, accounts, Stripe, history, favourites, journaling, private audio, signed URLs, offline listening, and native clients are intentionally outside this MVP. Route-level pages, local data modules, and the audio URL helper provide clear replacement boundaries when an API and private delivery layer become necessary, without adding that infrastructure now.
