import Account from "../../../domain/account/Account";

type MapToEntityInput = {
  id: string;
  user_id: string;
  balance: number;
};

export default class AccountMapper {
  static mapToDatabaseObject(entity: Account): MapToEntityInput {
    return {
      id: entity.id,
      user_id: entity.userId,
      balance: entity.balance,
    };
  }

  static mapToEntity(object: MapToEntityInput): Account {
    if (!object) return null;

    return new Account(object.id, object.balance, object.user_id);
  }
}
