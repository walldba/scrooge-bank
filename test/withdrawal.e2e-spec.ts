import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { NotFoundException } from '@nestjs/common';
import { WithdrawalService } from '../src/modules/withdrawal/withdrawal.service';
import { WithdrawalController } from '../src/modules/withdrawal/withdrawal.controller';
import { initializeTransactionalContext } from 'typeorm-transactional';

describe('WithdrawalController (e2e)', () => {
  let app: INestApplication;
  let withdrawalService: WithdrawalService;

  const mockWithdrawalResponse = {
    withdrawalId: 'with123',
    accountNumber: 'ACC123',
    userMail: 'user@example.com',
    amount: '100.00',
    createdAt: new Date().toISOString(),
  };

  const mockWithdrawalService = {
    validateAndCreate: jest.fn().mockResolvedValue(mockWithdrawalResponse),
  };

  beforeAll(async () => {
    initializeTransactionalContext();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [WithdrawalController],
      providers: [
        { provide: WithdrawalService, useValue: mockWithdrawalService },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })
    );
    await app.init();

    withdrawalService = moduleFixture.get<WithdrawalService>(WithdrawalService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a withdrawal and return response', async () => {
    const payload = {
      accountNumber: 'ACC123',
      amount: 100,
      userMail: 'user@example.com',
    };

    const res = await request(app.getHttpServer())
      .post('/withdrawal/create')
      .send(payload)
      .expect(201);

    expect(res.body).toEqual(
      expect.objectContaining({
        withdrawalId: expect.any(String),
        accountNumber: payload.accountNumber,
        userMail: payload.userMail,
        amount: expect.any(String),
        createdAt: expect.any(String),
      })
    );
    expect(withdrawalService.validateAndCreate).toHaveBeenCalledWith(payload);
  });

  it('should return 400 for invalid payload', async () => {
    const invalidPayload = {
      accountNumber: 'ACC123',
    };

    await request(app.getHttpServer())
      .post('/withdrawal/create')
      .send(invalidPayload)
      .expect(400);
  });

  it('should return 404 if WithdrawalService throws NotFoundException', async () => {
    mockWithdrawalService.validateAndCreate.mockRejectedValueOnce(
      new NotFoundException('Account not found')
    );

    const payload = {
      accountNumber: 'ACC123',
      amount: 100,
      userMail: 'user@example.com',
    };

    await request(app.getHttpServer())
      .post('/withdrawal/create')
      .send(payload)
      .expect(404);
  });
});
