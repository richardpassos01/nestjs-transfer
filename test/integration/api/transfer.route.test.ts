import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../../../src/app.module";
import { HttpService } from "@nestjs/axios";
import { closeDatabase, resetDatabase, runSeeds } from "../../db-utils";
import { IAccountRepository } from "../../../src/domain/account/repositories/IAccountRepository";
import { ITransferRepository } from "../../../src/domain/transfer/repositories/ITransferRepository";


describe("TransferRoute", () => {
  let app: INestApplication;
  let httpService: HttpService;
  let accountRepository: IAccountRepository;
  let transferRepository: ITransferRepository;


  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    httpService = app.get<HttpService>(HttpService);
    accountRepository = app.get<IAccountRepository>(IAccountRepository);
    transferRepository = app.get<ITransferRepository>(ITransferRepository);

    await app.init();
  });

  beforeEach(async () => {
    jest.spyOn(httpService.axiosRef, "post").mockResolvedValue({
      transferId: "mock-transfer-id",
    });

    await resetDatabase();
    await runSeeds();
  });

  it("should create a transfer", async () => {
    const response = await request(app.getHttpServer())
      .post("/create-transfer/1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed")
      .send({
        sourceAccountId: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        destinationAccountId: "8b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        amount: 8,
      })
      .expect(200);


    const updatedAccount = await accountRepository.getByUserAndAccountId(
      "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
      "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"
    );

    const transfer = await transferRepository.getByExternalId(response.body.transferId);

    expect(updatedAccount.balance).toBe(2);
    expect(transfer).toBeDefined();
  });

  afterAll(async () => {
    await app.close();
    await resetDatabase();
    await closeDatabase();
  });
});
