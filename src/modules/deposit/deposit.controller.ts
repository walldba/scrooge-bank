import { Body, Controller, Post } from '@nestjs/common';
import { DepositService } from './deposit.service';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { DepositEntity } from './entities/deposit.entity';

@Controller('deposit')
export class DepositController {
  constructor(private readonly depositService: DepositService) {}

  @Post('create')
  async createDeposit(
    @Body() createDepositDto: CreateDepositDto
  ): Promise<DepositEntity> {
    return this.depositService.validateAndCreate(createDepositDto);
  }
}
