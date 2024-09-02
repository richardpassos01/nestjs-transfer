import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class TransferRequest {
  @IsString()
  @IsNotEmpty()
  readonly sourceAccountId: string;

  @IsString()
  @IsNotEmpty()
  readonly destinationAccountId: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1, { message: 'Amount must be greater than 0' })
  readonly amount: number;
}
