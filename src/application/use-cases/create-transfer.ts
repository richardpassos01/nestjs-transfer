import { Inject, Injectable } from "@nestjs/common";
import { ITransferAdapter } from "../../domain/transfer/adapters/ITransferAdapter";
import { IAccountRepository } from "../../domain/account/repositories/IAccountRepository";
import { AccountNotFoundException } from "../../domain/account/errors/AccountNotFoundException";
import { AccountWithoutBalanceException } from "../../domain/account/errors/AccountWithoutBalanceException";
import { ITransferRepository } from "../../domain/transfer/repositories/ITransferRepository";

@Injectable()
export class CreateTransfer {
  constructor(
    @Inject(ITransferAdapter)
    private readonly transferAdapter: ITransferAdapter,
    @Inject(IAccountRepository)
    private readonly accountRepository: IAccountRepository,
    @Inject(ITransferRepository)
    private readonly transferRepository: ITransferRepository
  ) {}

  async execute(
    userId: string,
    sourceAccountId: string,
    destinationAccountId: string,
    amount: number
  ): Promise<{ transferId: string }> {
    try {
      const account = await this.accountRepository.getByUserAndAccountId(
        userId,
        sourceAccountId
      );

      if (!account) {
        throw new AccountNotFoundException();
      }

      if (!account.isAccountEligibleForTransfer(amount)) {
        throw new AccountWithoutBalanceException();
      }

      const data = {
        sourceAccountId,
        destinationAccountId,
        amount,
      };

      const transfer = await this.transferAdapter.create(data);

      account.decreaseBalance(amount);

      await Promise.all([
        this.accountRepository.update(account),
        this.transferRepository.create(transfer),
      ]);

      return { transferId: transfer.externalId };
    } catch (error) {
      // logger.error
      throw error;
    }
  }
}
