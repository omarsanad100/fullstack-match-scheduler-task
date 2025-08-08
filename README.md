# 🚀 Fullstack Match Scheduler

A modern web app to schedule and manage esports tournament matches, built with **Next.js**, **React**, **Prisma**, and **Tailwind CSS**.

---

## Features

- **Create Tournaments:** Add new tournaments with instant validation.
- **Schedule Matches:** Assign teams, dates, and tournaments to matches.
- **Edit & Delete Matches:** Update or remove matches with optimistic UI for a fast experience.
- **Live Dropdowns:** Tournament dropdown updates instantly after adding a new tournament.
- **Responsive UI:** Clean, modern design with dark mode support.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, Next.js 15, Tailwind CSS
- **Backend:** Next.js API routes, Prisma ORM
- **Database:** (Configure your own with Prisma)
- **Validation:** Zod + React Hook Form
- **HTTP:** Axios
- **UI:** Radix UI, Lucide Icons

---

## ✨ How It Works

1. **State Lifting:**  
   Tournament data is managed in the top-level `Home` component, so all parts of the app see updates instantly.

2. **Callback Props:**  
   After adding a tournament, the form calls a callback to refresh the tournament list, updating dropdowns without a page reload.

3. **Optimistic UI:**  
   When editing or deleting matches, the UI updates immediately. If the server fails, changes are reverted for consistency.

4. **Validation:**  
   All forms use Zod schemas for robust, user-friendly validation.

---

## 🧑‍💻 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Set up your database (see Prisma docs)
npx prisma migrate dev

# 3. Start the dev server
npm run dev
```

---

## 📁 Project Structure

- `/app` — Next.js pages and API routes
- `/components` — React UI components
- `/prisma` — Prisma schema and migrations

---

## 💡 Key Decisions

- **Axios** is used for HTTP requests for its simplicity and better error handling.
- **State lifting** and **callback props** keep the UI in sync after data changes.
- **Optimistic updates** make the app feel fast and responsive.

---

## 📝 Author Notes

- This project demonstrates best practices in modern React and Next.js development.
- Easily extendable for more features like authentication, notifications, or team management.
