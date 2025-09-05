import { Body, Controller, Post } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { ExecuteTransferDto } from './dto/execute-transfer.dto';
import { ITransferCreatedResponse } from './interfaces/transfer-response.interface';

@Controller('transfer')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Post('execute')
  async executeTransfer(
    @Body() executeTransferDto: ExecuteTransferDto
  ): Promise<ITransferCreatedResponse> {
    return this.transferService.validateAndExecute(executeTransferDto);
  }
}
