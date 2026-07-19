# Affiliate Payout Management System

## Overview

This project is a Low-Level Design (LLD) implementation of an Affiliate Payout Management System.

The system manages affiliate sales, advance payouts, final reconciliation, withdrawals, and payout recovery while following clean architecture principles.

---

# Features

- Advance payout (10% of pending sales)
- Idempotent advance payout processing
- Sale reconciliation
- Approved sale settlement
- Rejected sale adjustment
- Wallet management
- Withdrawal restriction (one withdrawal every 24 hours)
- Failed payout recovery
- Wallet ledger (audit trail)
- Repository Pattern
- Service Layer Architecture
- Dependency Injection
- In-Memory Database

---

# Project Structure

```
affiliate-payout-system/
│
├── config/
│   └── constants.js
│
├── controllers/
│   ├── SaleController.js
│   ├── WithdrawalController.js
│   └── PayoutController.js
│
├── database/
│   └── InMemoryDatabase.js
│
├── models/
│   ├── User.js
│   ├── Wallet.js
│   ├── Sale.js
│   ├── Payout.js
│   └── WalletLedger.js
│
├── repositories/
│   ├── Userrepo.js
│   ├── WalletRepository.js
│   ├── SaleRepository.js
│   ├── PayoutRepository.js
│   └── WalletLedgerRepository.js
│
├── services/
│   ├── WalletService.js
│   ├── AdvancePayoutService.js
│   ├── ReconciliationService.js
│   ├── WithdrawalService.js
│   └── RecoveryService.js
│
├── app.js
│
└── package.json
```

---

# Business Rules

## Advance Payout

Every pending sale receives 10% advance payout.

Advance payout is processed only once.

---

## Sale Reconciliation

### Approved Sale

Final Payout =

Earning − Advance Paid

Example

```
Earning = 40

Advance = 4

Final = 36
```

---

### Rejected Sale

Advance already paid should be adjusted.

```
Advance = 4

Adjustment = -4
```

---

## Withdrawal

A user can withdraw only once every 24 hours.

Money moves from

Withdrawable Balance

↓

Locked Balance

↓

Payment Gateway

---

## Failed Recovery

If gateway returns

- Failed
- Cancelled
- Rejected

Money is moved back

Locked

↓

Withdrawable

---

# APIs

## Create Sale

POST /sales

---

## Process Advance

POST /advance-payout/process

---

## Reconcile Sale

PATCH /sales/{saleId}/reconcile

---

## Withdraw

POST /withdraw

---

## Recover Failed Payout

POST /payouts/{payoutId}/recover

---

# Design Patterns Used

Repository Pattern

- UserRepository
- WalletRepository
- SaleRepository

Service Layer

- Business logic

Singleton

- InMemoryDatabase

Dependency Injection

- Services depend on repositories

Layered Architecture

Controller

↓

Service

↓

Repository

↓

Database

---

# Trade-offs

## In-Memory Database

Pros

- Easy to understand
- No setup required

Cons

- No persistence
- Data lost after restart

---

## No Payment Gateway

For simplicity, gateway responses are simulated.

Production systems should integrate

- Razorpay
- Cashfree
- Stripe

---

## Transactions

Current implementation does not support database transactions.

Production systems should wrap

- Wallet update
- Payout creation
- Sale update

inside a single transaction.

---

## Wallet Ledger

Every wallet balance change should create a ledger entry.

This enables

- Auditing
- Reconciliation
- Debugging

---

# Future Improvements

- JWT Authentication
- Scheduler (Cron Job)
- Kafka / RabbitMQ Events
- Redis Cache
- UUID Generator
- Optimistic Locking
- Database Transactions
- REST API using Express
- Unit Tests
- Docker Support

---

# How to Run

```
npm install

npm start
```

or

```
node app.js
```

---

# Sample Flow

Create User

↓

Create Wallet

↓

Create Pending Sales

↓

Advance Payout

↓

Admin Reconciliation

↓

Withdrawal

↓

Gateway Failure

↓

Recovery

                    +----------------------+
                    |      Controller      |
                    +----------------------+
                              |
                              ▼
                    +----------------------+
                    |       Service        |
                    +----------------------+
                              |
                              ▼
                    +----------------------+
                    |     Repository       |
                    +----------------------+
                              |
                              ▼
                    +----------------------+
                    |  InMemory Database   |
                    +----------------------+
                              |
                              ▼
                    +----------------------+
                    |        Models        |
                    +----------------------+





---

# 2. ER Diagram

A simple text-based ER diagram is sufficient for an LLD submission.

```text
                         +------------------+
                         |      USER        |
                         +------------------+
                         | userId (PK)      |
                         | name             |
                         | email            |
                         +------------------+
                                  |
                                  | 1
                                  |
                                  | 1
                                  ▼
                         +------------------+
                         |     WALLET       |
                         +------------------+
                         | userId (PK/FK)   |
                         | withdrawable     |
                         | lockedBalance    |
                         | lastWithdrawalAt |
                         +------------------+
                                  |
                                  | 1
                                  |
                                  | N
                                  ▼
                     +------------------------+
                     |    WALLET_LEDGER       |
                     +------------------------+
                     | ledgerId (PK)          |
                     | userId (FK)            |
                     | saleId (FK)            |
                     | payoutId (FK)          |
                     | type                   |
                     | amount                 |
                     | createdAt              |
                     +------------------------+

+------------------+
|      SALE        |
+------------------+
| saleId (PK)      |
| userId (FK)      |
| brand            |
| earning          |
| status           |
| advancePaid      |
| advanceAmount    |
+------------------+
          |
          | 1
          |
          | N
          ▼
+----------------------+
|       PAYOUT         |
+----------------------+
| payoutId (PK)        |
| userId (FK)          |
| saleId (FK)          |
| amount               |
| type                 |
| status               |
| createdAt            |
+----------------------+

OUTPUT

=====================================
 Affiliate Payout Management System
=====================================

STEP 1 : Create User
User {
  id: 1,
  name: 'John Doe',
  email: 'john@gmail.com',
  createdAt: 2026-07-19T08:55:41.951Z,
  updatedAt: 2026-07-19T08:55:41.951Z
}
Wallet {
  userId: 1,
  withdrawableBalance: 0,
  lockedBalance: 0,
  lastWithdrawalAt: null,
  createdAt: 2026-07-19T08:55:41.951Z,
  updatedAt: 2026-07-19T08:55:41.951Z
}

-------------------------------------
STEP 2 : Create Sales
┌─────────┬────┬────────┬───────────┬─────────┬───────────┬─────────────┬───────────────────┬──────────────────────────┬──────────────────────────┐
│ (index) │ id │ userId │ brandId   │ earning │ status    │ advancePaid │ advancePaidAmount │ createdAt                │ updatedAt                │
├─────────┼────┼────────┼───────────┼─────────┼───────────┼─────────────┼───────────────────┼──────────────────────────┼──────────────────────────┤
│ 0       │ 1  │ 1      │ 'brand_1' │ 40      │ 'PENDING' │ false       │ 0                 │ 2026-07-19T08:55:41.953Z │ 2026-07-19T08:55:41.953Z │
│ 1       │ 2  │ 1      │ 'brand_1' │ 40      │ 'PENDING' │ false       │ 0                 │ 2026-07-19T08:55:41.953Z │ 2026-07-19T08:55:41.953Z │
│ 2       │ 3  │ 1      │ 'brand_1' │ 40      │ 'PENDING' │ false       │ 0                 │ 2026-07-19T08:55:41.953Z │ 2026-07-19T08:55:41.953Z │
└─────────┴────┴────────┴───────────┴─────────┴───────────┴─────────────┴───────────────────┴──────────────────────────┴──────────────────────────┘

-------------------------------------
STEP 3 : Run Advance Payout
Wallet After Advance
Wallet {
  userId: 1,
  withdrawableBalance: 12,
  lockedBalance: 0,
  lastWithdrawalAt: null,
  createdAt: 2026-07-19T08:55:41.951Z,
  updatedAt: 2026-07-19T08:55:41.951Z
}

Payouts
┌─────────┬───────────────┬────────┬────────┬────────┬───────────┬───────────┬───────────────┬──────────────────────────┬──────────────────────────┐
│ (index) │ id            │ userId │ saleId │ amount │ type      │ status    │ failureReason │ createdAt                │ updatedAt                │
├─────────┼───────────────┼────────┼────────┼────────┼───────────┼───────────┼───────────────┼──────────────────────────┼──────────────────────────┤
│ 0       │ 1784451341956 │ 1      │ 1      │ 4      │ 'ADVANCE' │ 'SUCCESS' │ null          │ 2026-07-19T08:55:41.957Z │ 2026-07-19T08:55:41.957Z │
│ 1       │ 1784451341957 │ 1      │ 3      │ 4      │ 'ADVANCE' │ 'SUCCESS' │ null          │ 2026-07-19T08:55:41.957Z │ 2026-07-19T08:55:41.957Z │
└─────────┴───────────────┴────────┴────────┴────────┴───────────┴───────────┴───────────────┴──────────────────────────┴──────────────────────────┘

-------------------------------------
STEP 4 : Admin Reconciliation
Wallet After Reconciliation
Wallet {
  userId: 1,
  withdrawableBalance: 80,
  lockedBalance: 0,
  lastWithdrawalAt: null,
  createdAt: 2026-07-19T08:55:41.951Z,
  updatedAt: 2026-07-19T08:55:41.951Z
}

Sales
┌─────────┬────┬────────┬───────────┬─────────┬────────────┬─────────────┬───────────────────┬──────────────────────────┬──────────────────────────┐
│ (index) │ id │ userId │ brandId   │ earning │ status     │ advancePaid │ advancePaidAmount │ createdAt                │ updatedAt                │
├─────────┼────┼────────┼───────────┼─────────┼────────────┼─────────────┼───────────────────┼──────────────────────────┼──────────────────────────┤
│ 0       │ 1  │ 1      │ 'brand_1' │ 40      │ 'REJECTED' │ true        │ 4                 │ 2026-07-19T08:55:41.953Z │ 2026-07-19T08:55:41.960Z │
│ 1       │ 2  │ 1      │ 'brand_1' │ 40      │ 'APPROVED' │ true        │ 4                 │ 2026-07-19T08:55:41.953Z │ 2026-07-19T08:55:41.960Z │
│ 2       │ 3  │ 1      │ 'brand_1' │ 40      │ 'APPROVED' │ true        │ 4                 │ 2026-07-19T08:55:41.953Z │ 2026-07-19T08:55:41.960Z │
└─────────┴────┴────────┴───────────┴─────────┴────────────┴─────────────┴───────────────────┴──────────────────────────┴──────────────────────────┘

Payouts
┌─────────┬───────────────┬────────┬────────┬────────┬───────────┬───────────┬───────────────┬──────────────────────────┬──────────────────────────┐
│ (index) │ id            │ userId │ saleId │ amount │ type      │ status    │ failureReason │ createdAt                │ updatedAt                │
├─────────┼───────────────┼────────┼────────┼────────┼───────────┼───────────┼───────────────┼──────────────────────────┼──────────────────────────┤
│ 0       │ 1784451341956 │ 1      │ 1      │ 4      │ 'ADVANCE' │ 'SUCCESS' │ null          │ 2026-07-19T08:55:41.957Z │ 2026-07-19T08:55:41.957Z │
│ 1       │ 1784451341957 │ 1      │ 3      │ 4      │ 'ADVANCE' │ 'SUCCESS' │ null          │ 2026-07-19T08:55:41.957Z │ 2026-07-19T08:55:41.957Z │
│ 2       │ 1784451341960 │ 1      │ 3      │ 36     │ 'FINAL'   │ 'SUCCESS' │ null          │ 2026-07-19T08:55:41.960Z │ 2026-07-19T08:55:41.960Z │
└─────────┴───────────────┴────────┴────────┴────────┴───────────┴───────────┴───────────────┴──────────────────────────┴──────────────────────────┘

-------------------------------------
STEP 5 : Withdraw ₹50
Payout {
  id: 1784451341964,
  userId: 1,
  saleId: null,
  amount: 50,
  type: 'WITHDRAWAL',
  status: 'PENDING',
  failureReason: null,
  createdAt: 2026-07-19T08:55:41.964Z,
  updatedAt: 2026-07-19T08:55:41.964Z
}

Wallet
Wallet {
  userId: 1,
  withdrawableBalance: 30,
  lockedBalance: 50,
  lastWithdrawalAt: 2026-07-19T08:55:41.964Z,
  createdAt: 2026-07-19T08:55:41.951Z,
  updatedAt: 2026-07-19T08:55:41.951Z
}

-------------------------------------
STEP 6 : Simulate Gateway Failure
Payout {
  id: 1784451341964,
  userId: 1,
  saleId: null,
  amount: 50,
  type: 'WITHDRAWAL',
  status: 'FAILED',
  failureReason: null,
  createdAt: 2026-07-19T08:55:41.964Z,
  updatedAt: 2026-07-19T08:55:41.965Z
}

-------------------------------------
STEP 7 : Recover Failed Payout

Wallet
Wallet {
  userId: 1,
  withdrawableBalance: 80,
  lockedBalance: 0,
  lastWithdrawalAt: 2026-07-19T08:55:41.964Z,
  createdAt: 2026-07-19T08:55:41.951Z,
  updatedAt: 2026-07-19T08:55:41.951Z
}

Payout
Payout {
  id: 1784451341964,
  userId: 1,
  saleId: null,
  amount: 50,
  type: 'WITHDRAWAL',
  status: undefined,
  failureReason: null,
  createdAt: 2026-07-19T08:55:41.964Z,
  updatedAt: 2026-07-19T08:55:41.966Z
}

=====================================
 Demo Completed
=====================================
