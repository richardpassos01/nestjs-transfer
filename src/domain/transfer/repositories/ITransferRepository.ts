import Transfer from "../Transfer";

export interface ITransferRepository {
  create(transfer: Transfer): Promise<void>;
  getByExternalId(externalId: string): Promise<Transfer>;
}

export const ITransferRepository = Symbol("ITransferRepository");
