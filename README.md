
Run dev server: `npm run dev`.
Open `http://localhost:3000` in your browser.

## test
npm test


## Tech choices

Next.js App Router with React Hook Form for form management.
Zod for schema validation integrated via `@hookform/resolvers/zod`.
Tailwind CSS for styling.
Uses native HTML date input.
Services implemented as checkboxes.
Submit disabled during submission.
Shows inline errors, success message with summary, and error alert on failure.

## Assumptions

Backend endpoint accepts POST JSON with validated fields.
Backend returns 2xx on success, non-2xx on failure.
No file uploads or local API routes.
Budget field is optional.
