import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { TransferController } from "./api/transfer/controllers/transfer.controller";
import { CreateTransfer } from "./application/use-cases/create-transfer";
import { HttpModule } from "@nestjs/axios";
import { DatabaseModule } from "./infrastructure/database/database.module";

import { ITransferAdapter } from "./domain/transfer/adapters/ITransferAdapter";
import { TransferAdapter } from "./infrastructure/adapters/provider-name/TransferAdapter";

import { IAccountRepository } from "./domain/account/repositories/IAccountRepository";
import { AccountRepository } from "./infrastructure/repositories/AccountRepository";

import { ITransferRepository } from "./domain/transfer/repositories/ITransferRepository";
import { TransferRepository } from "./infrastructure/repositories/TransferRepository";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
    DatabaseModule,
  ],
  controllers: [TransferController],
  providers: [
    CreateTransfer,
    {
      provide: ITransferAdapter,
      useClass: TransferAdapter,
    },
    {
      provide: IAccountRepository,
      useClass: AccountRepository,
    },
    {
      provide: ITransferRepository,
      useClass: TransferRepository,
    },
  ],
})
export class AppModule {}
