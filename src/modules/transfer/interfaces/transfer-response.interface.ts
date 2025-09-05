export interface ITransferCreatedResponse {
  transferId: string;
  sourceAccountId: string;
  destinationAccountId: string;
  amount: string;
  createdAt: Date;
}
