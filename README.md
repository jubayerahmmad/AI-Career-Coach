# SENS-AI 🎯

_Your personalized AI-powered career coaching platform_

---

## 🚀 Overview

**SENS-AI** helps users discover career paths tailored to their skills and interests. Through intelligent onboarding, industry insights, and skill-based recommendations, users receive ongoing career coaching and trends.

Built with:

- Next.js 15 App Router
- ShadCN UI for sleek design
- Clerk for authentication
- Prisma ORM + PostgreSQL (via Neon)
- React Hook Form + Zod validation
- Sonner for toast notifications

---

## ✨ Features

- Will be Added Soon

---

## 🛠️ Tech Stack

| Category      | Tech                    |
| ------------- | ----------------------- |
| Frontend      | Next.js 15, React       |
| Styling       | Tailwind CSS, ShadCN UI |
| Forms         | React Hook Form, Zod    |
| Auth          | Clerk                   |
| Database      | PostgreSQL (via Neon)   |
| ORM           | Prisma                  |
| Notifications | Sonner                  |

---

## 📦 Dependencies

```json
"@clerk/nextjs": "^6.16.0",
"@clerk/themes": "^2.2.34",
"@hookform/resolvers": "^5.0.1",
"@prisma/client": "^6.6.0",
"@radix-ui/react-accordion": "^1.2.7",
"@radix-ui/react-alert-dialog": "^1.1.10",
"@radix-ui/react-dialog": "^1.1.10",
"@radix-ui/react-dropdown-menu": "^2.1.10",
"@radix-ui/react-label": "^2.1.4",
"@radix-ui/react-progress": "^1.1.4",
"@radix-ui/react-radio-group": "^1.3.2",
"@radix-ui/react-select": "^2.2.2",
"@radix-ui/react-slot": "^1.2.0",
"@radix-ui/react-tabs": "^1.1.7",
"class-variance-authority": "^0.7.1",
"clsx": "^2.1.1",
"inngest": "^3.35.0",
"lucide-react": "^0.501.0",
"next": "15.3.1",
"next-themes": "^0.4.6",
"react": "^19.0.0",
"react-dom": "^19.0.0",
"react-hook-form": "^7.56.1",
"sonner": "^2.0.3",
"tailwind-merge": "^3.2.0",
"tw-animate-css": "^1.2.5",
"zod": "^3.24.3"
```

---

## 🛆 Installation

1. **Clone the repo**

   ```bash
   git clone https://github.com/jubayerahmmad/AI-Career-Coach
   cd sens-ai
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file and add:

   ```env
   DATABASE_URL=your_neon_database_url
   CLERK_SECRET_KEY=your_clerk_secret
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/register
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
   ```

4. **Push Prisma schema & seed database**

   ```bash
   npx prisma migrate dev --name create-models
   ```

5. **Run the dev server**
   ```bash
   npm run dev
   ```

---

## 🙌 Contributing

Contributions are welcome! Open issues, suggest features, or fork and create a pull request.

---
