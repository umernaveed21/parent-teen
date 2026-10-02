# ParentAndTeen.com.pk

The publishing platform behind
[parentandteen.com.pk](https://parentandteen.com.pk), a South Asian
parenting and child rights publication.

It is a Next.js site backed by Contentful, with a custom dashboard
where contributors write and submit articles and editors review and
publish them. I built and maintain it as part of the founding team.

**Stack:** Next.js (App Router), React, Tiptap, Contentful, Clerk,
Vercel

## How an article gets published

**1. Writer signs in.** Authentication is handled by Clerk.
Middleware protects `/dashboard` and the `/api/posts` routes. Each
user carries a role, writer or admin, in Clerk's public metadata,
and role checks happen server side wherever they matter.

**2. Writer drafts in the dashboard.** The editor is Tiptap, wrapped
in a custom React component and styled to match the site's typography
so what writers see is close to what readers get. Tiptap holds the
document in its own JSON structure while editing.

**3. Saving converts and stores.** Hitting Save Draft posts the
article to `/api/posts`, which uploads the cover image as a
Contentful asset, converts Tiptap's JSON into Contentful's Rich Text
format, and creates the entry with its category and author
references. The two systems represent the same concepts differently,
so this goes through a converter I wrote that runs in both
directions, out to Contentful on save and back into Tiptap when an
article is reopened for editing.

**4. Editor reviews and publishes.** `/dashboard/admin` is gated to
admins and lists every article regardless of status. From there an
editor can preview a draft as it will appear live, edit it in the
same Tiptap editor, publish it, or unpublish something already live.
Publishing flips the entry's status through Contentful's Management
API.

**5. The public site serves it.** Public pages read published content
only, through Contentful's read-only Content Delivery API. The write
side of the dashboard is the only place the Management API is used,
so the public site has no path to modify content even if something
goes wrong. Pages use incremental static regeneration with a 60
second window, so a newly published article appears within about a
minute and no redeploy is needed. The app is hosted on Vercel, where
a push to `main` triggers a rebuild.

## Problems worth writing down

### Middleware was running everywhere, and public pages stopped caching

The original middleware matcher was broad, roughly everything except
static files and Next internals. That meant Clerk's middleware ran on
pages that have nothing to do with auth: the homepage, article pages,
category pages. Running middleware on those routes pulled them out of
static delivery and made every request dynamic, which cost
performance and showed up as an indexing problem in Search Console.

The fix was narrowing the matcher so middleware only ran on
`/dashboard(.*)`, leaving public pages static and cacheable again.

### Which then broke saving drafts

Nothing looked wrong until Save Draft started failing with
`Unexpected end of JSON input`. The `/api/posts` routes call Clerk's
`currentUser()`, which needs the middleware active on their path.
Excluding everything outside `/dashboard` had quietly stripped Clerk
context from the API routes, so they crashed partway through and
returned an empty body, which is where the JSON parse error came
from.

Widening the matcher to cover `/dashboard(.*)` and `/api/posts(.*)`
fixed it. Public pages stayed static, the API routes got their auth
context back.

The useful lesson was that the error message pointed at JSON parsing,
which had nothing to do with the actual cause.

### Dynamic routes were ignoring revalidate

`blog/[slug]` and `categories/[slug]` had `revalidate = 60` set but
were still server rendering on every request. Without
`generateStaticParams`, Next.js has no list of paths to generate at
build time, so the routes fell through to full dynamic rendering and
the revalidate setting never applied. Adding it put both route groups
back on ISR.

## Running locally

```bash
npm install
npm run dev
```

Requires a `.env.local` with Contentful space and environment IDs, a
Content Delivery API token, a Content Management API token, and Clerk
publishable and secret keys. No credentials are committed to this
repository.

## Status

Live and maintained. Content and editorial material live in
Contentful, not in this repository.
