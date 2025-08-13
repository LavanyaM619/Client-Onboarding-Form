
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
 <img width="704" height="324" alt="Screenshot 2025-08-13 at 10 31 38" src="https://github.com/user-attachments/assets/497a4026-e593-4bcb-a558-efd044cc7749" />
![Uploading Screenshot 2025-08-13 at 11.27.18.png…]()
