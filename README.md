This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### Steps to create the Next app

```bash
# Create next app
npx create-next-app@latest

# Install prisma
npm i prisma

# Setup prisma with sqlite
npx prisma init --datasource-provider sqlite

# Migration
npx prisma migrate dev
```
