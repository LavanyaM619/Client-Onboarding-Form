<img width="1512" height="982" alt="Screenshot 2025-08-13 at 11 27 18" src="https://github.com/user-attachments/assets/02c1322e-8c6b-456b-bf62-b836b4084b55" />
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
<img width="1512" height="982" alt="Screenshot 2025-08-13 at 11 27 18" src="https://github.com/user-attachments/assets/68f25fdb-588c-4f1a-a2a2-1f241b5ca9c8" />


 <img width="704" height="324" alt="Screenshot 2025-08-13 at 10 31 38" src="https://github.com/user-attachments/assets/497a4026-e593-4bcb-a558-efd044cc7749" />

