# JavaScript LLD

A collection of **Low-Level Design (LLD)** projects built using **JavaScript**.

This repository contains real-world LLD implementations using clean architecture and design patterns. Each project is designed to improve system design and object-oriented programming skills.

---

# Project

## JavascriptLLD 

This project is a Low-Level Design implementation of an **JavascriptLLD**.

It manages affiliate sales, advance payouts, final settlements, withdrawals, and failed payment recovery using a clean and scalable architecture.

---

# Features

- 10% advance payout for pending sales
- Process advance payout only once
- Approve or reject sales
- Final payout calculation
- Wallet management
- One withdrawal allowed every 24 hours
- Failed payout recovery
- Wallet transaction history
- Repository Pattern
- Service Layer Architecture
- Dependency Injection
- In-Memory Database

---

# Business Rules

## Advance Payout

- Every pending sale receives a **10% advance payout**.
- Advance payout is processed only once.

**Example**

```text
Sale Earning = ₹40
Advance Payout = ₹4
```

---

## Sale Reconciliation

### Approved Sale

The remaining amount is paid after deducting the advance.

```text
Earning = ₹40
Advance Paid = ₹4
Final Payout = ₹36
```

### Rejected Sale

If the sale is rejected, the advance amount is deducted.

```text
Advance Paid = ₹4
Wallet Adjustment = -₹4
```

---

## Withdrawal

- Users can withdraw money only once every **24 hours**.

Money Flow

```text
Withdrawable Balance
        ↓
Locked Balance
        ↓
Payment Gateway
```

---

## Failed Payment Recovery

If the payment fails, the money is returned to the wallet.

```text
Locked Balance
      ↓
Withdrawable Balance
```

---

# APIs

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/sales` | Create Sale |
| POST | `/advance-payout/process` | Process Advance Payout |
| PATCH | `/sales/{saleId}/reconcile` | Approve or Reject Sale |
| POST | `/withdraw` | Withdraw Money |
| POST | `/payouts/{payoutId}/recover` | Recover Failed Payout |

---

# Design Patterns Used

### Repository Pattern

- userrepo
- collectionrepo
- salerepo

### Service Layer

Contains all business logic.

### Singleton

Used for the In-Memory Database.

### Dependency Injection

Services receive repositories through dependency injection.

### Layered Architecture

```text
Controller
     ↓
Service
     ↓
Repository
     ↓
In-Memory Database
```

---

# Trade-offs

## In-Memory Database

### Advantages

- Easy to understand
- No setup required
- Good for learning

### Limitations

- Data is lost after restart
- Not suitable for production

---

## Payment Gateway

A mock payment gateway is used for demonstration.

Production systems can integrate:

- Razorpay
- Cashfree
- Stripe

---

## Database Transactions

Transactions are not implemented.

In production, the following operations should be executed inside a single transaction:

- Wallet Update
- Payout Creation
- Sale Update

---

## Wallet Ledger

Every wallet transaction should create a ledger entry.

Benefits:

- Auditing
- Debugging
- Transaction Tracking

---

# Future Improvements

- JWT Authentication
- Express REST APIs
- Database Transactions
- Redis Cache
- Kafka / RabbitMQ
- Cron Jobs
- Docker Support
- UUID Generator
- Unit Testing

---

# How to Run

```bash
npm install
npm start
```

or

```bash
node app.js
```

---

# Project Flow

```text
Create User
      ↓
Create Wallet
      ↓
Create Sales
      ↓
Process Advance Payout
      ↓
Approve / Reject Sale
      ↓
Withdraw Money
      ↓
Gateway Failure
      ↓
Recover Failed Payment
```

---

# System Architecture

```text
+-------------+
| Controller  |
+-------------+
       |
       ↓
+-------------+
|  Service    |
+-------------+
       |
       ↓
+-------------+
| Repository  |
+-------------+
       |
       ↓
+-------------------+
| In-Memory Database|
+-------------------+
       |
       ↓
+-------------+
|   Models    |
+-------------+
```

---

# ER Diagram

```text
user
 │
 ├── collection
 │      └── collectionledger
 │
 ├── sale
 │      └── pay
```

---

# Demo Flow

1. Create User
2. Create Wallet
3. Create Sales
4. Process Advance Payout
5. Approve or Reject Sales
6. Withdraw Money
7. Simulate Gateway Failure
8. Recover Failed Payment
9. View Updated Wallet and Payout Details

---

# Technologies Used

- JavaScript (ES6+)
- Node.js
- Object-Oriented Programming (OOP)
- Repository Pattern
- Service Layer Architecture
- Dependency Injection
- In-Memory Database

---

