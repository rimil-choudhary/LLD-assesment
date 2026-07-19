import WithdrawalService from "../services/debitservice.js";
class WithdrawalController{
    constructor(){
        this.withdrawService =
            new WithdrawalService();
    }
    withdraw(userId,amount){
        const payout =
            this.withdrawService.withdraw(
                userId,
                amount
            );
        return{
            success:true,
            payout
        };
    }
}
export default WithdrawalController;
