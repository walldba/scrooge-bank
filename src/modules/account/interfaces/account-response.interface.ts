import { AccountStatusEnum } from '../enums/account-status.enum';

export interface IAccountListResponse {
  accountId: string;
  accountNumber: string;
  createdAt: Date;
  balance: string;
  status: AccountStatusEnum;
  userMail: string;
}
