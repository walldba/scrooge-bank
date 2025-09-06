# scrooge-bank

Scrooge Bank - SFox Code Challenge

### Linkedin: https://www.linkedin.com/in/walldba/

## Index

- [About](#about)
- [Usage](#usage)
- [Technologies](#technologies)
- [Code Challenge Features](#code-challenge-features)
- [Self-Directed User Story](#self-directed-user-story)

## About

This project, named "Scrooge Bank", is a backend application developed as a code challenge. It simulates core banking operations. The application handles user accounts, deposits, withdrawals, loans, and transfers utilizing PostgreSQL's `FOR UPDATE` row-level locking for concurrency control.

## Usage

### To run on development:

1.  **Install Dependencies:** Ensure all Node.js packages are installed.
    ```bash
    npm install
    ```
2.  **Start Docker Services:** Use Docker Compose to build and run the PostgreSQL database and the NestJS application. This command will also set up the necessary databases (`scrooge-bank` and `scrooge-bank-test`).
    ```bash
    docker-compose up --build -d
    ```
3.  **Access API Documentation:** Once the application is running, the API documentation (Swagger UI) will be available at:
    `http://localhost:3000/api/docs`

### To run tests:

1.  **End-to-End (e2e) Integration Tests:** These tests run against a separate test database (`scrooge-bank-test`) managed by Docker Compose.
    ```bash
    npm run test:e2e
    ```

## Technologies

- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)

## Code Challenge Features

General

- ✅ As the bank operator, I should be able to see how much money total we currently have on hand.
- ✅ As the bank operator, user withdrawals are allowed to put the bank into debt, but loans are not.

Accounts

- ✅ As a user, I should be able to open an Account
- ✅ As a user, I should be able to close an Account
- ✅ As a user, I should not be allowed to have more than 1 open account

Deposits

- ✅ As a user, I should be able to make a deposit to my account
- ✅ As a user, If I do not have an account when I deposit, I should see an error
- ✅ As a user, I should not be able to make deposits to other people’s accounts

Withdrawals

- ✅ As a user, I should be able to make a withdrawal from my account
- ✅ As a user, is I do not have enough funds, I should see an error
- ✅ As a user, I should not be able to make withdrawals from other people’s accounts

Loans

- ✅ As a user, I should be able to apply for a loan
- ✅ As a user, my loan should be accepted if the bank has enough money to cover it
- ✅ As a user, when I apply for a loan, it should be rejected if the bank doesn’t have enough money to cover it.
- ✅ As a user, I can make a payment on my loan

## Self-Directed User Story

**User Story:** As a bank user, I want to securely transfer funds from my account to another user's account, with the assurance that my balance and the recipient's balance are updated correctly and consistently, even if multiple transfers are happening simultaneously.

**Why did you decide to pick that story?**
I chose the "Transfer" story because it represents a critical and complex scenario in any banking application where **data integrity and concurrency control are requied**. It allowed me to demonstrate the implementation of PostgreSQL's `FOR UPDATE` row-level locking.

**What is the user value this story delivers?**
The primary user value is **trust and reliability**. Users can be confident that their money is handled accurately and securely.
