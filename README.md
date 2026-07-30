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

Lead submissions are sent directly from the client to FormSubmit's AJAX endpoint.
The server API route also forwards to FormSubmit for compatibility with older deployed
client bundles.

The first production submission to `info@trehanvistabhiwadi.com` will trigger a FormSubmit
activation email. Open that email and confirm the address before expecting regular lead delivery.
No Hostinger SMTP environment variables are required.

## Assets

Local images live in `public/images/trehan-vista/`. See `README-ASSETS.md` for every required image and replacement status.
