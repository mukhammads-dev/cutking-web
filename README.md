# CutKing — client web app

Customer-facing SPA for the CutKing barbershop (Busan). Clients browse services,
pick a master, choose a slot and manage their bookings. The staff-facing admin
panel lives in the separate `cut-king` backend repo (EJS/BSSR under `/admin`).

React 18 · TypeScript · Redux Toolkit · React Router 6 · MUI 5 · Axios

---

## Quick start

```bash
yarn install
cp .env.example .env      # point REACT_APP_API_URL at your backend
yarn start                # http://localhost:3000
```

The backend (`cut-king`) must be running — by default on `http://localhost:3009`.

| Script | What it does |
| --- | --- |
| `yarn start` | Dev server with hot reload |
| `yarn build` | Production bundle into `build/` |
| `yarn typecheck` | `tsc --noEmit`, strict |
| `yarn test` | CRA test runner |

The project uses **Yarn** (`yarn.lock` is committed), same as `burak-react`.
Do not mix in `npm install` — it creates a competing `package-lock.json` and the
two lockfiles drift apart.

---

## Architecture

Four layers, top to bottom. **A component never calls `axios` directly** — only
through `app/services/`.

```
UI            app/screens, app/components
   ↓ dispatch / call
STATE         Redux slice (server data) · Context (session) · useState (UI) · localStorage (persist)
   ↓ call
SERVICE       app/services/* — axios classes, the only place that talks HTTP
   ↓ HTTP
BACKEND       cut-king (Express + MongoDB)
```

### Folder map

```
src/
├── index.tsx                 Provider chain, app entry
├── styles/                   Design tokens + one stylesheet per page
├── lib/                      Pure layer — no React imports
│   ├── config.ts             serverApi, Messages, working hours, page limits
│   ├── sweetAlert.ts         Centralised alerts
│   ├── data/                 Static copy (faq, shop details)
│   ├── utils/                date.ts (slots, formatting), format.ts (price, enums)
│   ├── enums/                Mirrors the backend enums exactly
│   └── types/                Entity / Input / Inquiry / State interfaces
└── app/
    ├── App.tsx               Layout + routes + app-level state
    ├── store.ts / hooks.ts   Redux store, typed hooks
    ├── theme/                MUI design system (palette, typography, shadows)
    ├── context/              GlobalProvider — authMember + bookingBuilder
    ├── hooks/                useGlobals, useBookingCart, useReveal
    ├── services/             apiClient + MemberService / CuttingService / BookingService
    ├── components/           headers, footers, auth, cards, common
    └── screens/              One folder per page: index.tsx + slice.ts + selector.ts + parts
```

### State: four kinds, four tools

| State | Tool | Example |
| --- | --- | --- |
| Server data read by several components | **Redux Toolkit** | `services`, `pausedBookings` |
| Session-level, app-wide | **Context** | `authMember`, `bookingBuilder` |
| Local UI only | **useState** | modal open, active tab, search text |
| Must survive a refresh | **localStorage** | `cartData`, `memberData` |

`bookingBuilder` is a `Date` used purely as a refresh signal: after a booking is
created or cancelled, `setBookingBuilder(new Date())` re-runs the `useEffect`
that loads bookings. No prop drilling, no event bus.

### Naming conventions

| Thing | Rule | Example |
| --- | --- | --- |
| Page folder | camelCase + `Page` | `bookingPage/` |
| Page entry | always `index.tsx` | `screens/servicesPage/index.tsx` |
| Redux slice / selector | always `slice.ts` / `selector.ts` | |
| Reducer action | `set<Thing>` | `setServices` |
| Selector | `retrieve<Thing>` | `retrieveServices` |
| Selector wrapper | `<thing>Retriever` | `servicesRetriever` |
| Service class | PascalCase + `Service` | `BookingService` |
| Entity type | no suffix | `Booking` |
| Payload type | `...Input` | `BookingItemInput` |
| Query type | `...Inquiry` | `ServiceInquiry` |
| Redux state type | `...State` | `BookingPageState` |
| Event handler | `<verb><Thing>Handler` | `paginationHandler` |
| CSS class | kebab-case, `ck-` prefix | `ck-booking-card` |

### Adding a feature (bottom up)

1. `lib/types/*` and `lib/enums/*`
2. `lib/types/screen.ts` — add the `...State` and register it in `AppRootState`
3. `app/services/<X>Service.ts`
4. `app/screens/<x>Page/slice.ts`
5. `app/screens/<x>Page/selector.ts`
6. `app/store.ts` — key must match `AppRootState`
7. UI: `index.tsx` (fetch + dispatch), parts (`useSelector`), stylesheet, route in `App.tsx`

TypeScript catches you at every step if you go in this order.

---

## API contract

Base URL comes from `REACT_APP_API_URL`. Auth is a JWT in an `accessToken`
cookie; `apiClient` sends `withCredentials: true` on every request and clears the
local session on `401`.

| Service | Method | Endpoint |
| --- | --- | --- |
| Member | POST | `/member/signup`, `/member/login`, `/member/logout` |
| Member | GET | `/member/detail`, `/member/top-users`, `/member/barber` |
| Member | POST | `/member/update` (multipart, `memberImage`) |
| Services | GET | `/services/all?booking&page&limit&serviceCollection&search` |
| Services | GET | `/services/:id` |
| Booking | POST | `/booking/create` (array of `BookingItemInput`) |
| Booking | GET | `/booking/all?page&limit&bookingStatus` |
| Booking | POST | `/booking/update` |

Two quirks worth knowing, both matched deliberately in `CuttingService`:

- the sort field on `/services/all` is called **`booking`**, not `order`
- `/booking/create` takes an **array**; date, time and master are read from the
  first element

See **[BACKEND-NOTES.md](./BACKEND-NOTES.md)** for backend gaps this app works
around and the fixes to apply.

---

## Design system

Tokens are copied from the admin panel (`cut-king/src/public/css/main.css`) so
both surfaces read as one product: bright theme, no black backgrounds, coral
`#FF5A5A` as the accent and gold `#D4A017` as the secondary.

They live in two places that must stay in sync:

- `src/styles/index.css` — CSS custom properties (`--coral`, `--light2`, …)
- `src/app/theme/palette.ts` — the same values for MUI

Never hardcode a colour in a component. Use `var(--coral)` in CSS or
`theme.palette.primary.main` in `sx`.

### Video section

The homepage has a video block (`screens/homePage/Showcase.tsx`). Drop your clip
at `public/video/cutking.mp4` — see `public/video/README.md` for the format. The
section falls back to a poster if the file is missing, so it never breaks.

---

## Deploying

The build output is a static bundle — any static host works.

```bash
yarn build      # -> build/
```

- **Vercel / Netlify:** build command `yarn build`, output `build`, and set
  `REACT_APP_API_URL` in the project's environment variables.
- **Any static host:** serve `build/` with an SPA rewrite (all paths → `index.html`),
  otherwise a refresh on `/booking` returns 404.

Set the backend's CORS to your deployed origin with `credentials: true` — a
wildcard origin will not work once cookies are involved.

Environment variables are baked in at build time. Changing `REACT_APP_API_URL`
requires a rebuild, not just a restart.

---

## Deploy (VPS)

```bash
cp .env.example .env.production   # REACT_APP_API_URL=https://api.<domen>
yarn install --frozen-lockfile
yarn build                        # build/ papkasi tayyor
sudo mkdir -p /var/www/cutking && sudo cp -r build/* /var/www/cutking/
```

`REACT_APP_API_URL` build vaqtida kodga yoziladi — uni o'zgartirsangiz, qayta
`yarn build` qiling. Nginx konfiguratsiyasi va to'liq qadamlar backend
repodagi `cut-king/DEPLOY.md` faylida.
