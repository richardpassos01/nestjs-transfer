import { Test, TestingModule } from "@nestjs/testing";
import { CreateTransfer } from "../../../../src/application/use-cases/create-transfer";
import { ITransferAdapter } from "../../../../src/domain/transfer/adapters/ITransferAdapter";
import { IAccountRepository } from "../../../../src/domain/account/repositories/IAccountRepository";
import { ITransferRepository } from "../../../../src/domain/transfer/repositories/ITransferRepository";
import Account from "../../../../src/domain/account/Account";
import { AccountNotFoundException } from "../../../../src/domain/account/errors/AccountNotFoundException";
import { AccountWithoutBalanceException } from "../../../../src/domain/account/errors/AccountWithoutBalanceException";
import Transfer from "../../../../src/domain/transfer/Transfer";
import { CustomError } from "../../../../src/domain/shared/errors/CustomError";

describe("CreateTransfer", () => {
  let createTransfer: CreateTransfer;
  let transferAdapter: jest.Mocked<ITransferAdapter>;
  let accountRepository: jest.Mocked<IAccountRepository>;
  let transferRepository: jest.Mocked<ITransferRepository>;
  let account: Account;
  let transfer: Transfer;
  const accountId = "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d";
  const userId = "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed";

  beforeEach(async () => {
    account = new Account(accountId, 100, userId);
    transfer = new Transfer(account.id, "1234", 10, "mock-transfer-id");

    transferAdapter = {
      create: jest.fn(),
    };

    accountRepository = {
      getByUserAndAccountId: jest.fn(),
      update: jest.fn(),
    };

    transferRepository = {
      create: jest.fn(),
      getByExternalId: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateTransfer,
        { provide: ITransferAdapter, useValue: transferAdapter },
        { provide: IAccountRepository, useValue: accountRepository },
        { provide: ITransferRepository, useValue: transferRepository },

      ],
    }).compile();

    createTransfer = module.get<CreateTransfer>(CreateTransfer);
  });

  it("should create a transfer", async () => {
    accountRepository.getByUserAndAccountId.mockResolvedValue(account);
    transferAdapter.create.mockResolvedValue(transfer);

    account.balance = 90;

    const result = await createTransfer.execute(userId, accountId, "2", 10);

    expect(result.transferId).toBe("mock-transfer-id");
    expect(accountRepository.update).toHaveBeenCalledWith(account);
    expect(transferRepository.create).toHaveBeenCalled();
  });

  it("should throw AccountNotFoundException when account is not found", async () => {
    accountRepository.getByUserAndAccountId.mockResolvedValue(null);

    await expect(createTransfer.execute(userId, accountId, "2", 10)).rejects.toThrow(
      AccountNotFoundException
    );
  });

  it("should throw AccountWithoutBalanceException when account balance is insufficient", async () => {
    accountRepository.getByUserAndAccountId.mockResolvedValue(account);
    account.balance = 0;

    await expect(createTransfer.execute(userId, accountId, "2", 10)).rejects.toThrow(
      AccountWithoutBalanceException
    );
  });

  it("should throw CustomError when provider throws error", async () => {
    accountRepository.getByUserAndAccountId.mockResolvedValue(account);
    transferAdapter.create.mockRejectedValue(new CustomError("Adapter"));

    await expect(createTransfer.execute(userId, accountId, "2", 10)).rejects.toThrow(
      CustomError
    );
  });
});
