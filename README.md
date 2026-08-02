# Al-Huda Islamic Centre (AIC) Website

The official website for **Al-Huda Islamic Centre** — a beacon of knowledge, community,
and support for the Muslim community in Newfoundland and beyond. It provides live prayer
times, programs, community events, and information about the centre.

The project is a monorepo with two independently deployable parts:

| Part      | Stack                              | Deploys to        |
| --------- | ---------------------------------- | ----------------- |
| `client/` | React 19 + Vite + React Router     | Vercel (static)   |
| `server/` | Express 5 + Firebase Admin (Firestore) | Cloud Run (Docker) |

---

## Features

- **Live prayer times** — geolocated, via the [Aladhan API](https://aladhan.com/prayer-times-api) (ISNA method by default), with next-prayer countdown and Hijri date.
- **Programs** — Weekend Islamic Classes, Jumuah, Ramadan/Tafseer, lectures, and more.
- **Events** — a browsable events listing (`/events`) where each event opens a full detail page (`/events/:id`), backed by Firestore.
- **Community & FAQ** sections, donation info, executives, and contact.
- **Design system** — a single token-driven visual language (see [DESIGN.md](DESIGN.md)).
- **Graceful degradation** — the API falls back to in-memory storage when Firebase credentials are absent, so the backend runs locally without any secrets.

---

## Project structure

```
al-huda-website/
├── client/                 # React + Vite front end
│   ├── src/
│   │   ├── components/      # Reusable UI (Navbar, PageHero, sections, primitives)
│   │   ├── pages/           # Routed pages (Home, Events, EventDetail, Mission, …)
│   │   ├── services/        # API clients (prayerTimes.js, events.js)
│   │   ├── index.css        # Design tokens (source of truth for DESIGN.md)
│   │   └── App.jsx          # Router + route table
│   ├── vite.config.js       # Dev server + /api proxy to localhost:5000
│   └── vercel.json          # SPA rewrites for Vercel
│
├── server/                 # Express API
│   ├── config/firebase.js   # Firebase Admin init (with in-memory fallback)
│   ├── models/              # Event, User, Announcement, Donation, BaseModel
│   ├── routes/              # prayer, user, and generic CRUD routes
│   ├── server.js            # App entry (CORS, logging, error handling)
│   └── Dockerfile           # Cloud Run image
│
├── DESIGN.md               # Visual design system / token reference
└── social-media/           # Marketing assets
```

---

## Getting started

### Prerequisites

- **Node.js 20+** and npm
- (Optional) A Firebase project with Firestore for persistent data. Without it, the
  API runs on an in-memory store that resets on restart.

### 1. Backend (`server/`)

```bash
cd server
npm install
npm run dev        # node --watch server.js  → http://localhost:5000
```

Create a `server/.env` file if you want to connect Firestore:

```bash
PORT=5000
NODE_ENV=development
# Comma-separated list of allowed front-end origins
CLIENT_URL=http://localhost:5173
# Absolute path to a Firebase service-account JSON key (omit to use in-memory storage)
FIREBASE_SERVICE_ACCOUNT=/absolute/path/to/serviceAccountKey.json
FIREBASE_DATABASE_URL=https://<your-project>.firebaseio.com
```

> If `FIREBASE_SERVICE_ACCOUNT` is unset, the server falls back to Google
> "application default credentials", and if those are also unavailable it logs a
> warning and serves from in-memory collections.

### 2. Front end (`client/`)

```bash
cd client
npm install
npm run dev        # vite → http://localhost:5173
```

In development, Vite proxies `/api/*` to `http://localhost:5000` (see
`vite.config.js`), so no extra configuration is needed when both run locally.

For production builds, set the API base URL in `client/.env.production`:

```bash
VITE_API_BASE_URL=https://your-cloud-run-url
```

---

## Scripts

### Client (`client/`)

| Command           | Description                        |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Start Vite dev server (port 5173)  |
| `npm run build`   | Production build to `dist/`        |
| `npm run preview` | Serve the production build locally |
| `npm run lint`    | Run ESLint                         |

### Server (`server/`)

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm start`     | Start the API (`node server.js`)     |
| `npm run dev`   | Start with file watching (`--watch`) |

---

## API reference

Base path: `/api`. All responses are JSON of the form `{ success, data, ... }`.

### Prayer times — `/api/prayer`
| Method | Path         | Description                                                    |
| ------ | ------------ | ------------------------------------------------------------- |
| GET    | `/times`     | Prayer times for `lat`, `lng`, `method` (default 2/ISNA), `date` |
| GET    | `/calendar`  | Full-month timings for `lat`, `lng`, `month`, `year`          |
| GET    | `/methods`   | List of supported calculation methods                         |

### Generic CRUD — `/api/data/:collection`
Flexible Firestore-backed CRUD used by the events feature (`collection` = `events`).
| Method | Path                       | Description                                        |
| ------ | -------------------------- | -------------------------------------------------- |
| GET    | `/:collection`             | List docs (`?limit=&orderBy=&orderDir=`)           |
| GET    | `/:collection/:id`         | Get one doc (404 if missing)                       |
| POST   | `/:collection`             | Create a doc (validated if a model is registered)  |
| PATCH  | `/:collection/:id`         | Update a doc                                        |
| DELETE | `/:collection/:id`         | Delete a doc                                        |

### Users — `/api/users`
| Method | Path      | Description                    |
| ------ | --------- | ------------------------------ |
| POST   | `/`       | Create/update a user profile   |
| GET    | `/:uid`   | Get a user profile             |
| PATCH  | `/:uid`   | Update user preferences        |

### Health — `GET /api/health`
Returns `{ status, timestamp, uptime }`.

### Event shape
Documents in the `events` collection (see `server/models/Event.js`):

```jsonc
{
  "title": "string (required)",
  "description": "string",
  "type": "general",
  "date": "string (required)",     // ISO date or timestamp
  "location": "string",
  "organizer": "string",
  "imageURL": "string",
  "isActive": true,
  "tags": []
}
```

---

## Deployment

### Front end → Vercel
The `client/` directory builds to a static SPA. `vercel.json` rewrites all routes to
`index.html` for client-side routing. Set `VITE_API_BASE_URL` to the deployed API URL.

```bash
cd client && npm run build   # output in dist/
```

### API → Cloud Run (Docker)
`server/Dockerfile` produces a Node 20 image that reads `PORT` from the environment
(Cloud Run defaults to 8080).

```bash
cd server
docker build -t al-huda-api .
docker run -p 8080:8080 --env-file .env al-huda-api
```

Remember to add each front-end origin to `CLIENT_URL` (comma-separated) so CORS allows it.

---

## Design system

All visual decisions — color, typography, spacing, shadows, and shared primitives
(`GeometricPattern`, `PageHero`, `Reveal`, buttons, cards) — are documented in
[DESIGN.md](DESIGN.md). Tokens live in `client/src/index.css`; components must use
them rather than hardcoding values.
