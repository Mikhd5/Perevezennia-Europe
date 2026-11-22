# Perevezennia Europe — responsive website

A responsive static one-page website concept for international passenger transport between Ukraine and European countries.

## Included
- `index.html` — all content sections, mobile navigation, destination selector, booking form, contact links and photo lightbox.
- `styles.css` — responsive styling, rounded components, cinematic image treatment, reveal transitions and reduced-motion support.
- `script.js` — mobile menu, scroll reveals, destination preselection, date validation, WhatsApp message generation and image lightbox.
- `assets/` — WebP imagery exported on 3840 × 2160 canvases and an SVG brand mark.

## Booking flow
The booking form validates the required information and opens a prefilled WhatsApp message to `+380630606110`. It does not store requests or confirm seat availability; the manager must confirm the booking.

## Local preview
Open `index.html` in a browser or run a static server from this directory, for example:

```bash
python -m http.server 4173
```

## Deployment
The site is static and can be deployed to Vercel with the project root set to this folder. No build command is required.

## Before production
- Confirm exact supported city-to-city routes and stop locations. Country flags mirror the carrier's social profile; the page asks visitors to confirm specific cities with the manager.
- Confirm current vehicle capacity, daily departure schedule and amenities with the carrier.
- Replace the illustrative AI-generated vehicle/interior images with original photos of the actual fleet when available.
- Confirm that the contact phone and Viber/WhatsApp links are current.
