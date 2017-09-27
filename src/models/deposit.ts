export interface DepositItem {
    $key?; string;
    name: string;
    amount: number;
    depositDate: Date;
    // depositRevertDate: number;
    isApproved: boolean;
    isReject: boolean;
    isBank: boolean;
    
}