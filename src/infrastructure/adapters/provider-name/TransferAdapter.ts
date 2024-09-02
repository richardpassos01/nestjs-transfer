import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';
import { AxiosInstance, AxiosResponse } from "axios";
import { ITransferAdapter } from "../../../domain/transfer/adapters/ITransferAdapter";
import Transfer, { TransferDTO } from "../../../domain/transfer/Transfer";
import { CustomError } from "../../../domain/shared/errors/CustomError";

interface CreateTransferResponse {
  transferId: string;
}

@Injectable()
export class TransferAdapter implements ITransferAdapter {
  private client: AxiosInstance;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService
  ) {
    const providerHost = this.configService.get<string>('TRANSFER_PROVIDER_HOST');

    this.client = this.httpService.axiosRef;
    this.client.defaults.baseURL = providerHost;

    this.client.defaults.headers.common = {
      "Content-Type": "application/json",
      'x-mock-response-name': 'success'
    };

    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        if (!response?.data.error) return response.data;

        throw new CustomError("TransferAdapter", response.data.error);
      },
      (error) => {
        throw new CustomError("TransferAdapter", error.message, error.status);
      }
    );
  }

  async create(body: TransferDTO): Promise<Transfer> {
    const response: CreateTransferResponse = await this.client.post(
      "/create-transfer",
      body
    );
    const transferId = response.transferId;

    return new Transfer(
      body.sourceAccountId,
      body.destinationAccountId,
      body.amount,
      transferId
    );
  }
}
