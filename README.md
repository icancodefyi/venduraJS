# Vendura

Vendura is a headless commerce framework for Next.js, designed to help you build modern, composable e-commerce backends with minimal friction.

## What problem does it solve?
Vendura provides a set of modular, type-safe packages for:
- Cart and order management
- Database adapters (MongoDB, in-memory, etc.)
- Payment integrations (Razorpay, more coming)
- Webhook handling
- Next.js API utilities

It removes the need for “magic wiring” and gives you explicit, config-driven control over your commerce backend.

## Packages
- **@vendura/core** – Cart, order, and business logic
- **@vendura/mongodb** – MongoDB adapter for persistence
- **@vendura/razorpay** – Razorpay payment integration
- **@vendura/webhooks** – Webhook utilities and idempotency
- **@vendura/next** – Next.js API helpers and middleware

## Architecture
- Explicit configuration via `vendura.config.ts`
- Each package is workspace-linked and can be used independently
- Designed for composability and future extensibility
- UI-agnostic: you bring your own frontend

## Status
- **v0, experimental**
- Breaking changes likely as the API stabilizes
- Not production-ready yet

## Example App
For a complete working example app, see:
→ https://github.com/icancodefyi/vendura-playground

---

Vendura is open to contributors and feedback. See issues for roadmap and discussion.
