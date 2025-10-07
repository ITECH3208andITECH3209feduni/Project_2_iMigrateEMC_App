# iMigrateEMC Visa Consultancy Web App

iMigrateEMC is a modern, responsive web application designed for a visa and immigration consultancy. It provides a seamless, multi-step appointment booking experience for clients, along with powerful admin dashboards for managing bookings and communicating with users in real-time.

## ✨ Features

### Client-Facing Application
*   **Intuitive Multi-Step Booking:** A guided 4-step process for scheduling appointments:
    1.  **Select Service:** Choose from various consultation types.
    2.  **Pick Date & Time:** Select an available date from an interactive calendar and a time slot.
    3.  **Provide Details:** Add purpose of consultation, specific questions, and upload supporting documents.
    4.  **Review & Confirm:** View a full summary before confirming the booking.
*   **Secure User Authentication:** Full auth flow including sign-up, sign-in, and a secure password reset with OTP verification, all powered by Supabase Auth.
*   **User Dashboard:**
    *   **My Bookings:** A dedicated modal for users to view their past and upcoming appointments.
    *   **Profile Management:** Users can update their personal information, such as full name and phone number.
*   **Live Chat:** A real-time chat widget allows logged-in users to communicate directly with an admin for support.
*   **Static & Informational Pages:**
    *   **Home:** An engaging landing page with a hero section, client testimonials, and team overview.
    *   **Visa:** Detailed information on different visa categories.
    *   **EOI Form:** A comprehensive "Expression of Interest" form for potential business partners.
    *   **About:** Information about the company's story and core values.
*   **Fully Responsive:** A mobile-first design that looks great on all devices, featuring a fixed bottom navigation bar for easy access on smaller screens.

### Admin Dashboards
*   **Bookings Dashboard (`admin.html`):** A central place to view all client bookings in a detailed, sortable table. It shows client details, appointment time, service type, cost, status, and links to uploaded documents.
*   **Live Chat Dashboard (`chat-admin.html`):** An interface for administrators to view all active conversations, select a user, and chat with them in real-time.

## 🛠 Tech Stack

*   **Frontend:**
    *   [React](https://reactjs.org/) (with Hooks)
    *   [TypeScript](https://www.typescriptlang.org/)
    *   [Tailwind CSS](https://tailwindcss.com/) for styling
    *   [Framer Motion](https://www.framer.com/motion/) for smooth page transitions and animations
*   **Backend as a Service (BaaS):**
    *   [Supabase](https://supabase.io/)
        *   **Database:** PostgreSQL for storing all application data.
        *   **Auth:** Manages user authentication, authorization, and password resets.
        *   **Storage:** Handles secure file uploads for supporting documents.
        *   **Realtime:** Powers the live chat functionality for both clients and admins.

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   A [Supabase](https://supabase.io/) account.
*   Node.js and a package manager like npm or yarn (for local development).

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/imigrate-emc-app.git
cd imigrate-emc-app
```

### 2. Set Up Supabase

1.  **Create a New Project:** Go to your Supabase dashboard and create a new project.
2.  **Database Schema:** Use the SQL Editor in your Supabase project to run the necessary schema definitions. You will need to create tables for `profiles`, `bookings`, `chat_messages`, `consultation_type`, `partner_eoi`, etc.
3.  **Get API Keys:** In your Supabase project, go to **Project Settings > API**. You will need the **Project URL**, the `anon` **public key**, and the `service_role` **secret key** (for the admin chat dashboard).
4.  **Enable Email Provider:** Go to **Authentication > Providers** and ensure the **Email** provider is enabled.
5.  **Configure Auth Templates:** Go to **Authentication > Email Templates** and customize the "Confirm Signup" and "Reset Password for Email" templates. Ensure the reset password template includes the `{{ .Token }}` variable for the OTP flow to work.
6.  **Create Storage Bucket:** Go to **Storage** and create a new public bucket named `documents`.

### 3. Configure API Keys

The project code currently has Supabase credentials hardcoded. For security and portability, you should replace these with your own keys.

*   In `lib/supabaseClient.ts`, `admin.html`, and `chat-admin.html`, find the `supabaseUrl`, `supabaseAnonKey`, and `supabaseServiceKey` variables and replace the placeholder values with your own from the Supabase dashboard.

### 4. Run the Application

Since this project uses `importmap` for dependencies and does not have a build step, you can serve the HTML files using any simple web server. A common choice is `serve`.

```bash
# Install serve globally if you don't have it
npm install -g serve

# Run the server from the project root
serve .
```
Your application should now be running on a local port (e.g., `http://localhost:3000`). You can access the admin panels at `/admin.html` and `/chat-admin.html`.

## 🗄 Database Schema & RLS

Here is a sample of the schema required for the `profiles` table. You should run this (and the SQL for other tables) in your Supabase SQL Editor.

```sql
-- Profiles table to store user data linked to auth
CREATE TABLE public.profiles (
  id uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  full_name text,
  phone text,
  updated_at timestamptz,
  PRIMARY KEY (id)
);

-- RLS Policy for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile."
ON public.profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile."
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile."
ON public.profiles FOR UPDATE
USING (auth.uid() = id);

-- You will need to create similar tables and RLS policies for:
-- bookings, chat_messages, partner_eoi, etc.
-- And tables for static data:
-- consultation_type, available_dates, time_slots, etc.
```

**Important:** You **must** set up Row Level Security (RLS) policies on your tables to ensure users can only access and modify their own data. The example above shows how to do this for the `profiles` table. Apply similar logic to `bookings`, `chat_messages`, and `partner_eoi`.

## 📁 Project Structure

```
/
├── components/         # Reusable React components (Auth, Modals, Steps, etc.)
├── pages/              # Page-level components (Home, Visa, Appointment, etc.)
├── lib/                # Helper libraries (supabaseClient.ts)
├── App.tsx             # Main app component with routing logic
├── index.tsx           # React entry point
├── types.ts            # TypeScript type definitions
├── README.md           # Project documentation
├── index.html          # Main HTML entry point for the client app
├── admin.html          # HTML for the admin bookings dashboard
└── chat-admin.html     # HTML for the admin chat dashboard
```
