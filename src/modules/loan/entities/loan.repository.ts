import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { LoanEntity } from './loan.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LoanStatusEnum } from '../enum/loan-status.enum';

@Injectable()
export class LoanRepository extends Repository<LoanEntity> {
  constructor(
    @InjectRepository(LoanEntity)
    private loanRepository: Repository<LoanEntity>
  ) {
    super(
      loanRepository.target,
      loanRepository.manager,
      loanRepository.queryRunner
    );
  }

  async updateLoan(loan: LoanEntity, amount: number) {
    const updatedLoan = await this.loanRepository
      .createQueryBuilder()
      .update()
      .set({
        paidAmount: () => `"paidAmount" + ${amount}`,
        status:
          loan.paidAmount + amount >= loan.amount
            ? LoanStatusEnum.PAID
            : LoanStatusEnum.PARTIALLY_PAID,
      })
      .where('id = :id', { id: loan.id })
      .returning('*')
      .execute();

    return updatedLoan.raw[0];
  }
}
