import Account from "../Account";

export interface IAccountRepository {
  getByUserAndAccountId(userId: string, accountId: string): Promise<Account | null>;
  update(account: Account): Promise<void>;
}

export const IAccountRepository = Symbol("IAccountRepository");
