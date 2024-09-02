import { HttpException, HttpStatus } from "@nestjs/common";

export class CustomError extends HttpException {
  private context: string;

  constructor(context: string, message?: string, status?: number) {
    super(
      message ?? "Internal server error",
      status ?? HttpStatus.INTERNAL_SERVER_ERROR
    );
    this.context = context;
  }
}
