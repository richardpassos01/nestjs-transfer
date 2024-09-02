import { v4 as uuidv4 } from 'uuid';

export class TransferDTO {
  sourceAccountId: string;
  destinationAccountId: string;
  amount: number;
}

export default class Transfer {
  id?: string;
  externalId?: string;
  sourceAccountId: string;
  destinationAccountId: string;
  amount: number;
  transactionDate?: Date;

  constructor(
    sourceAccountId: string,
    destinationAccountId: string,
    amount: number,
    externalId?: string,
    id?: string,
    transactionDate?: Date
  ) {
    this.sourceAccountId = sourceAccountId;
    this.destinationAccountId = destinationAccountId;
    this.amount = amount;
    this.externalId = externalId;
    this.id = id ?? uuidv4();
    this.transactionDate = transactionDate ?? new Date();
  }
}
