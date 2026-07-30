# Trehan Vista Bhiwadi Landing Website

Production-ready single-page landing website for Trehan Vista, built with Next.js App Router, TypeScript, Tailwind CSS, React Hook Form, Zod, Framer Motion and Lucide React.

## Local Development

```bash
npm install
npm run dev
```

The local preview runs at `http://localhost:3000/`.

## Verification

```bash
npx tsc --noEmit
npm run lint
npm run build
npm test
```

## Content Management

Project facts, pricing, contact details, configurations, amenities, furnishing items, disclaimers and location data are centralised in `src/data/project.ts`.

Do not add outdated prices, floor-wise prices, unverified RERA numbers, possession dates, travel times, distances, guarantees, bank partnerships or final all-inclusive pricing unless verified by the project owner.

## Lead Email Notifications

Lead submissions are sent through the server-side API route at `src/app/api/leads/route.ts`.

Configure these environment variables in Hostinger, without exposing them in frontend code:

```env
LEAD_EMAIL_CONFIG=host=smtp.hostinger.com;port=465;user=info@example.com;pass=password;from=info@example.com;to=info@example.com
```

## Assets

Local images live in `public/images/trehan-vista/`. See `README-ASSETS.md` for every required image and replacement status.
