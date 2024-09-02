import { HttpException, HttpStatus } from '@nestjs/common';

export class AccountWithoutBalanceException extends HttpException {
  constructor() {
    super('Account without balance', HttpStatus.BAD_REQUEST);
  }
}
