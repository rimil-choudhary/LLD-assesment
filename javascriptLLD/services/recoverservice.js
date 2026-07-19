import WalletRepository from "../repositories/collectionrepo.js";
import PayoutRepository from "../repositories/payrepo.js";

import { PayoutStatus } from "../config/status.js";

class RecoveryService {

    constructor() {

        this.walletRepository =
            new WalletRepository();

        this.payoutRepository =
            new PayoutRepository();

    }

    recoverFailedPayout(payoutId) {

        const payout =
            this.payoutRepository.findById(
                payoutId
            );

        if (!payout)
            throw new Error(
                "Payout not found"
            );

        if (

            payout.status !== PayoutStatus.FAILED &&

            payout.status !== PayoutStatus.REJECTED &&

            payout.status !== PayoutStatus.CANCELLED

        ) {

            throw new Error(
                "Payout cannot be recovered"
            );

        }

        const wallet =
            this.walletRepository.findByUserId(
                payout.userId
            );

        wallet.lockedBalance -=
            payout.amount;

        wallet.withdrawableBalance +=
            payout.amount;

        this.walletRepository.update(
            wallet
        );

        payout.status =
            PayoutStatus.RECOVERED;

        this.payoutRepository.update(
            payout
        );

    }

}

export default RecoveryService;