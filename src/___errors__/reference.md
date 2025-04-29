# 🛠️ Error & Issue Reference

## 🔒 Clerk SignIn UI Issue

**Problem:**  
The `<SignIn />` component did not render properly. Even though the user was already signed in, the UI showed the **Sign In** button instead of the user profile.

**Important Note:**  
This is **not an actual error** from Clerk. It happens because when a user is already signed in, Clerk automatically redirects to the `afterSignIn` URL. If not handled properly in the UI, it may still show a Sign In button.

in concole it showed this:
Clerk: Clock skew detected. This usually means that your system clock is inaccurate. Clerk will attempt to account for the clock skew in development.

To resolve this issue, make sure your system's clock is set to the correct time (e.g. turn off and on automatic time synchronization).

---

JWT cannot be used prior to not before date claim (nbf). Not before date: Mon, 28 Apr 2025 14:03:20 GMT; Current date: Mon, 28 Apr 2025 14:02:38 GMT; (reason=token-not-active-yet, token-carrier=cookie)  
Clerk: Clock skew detected. This usually means that your system clock is inaccurate. Clerk will attempt to account for the clock skew in development.

**Solution:** \
To resolve this issue, make sure your system's clock is set to the correct time (e.g. turn off and on automatic time synchronization).

---

## ❌ Invalid Import: 'server-only' in a Client Component

**Error Message:**  
Invalid import
'server-only' cannot be imported from a Client Component module.

**Reason:**  
Happened because:

- I imported `{ currentUser }` from `@clerk/nextjs/server` inside a function (`createUser`) and called it directly in the `Header` component.
- The `Header.jsx` was marked with `'use client'`.

**Solution:**

- Removed `'use client'` from `Header.jsx`, making it a **Server Component**.
- Now, `createUser()` can be imported and called safely.
- No API Route or Server Action needed since Prisma and Clerk run safely on server components.

---
