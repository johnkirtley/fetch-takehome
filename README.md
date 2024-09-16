# Project Deployment Guide

## Setup Instructions

### Step 1: Set up Environment Variables

You need to configure the following environment variables. These should be added to a `.env.local` file in the root directory of your project:

```bash
# Example environment variables
NEXT_PUBLIC_BASE_URL=base-url-provided-in-take-home-assignment
```

### Step 2: Install Dependencies and Build Project

Run the following command to install the project dependencies and build the project:

```bash
npm install
npm run build
npm run start
```

Technologies used:

- Next.js
- Tailwind CSS
- Typescript
- Shadcn
- Vercel

Requirements:

- [x] Users must be able to filter by breed
- [x] Results should be paginated
- [x] Results should be sorted alphabetically by breed by default. Users should be able to modify this sort to be ascending or descending.
- [x] Generate dog matches based on user-selected favorites
- [x] All fields of the Dog object (except for id) must be presented in some form

Future improvements:

- [ ] Integrate a Postgres database solution like Supabase
- [ ] Create an account page to manage user preferences like breed types, etc.
- [ ] Add loading states throughout the app
- [ ] Filter by age
