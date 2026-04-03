# AGENT.MD — Flint

> This file provides project context for AI coding agents. Read it fully before
> making any changes to the codebase.

---

## Project Identity

| Field | Value |
|---|---|
| **Name** | Flint |
| **Type** | Client-side Web Application |
| **Domain** | Personal Finance Tracking |
| **Purpose** | Collaborative learning project for teaching Git + GitHub workflow |

---

## Project Overview

Flint is a lightweight, **fully client-side** personal finance tracker. Users can log,
categorize, and visualize income and expenses. All data is persisted in `localStorage`
— there is no backend, no database, and no authentication layer.

The project is scoped across **6 phases and 20 features**, sized intentionally to
provide enough surface area for two developers to collaborate using proper Git workflow
(branching, pull requests, code review, merge conflict resolution) without the
complexity of async operations or a live server.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React (via Vite) |
| Styling | CSS Modules |
| State | React Context API |
| Persistence | `localStorage` (synchronous) |
| File Export | Blob API |
| Date Handling | Native JS `Date` |
| Charts | CSS-based bar chart (no library) |
| Package Manager | npm |

> **No external data-fetching libraries. No backend. No auth. Keep it that way.**

---

## Repository Structure

```
flint/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── ui/              # Shared: Button, Input, Modal
│   │   ├── layout/          # Navbar, Sidebar, PageShell
│   │   ├── transactions/    # TransactionForm, TransactionList, TransactionRow
│   │   ├── summary/         # SummaryCard, SummaryStrip
│   │   ├── breakdown/       # CategoryTable, CategoryChart
│   │   └── filters/         # FilterBar, DateRangeFilter
│   ├── context/
│   │   └── TransactionContext.jsx   # Global state + localStorage sync
│   ├── utils/
│   │   ├── storage.js       # localStorage read/write helpers
│   │   ├── calculations.js  # Totals, balance, category grouping
│   │   └── export.js        # CSV generation via Blob API
│   ├── hooks/
│   │   └── useFilters.js    # Filter state logic
│   ├── constants/
│   │   └── categories.js    # Predefined category list
│   ├── App.jsx
│   └── main.jsx
├── AGENT.md
├── README.md
├── package.json
└── vite.config.js
```

---

## Data Model

### Transaction Object

```js
{
  id:          string,   // crypto.randomUUID()
  type:        'income' | 'expense',
  amount:      number,   // always positive
  category:    string,   // from constants/categories.js
  description: string,
  date:        string,   // ISO 8601: 'YYYY-MM-DD'
  createdAt:   string,   // ISO 8601 timestamp, set on creation, never mutated
}
```

### localStorage Keys

| Key | Value |
|---|---|
| `flint_transactions` | `JSON.stringify(Transaction[])` |
| `flint_theme` | `'light' \| 'dark'` |

---

## Feature Inventory
---

### `feature/scaffolding`
> Must be merged to `dev` first. Unblocks all other branches.

| # | Feature | Notes |
|---|---|---|
| 1 | Project scaffolding | Vite + React, folder structure, `main` and `dev` branches |

---

### `feature/base-layout`
> Depends on: `feature/scaffolding`

| # | Feature | Notes |
|---|---|---|
| 2 | Base layout | Navbar + two-panel layout (sidebar + main). No logic yet |
| 3 | Shared component library | `Button`, `Input`, `Modal` — agree on these before all other work |

---

### `feature/data-layer`
> Depends on: `feature/scaffolding`
> Can be developed in parallel with `feature/base-layout`

| # | Feature | Notes |
|---|---|---|
| 4 | Transaction data model | Define shape in `constants/` or `types/` |
| 5 | localStorage persistence | `storage.js` — `save()`, `load()`, `clear()` helpers |
| 6 | Global state (Context) | Holds transaction list; exposes `add`, `delete`, `update`, `getAll` |

---

### `feature/transactions`
> Depends on: `feature/base-layout`, `feature/data-layer`

| # | Feature | Notes |
|---|---|---|
| 7 | Add transaction form | Fields: type, amount, category, description, date. Validate all fields |
| 8 | Transaction list view | Reverse-chron, color-coded amounts (green = income, red = expense) |
| 9 | Delete transaction | Confirm before delete; update state + localStorage |
| 10 | Edit transaction | Click row → pre-fill form → save overwrites original by `id` |

---

### `feature/dashboard-analytics`
> Depends on: `feature/data-layer`, `feature/transaction-list`
> Can be developed in parallel with `feature/transaction-form`

| # | Feature | Notes |
|---|---|---|
| 11 | Summary cards | Total Income, Total Expenses, Net Balance — derived live from state |
| 12 | Category breakdown table | Group expense transactions by category, sum each group |
| 13 | Category bar chart | Visual representation of breakdown; CSS-only, no chart library |

---

### `feature/polish`
> Depends on: `feature/base-layout`, `feature/dashboard-analytics`

| # | Feature | Notes |
|---|---|---|
| 14 | Filter by type | Toggle: All / Income / Expense |
| 15 | Filter by category | Dropdown; options populated from active transaction categories |
| 16 | Filter by date range | Two date inputs (From / To); filters list, cards, and chart together |
| 17 | Empty states | Friendly message when list is empty or a filter returns no results |
| 18 | CSV export | Blob API; exports current filtered list; triggers browser download |
| 19 | Responsive layout | Mobile-friendly via CSS; no JS breakpoint logic needed |
| 20 | Light / Dark mode | Toggle in navbar; CSS class on root; persist preference to localStorage |

---

### Branch Dependency Graph

```
feature/scaffolding
├── feature/base-layout
│   └── feature/transactions
│       └── feature/dashboard-analytics
│           └── feature/polish
└── feature/data-layer
    ├── feature/transactions (shared dep)
    └── feature/dashboard-analytics (shared dep)
```

---

## User Workflow

The following is the intended end-to-end experience from the user's perspective.
When building or modifying features, ensure this flow remains unbroken.

```
1. LAND ON DASHBOARD
   └─ Summary cards hydrate from localStorage on mount
   └─ Transaction list renders existing entries (or empty state)

2. ADD A TRANSACTION
   └─ User opens the Add Transaction form
   └─ Fills: type → amount → category → description → date
   └─ Submits → validated → saved to Context + localStorage
   └─ Summary cards and list update immediately (reactive)

3. REVIEW TRANSACTION LIST
   └─ Entries appear newest-first
   └─ Each row: date | description | category | amount (color-coded)

4. EDIT OR DELETE AN ENTRY
   └─ Click row → edit form opens, pre-filled
   └─ Save → overwrites original by id
   └─ Delete → confirmation prompt → removes from state + localStorage

5. ANALYZE SPENDING BY CATEGORY
   └─ Category breakdown table: totals per expense category
   └─ Bar chart renders proportional bars per category

6. FILTER THE VIEW
   └─ Toggle type filter (All / Income / Expense)
   └─ Select category from dropdown
   └─ Set From / To date range
   └─ All three filters compose — list, cards, and chart respond together

7. EXPORT AS CSV
   └─ Click Export
   └─ Blob API generates CSV from current filtered transaction list
   └─ Browser download triggered — no server involved

8. TOGGLE THEME
   └─ Click theme switch in navbar
   └─ CSS class toggled on root element
   └─ Preference saved to localStorage → persists on next visit
```

---

## Business Logic Rules

These rules are invariants. Do not break them.

- `amount` must always be stored as a **positive number**, regardless of type.
  Net balance is computed as `totalIncome - totalExpenses`, not by using negative amounts.
- Deleting a transaction is **permanent**. No soft-delete, no undo.
- Editing a transaction **preserves the original `createdAt`** timestamp.
- Filters are **composable** — all active filters apply simultaneously via AND logic.
- The CSV export must **respect active filters** — it exports what the user currently sees.
- Summary card values (Income, Expenses, Balance) must **always reflect active filters**.
- `id` is generated with `crypto.randomUUID()` — never use array index as an ID.

---

## Branching Convention

```
main          ← stable, production-ready only
dev           ← integration branch; all PRs merge here first
feature/*     ← individual features (e.g. feature/add-transaction-form)
fix/*         ← bug fixes (e.g. fix/delete-confirmation-not-showing)
```

> PRs must target `dev`, not `main`. `main` is updated only when `dev` is stable.

---

## Coding Conventions

- **Components** — functional only; no class components.
- **Naming** — PascalCase for components, camelCase for utils and hooks.
- **State** — all transaction state lives in `TransactionContext`; no local state for
  shared data.
- **No inline styles** — use CSS Modules exclusively.
- **No async/await** — this project is fully synchronous by design.
- **No external state libraries** — no Redux, Zustand, Jotai, etc.
- **No UI component libraries** — no Shadcn, MUI, Chakra, etc. Build from scratch.

---

## Out of Scope

The following are explicitly **not** part of this project. Do not implement them.

- User authentication or accounts
- Backend API or database
- Async data fetching
- Multi-currency support
- Recurring transactions
- Budget goal setting
- Data import (CSV or otherwise)
- Real-time sync or multi-device support

---

## Agent Guidance

- Before creating any new component, check `src/components/ui/` for an existing
  primitive (`Button`, `Input`, `Modal`) that can be reused.
- All derived values (totals, category groups, filtered lists) must be **computed
  from state at render time** — never stored as separate state.
- When in doubt about feature scope, refer to the Feature Inventory above.
- Do not install new npm packages without a clear reason. The stack is intentionally
  minimal.
- All changes should be committable to a single, well-named feature branch.