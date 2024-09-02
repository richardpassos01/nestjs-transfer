import Transfer, { TransferDTO } from "../Transfer";

export interface ITransferAdapter {
    create(data: TransferDTO): Promise<Transfer>;
}

export const ITransferAdapter = Symbol("ITransferAdapter");