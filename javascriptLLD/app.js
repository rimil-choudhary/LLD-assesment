import User from "./models/user.js";
import Wallet from "./models/collection.js";
import Sale from "./models/revenue.js";

import UserRepository from "./repositories/userrepo.js";
import WalletRepository from "./repositories/collectionrepo.js";
import SaleRepository from "./repositories/salerepo.js";
import PayoutRepository from "./repositories/payrepo.js";

import AdvancePayoutService from "./services/payservice.js";
import ReconciliationService from "./services/consservice.js";
import WithdrawalService from "./services/debitservice.jsjs";
import RecoveryService from "./services/recoverservice.js";

import {
  SaleStatus,
  PayoutStatus
} from "./config/constants.js";

const userRepository = new UserRepository();
const walletRepository = new WalletRepository();
const saleRepository = new SaleRepository();
const payoutRepository = new PayoutRepository();

const advanceService = new AdvancePayoutService();
const reconciliationService = new ReconciliationService();
const withdrawalService = new WithdrawalService();
const recoveryService = new RecoveryService();

console.log("\n=====================================");
console.log(" Affiliate Payout Management System");
console.log("=====================================\n");

console.log("STEP 1 : Create User");

const user = new User(
  1,
  "John Doe",
  "john@gmail.com"
);

userRepository.save(user);

const wallet = new Wallet(user.id);

walletRepository.save(wallet);

console.log(user);
console.log(wallet);

console.log("\n-------------------------------------");

console.log("STEP 2 : Create Sales");

const sale1 = new Sale(
  1,
  user.id,
  "brand_1",
  40
);

const sale2 = new Sale(
  2,
  user.id,
  "brand_1",
  40
);

const sale3 = new Sale(
  3,
  user.id,
  "brand_1",
  40
);

saleRepository.save(sale1);
saleRepository.save(sale2);
saleRepository.save(sale3);

console.table(saleRepository.findAll());

console.log("\n-------------------------------------");

console.log("STEP 3 : Run Advance Payout");

advanceService.processAdvancePayouts();

console.log("Wallet After Advance");

console.log(
  walletRepository.findByUserId(user.id)
);

console.log("\nPayouts");

console.table(
  payoutRepository.findAll()
);

console.log("\n-------------------------------------");

console.log("STEP 4 : Admin Reconciliation");

reconciliationService.reconcileSale(
  1,
  SaleStatus.REJECTED
);

reconciliationService.reconcileSale(
  2,
  SaleStatus.APPROVED
);

reconciliationService.reconcileSale(
  3,
  SaleStatus.APPROVED
);

console.log("Wallet After Reconciliation");

console.log(
  walletRepository.findByUserId(user.id)
);

console.log("\nSales");

console.table(
  saleRepository.findAll()
);

console.log("\nPayouts");

console.table(
  payoutRepository.findAll()
);

console.log("\n-------------------------------------");

console.log("STEP 5 : Withdraw ₹50");

const withdrawal =
  withdrawalService.withdraw(
    user.id,
    50
  );

console.log(withdrawal);

console.log("\nWallet");

console.log(
  walletRepository.findByUserId(user.id)
);

console.log("\n-------------------------------------");

console.log("STEP 6 : Simulate Gateway Failure");

withdrawal.status =
  PayoutStatus.FAILED;

payoutRepository.update(
  withdrawal
);

console.log(
  payoutRepository.findById(
    withdrawal.id
  )
);

console.log("\n-------------------------------------");

console.log("STEP 7 : Recover Failed Payout");

recoveryService.recoverFailedPayout(
  withdrawal.id
);

console.log("\nWallet");

console.log(
  walletRepository.findByUserId(user.id)
);

console.log("\nPayout");

console.log(
  payoutRepository.findById(
    withdrawal.id
  )
);

console.log("\n=====================================");
console.log(" Demo Completed");
console.log("=====================================");