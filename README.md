# HopeConnect - NGO Donation Platform

HopeConnect is a modern, full-stack web application designed for non-governmental organizations (NGOs) to manage user registrations and donations seamlessly. The platform ensures that user record-keeping is decoupled from payment processing, guaranteeing that user data is preserved regardless of the transaction outcome.

##  Features

-   **User Authentication**: Secure registration and login using NextAuth.js.
-   **Donation Management**: Integrated with Razorpay for secure and transparent payment processing.
-   **User Dashboard**: Track personal impact, view donation history, and manage profiles.
-   **Admin Dashboard**: High-level overview of total donations and user contributions.
-   **Responsive Design**: Built with Tailwind CSS for a seamless experience across all devices.
-   **Data Integrity**: Clear separation between users and donation records.

##  Tech Stack

-   **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Database**: [SQLite](https://www.sqlite.org/) (Local file-based)
-   **ORM**: [Prisma](https://www.prisma.io/)
-   **Authentication**: [NextAuth.js](https://next-auth.js.org/)
-   **Payments**: [Razorpay](https://razorpay.com/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Icons**: [Lucide React](https://lucide.dev/)

##  Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or higher)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

##  Getting Started

### 1. Clone the repository
```bash
git clone <repository-url>
cd donation-management-system-1
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory and add the following:
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Razorpay Keys
RAZORPAY_KEY_ID="your-razorpay-key-id"
RAZORPAY_KEY_SECRET="your-razorpay-key-secret"
NEXT_PUBLIC_RAZORPAY_KEY_ID="your-razorpay-key-id"

# Stripe Keys (Optional/Alternative)
STRIPE_SECRET_KEY="your-stripe-secret-key"
STRIPE_PUBLISHABLE_KEY="your-stripe-publishable-key"
STRIPE_WEBHOOK_SECRET="your-stripe-webhook-secret"
```

### 4. Database Initialization
```bash
npx prisma generate
npx prisma db push
```

### 5. Create Admin User (Optional)
```bash
node create_admin.js
```

### 6. Run the application
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

##  Project Structure

- `src/app`: Next.js pages and API routes.
- `src/components`: Reusable UI components.
- `src/lib`: Shared utilities (Prisma client, Razorpay config, etc.).
- `prisma`: Database schema and migrations.
- `public`: Static assets (images, icons).

##  Security

-   **Password Hashing**: Uses BCrypt for secure storage.
-   **Session Management**: JWT-based session handling via NextAuth.
-   **Payment Validation**: Server-side signature verification for all Razorpay transactions.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
