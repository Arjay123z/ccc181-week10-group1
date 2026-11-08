# CCC181 Week 10: CampusConnect Mobile-First Login Page

React + TypeScript starter for the Week 10 group activity. The page is already
built. Your group's job is the **mobile-first CSS** and the **GitHub teamwork**.

## Run it

```bash
npm install
npm run dev          # open the local URL it prints
npm run dev:phone    # same, but your phone (same Wi-Fi) can open the Network URL
npm run build        # must finish with no errors before you submit
```

## Rules

- Edit only the CSS files in `src/styles/` (one member = one file). Do not edit `reset.css`.
- Plain CSS only. No Tailwind, Bootstrap, Material UI, styled-components, or any UI library.
- Phone styles first (no media query), then `min-width` queries only. Never `max-width`.
- Do not edit the `.tsx` files or rename classes. If you must, tell the group first.

## Group information (fill in)

| Item | Your answer |
| --- | --- |
| Group number | 1 |
| Section | IT3-A |
| Repository URL | https://github.com/Arjay123z/ccc181-week10-group1 |

## Members (each member fills in their own row in their own commit)

| Member | Name | GitHub username | CSS file | What I did |
| --- | --- | --- | --- | --- |
| 1 (leader) | Roldan James Calisagan| Arjay123z | `base.css` | Added viewport meta tag and mobile-first layout with responsive grid, brand panel, and breakpoints at 768px, 1024px, and 1280px. |
| 2 |Dan Jefferson B. Acera | djacera | `nav.css` |  I built the mobile-first navbar (Flexbox) and footer (Grid) in nav.css, with a row navbar at 768px and a three-column footer at 1024px. |
| 3 |Dave Rolence Brian O. Benson |DaveB530| `form.css` | I worked on the Login Form styling using CSS. |

## Experiment 0: the page without the viewport tag

What did the page look like in DevTools phone mode **before** adding the viewport meta tag?
What changed **after** adding it?

> Before adding the viewport meta tag, the page in DevTools phone mode (iPhone SE) looked zoomed out and tiny, as if a desktop-sized page had been shrunk to fit the phone screen. After adding `<meta name="viewport" content="width=device-width, initial-scale=1" />`, the page used the real phone width, so the text was normal size and the layout fit the screen.

## DevTools test results

| Width | What must be true | Pass? |
| --- | --- | --- |
| 360 px | 1 column. Nav links stacked and 48px tall. Options and buttons stacked. Footer in 1 column. No sideways scrollbar. | Pass |
| 768 px | Nav in one row (brand left, links right). Checkbox and link in one row. Two buttons side by side. | Pass |
| 1024 px | Brand panel and login card side by side. Footer in 3 columns. Heading is larger. | Pass |
| 1280 px | Content centered and stops at 1200px. | Pass |

### Breakpoints I observed

Using **Show media queries** and dragging slowly from 360 px to 1280 px, the layout changed at these exact widths:

| Width | What must be true | Pass? |
| --- | --- | --- |
| 360 px | 1 column. Nav links stacked and 48px tall. Options and buttons stacked. Footer in 1 column. No sideways scrollbar. | ✅ Yes |
| 768 px | Nav in one row (brand left, links right). Checkbox and link in one row. Two buttons side by side. | ✅ Yes |
| 1024 px | Brand panel and login card side by side. Footer in 3 columns. Heading is larger. | ✅ Yes |
| 1280 px | Content centered and stops at 1200px. | ✅ Yes |

Screenshots are in `screenshots/` as `360.png`, `768.png`, `1024.png`, `1280.png`.

## What our group learned (leader writes this last)

We learned that mobile-first means designing the phone layout first and then adding to it with `min-width` media queries at 768, 1024 and 1280 px, instead of undoing desktop styles with `max-width`. The viewport meta tag is what makes the phone styles work: without it, the phone showed a tiny zoomed-out page.

We practiced using CSS Grid for the page and footer layout and Flexbox for the navigation and the login form, and we learned to use rem and % for sizing. We also learned to make every tap target at least 48 px tall and to give every `:hover` style a matching `:focus-visible` style, so the page works for touch and keyboard users.

For teamwork, we learned how to use Git branches, commits and pull requests, and that a reviewer must approve before merging. We ran into problems such as pushing from the wrong folder, a merged pull request that was reverted, and rejected pushes. We fixed them by checking `git log`, restoring the work on a new branch and pulling the latest `main` before continuing.

# Part 2: Backend login (Weeks 12-13)

### How to run

**Terminal 1: the backend**
```
cd server
npm install
copy .env.example .env
npm start
```
Edit the values in `server/.env` if you want. The API runs at http://localhost:3000 and prints "API running on http://localhost:3000".

**Demo account:** `student@campusconnect.test` / `Campus26` (name: Demo Student)

**Settings files:** `server/.env.example` holds fake values for `PORT`, `JWT_SECRET` and `CLIENT_ORIGIN`. The real `.env` files are never committed.

### API summary

| Method | Endpoint | Purpose | Success | Errors |
| --- | --- | --- | --- | --- |
| GET | /api/v1/health | Checks that the API is running | 200 | |
| POST | /api/v1/sessions | Logs in | 200 | 400, 401 |
| GET | /api/v1/users/me | Returns the logged-in user (needs a token) | 200 | 401 |

### Who did what (Part 2)

| Member | Name | GitHub username | What I did in Part 2 |
| --- | --- | --- | --- |
| 1 (leader) | Roldan James Calisagan | Arjay123z | Set up the Express backend (CORS, dotenv), the demo users with bcrypt-hashed passwords, and `POST /api/v1/sessions` with validation, 401 handling and a JWT token. |
| 2 | Dan Jefferson B. Acera | djacera | |
| 3 | Dave Rolence Brian O. Benson | DaveB530 | |