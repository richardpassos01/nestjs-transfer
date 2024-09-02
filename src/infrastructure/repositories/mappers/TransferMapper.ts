import { formatDateToString } from "../../../utils/helpers";
import Transfer from "../../../domain/transfer/Transfer";

type MapToEntityInput = {
  id: string;
  external_id: string;
  source_account_id: string;
  destination_account_id: string;
  amount: number;
  transaction_date: string;
};

export default class TransferMapper {
  static mapToDatabaseObject(entity: Transfer): MapToEntityInput {
    return {
      id: entity.id,
      external_id: entity.externalId,
      source_account_id: entity.sourceAccountId,
      destination_account_id: entity.destinationAccountId,
      amount: entity.amount,
      transaction_date: formatDateToString(entity.transactionDate),
    };
  }

  static mapToEntity(object: MapToEntityInput): Transfer {
    if (!object) return null;

    return new Transfer(
      object.source_account_id,
      object.destination_account_id,
      object.amount,
      object.external_id,
      object.id,
      new Date(object.transaction_date),
    );
  }
}
