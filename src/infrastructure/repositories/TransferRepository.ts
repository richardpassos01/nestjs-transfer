import { Inject, Injectable } from "@nestjs/common";
import { Knex } from "knex";
import { ITransferRepository } from "../../domain/transfer/repositories/ITransferRepository";
import TransferMapper from "./mappers/TransferMapper";
import Transfer from "../../domain/transfer/Transfer";

@Injectable()
export class TransferRepository implements ITransferRepository {
  constructor(@Inject("KnexConnection") private readonly knex: Knex) {}

  async create(transfer: Transfer): Promise<void> {
    const data = TransferMapper.mapToDatabaseObject(transfer);

    await this.knex("transfers").insert(data);
  }

  async getByExternalId(externalId: string): Promise<Transfer | null> {
    const result = await this.knex("transfers")
      .where({
        external_id: externalId,
      })
      .first();

    return TransferMapper.mapToEntity(result);
  }
}
