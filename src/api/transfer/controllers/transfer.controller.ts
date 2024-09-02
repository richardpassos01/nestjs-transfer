import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from "@nestjs/common";
import { CreateTransfer } from "../../../application/use-cases/create-transfer";
import { TransferRequest } from "../schemas/inputs/TransferRequest";

@Controller()
export class TransferController {
  constructor(private readonly createTransfer: CreateTransfer) {}

  @Post("create-transfer/:userId")
  @HttpCode(HttpStatus.OK)
  async transfer(
    @Param("userId") userId: string,
    @Body() request: TransferRequest
  ): Promise<{ transferId: string }> {
    const { sourceAccountId, destinationAccountId, amount } = request;

    return this.createTransfer.execute(
      userId,
      sourceAccountId,
      destinationAccountId,
      amount
    );
  }
}
