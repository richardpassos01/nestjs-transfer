import { Inject, Injectable } from "@nestjs/common";
import { Knex } from "knex";
import Account from "../../domain/account/Account";
import { IAccountRepository } from "../../domain/account/repositories/IAccountRepository";
import AccountMapper from "./mappers/AccountMapper";

@Injectable()
export class AccountRepository implements IAccountRepository {
  constructor(@Inject("KnexConnection") private readonly knex: Knex) {}

  async getByUserAndAccountId(
    userId: string,
    accountId: string
  ): Promise<Account | null> {
    const result = await this.knex("accounts")
      .where({
        user_id: userId,
        id: accountId,
      })
      .first();

    return AccountMapper.mapToEntity(result);
  }

  async update(account: Account): Promise<void> {
    const data = AccountMapper.mapToDatabaseObject(account);
    
    await this.knex("accounts").update(data).where("id", account.id);
  }
}
