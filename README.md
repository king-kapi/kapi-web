This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Setup MongoDB

Please check the [MongoDB installation documentation](https://www.mongodb.com/docs/manual/installation/) to install MongoDB on your own local machine for testing


## Exporting and Importing MongoDB

Make sure MongoDB CLI tools are installed. Run `npm run dump` to export datastore, and run `npm run restore` to import. The git repo already contains mock data from Samuel's computer, so for most people, just run the restore script.


## Getting Started

Make sure your MongoDB server is running

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Development Notes

## Authentication

Authentication is handled with the `next-auth` library. You will need to set the `GOOGLE_ID` and `GOOGLE_SECRET` environment variables, and create your own secret with `openssl rand -base64 32` and put into `NEXTAUTH_SECRET`.

### Protecting Page Route

Page routes are protected *server side*, which means we utilize the `getServerSideProps` to check if the user is logged in and redirect accordingly.

Insert this code to protect a page (example: see `index.tsx`):

```tsx
import protectedGetServerSideProps from '@/src/utils/protectRoute';

export const getServerSideProps = protectedGetServerSideProps;

// ... your page
```

### Protecting API Route

API routes are protected with a function that will not only fetch the session, but will return the correct 401 error response with message.

Insert this code at the beginning of your handler function (example: see `api/users.tsx`):

```typescript
const session = await protectApiRoute(req, res);
if (!session) return;

// ... your handler
```