import RecoveryService from "../services/recoverservice.js";
class PayoutController{
    constructor(){
        this.recoveryService =
            new RecoveryService();
    }
    recoverPayout(payoutId){
        this.recoveryService
            .recoverFailedPayout(
                payoutId
            );
        return{
            success:true,
            message:"Recovery completed"
        };
    }
}
export default PayoutController;
