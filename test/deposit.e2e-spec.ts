import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { NotFoundException } from '@nestjs/common';
import { DepositService } from '../src/modules/deposit/deposit.service';
import { DepositController } from '../src/modules/deposit/deposit.controller';
import { initializeTransactionalContext } from 'typeorm-transactional';

describe('DepositController (e2e)', () => {
  let app: INestApplication;
  let depositService: DepositService;

  const mockDepositResponse = {
    depositId: 'dep123',
    accountNumber: 'ACC123',
    userMail: 'user@example.com',
    amount: '100.00',
    createdAt: new Date().toISOString(),
  };

  const mockDepositService = {
    validateAndCreate: jest.fn().mockResolvedValue(mockDepositResponse),
  };

  beforeAll(async () => {
    initializeTransactionalContext();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [DepositController],
      providers: [{ provide: DepositService, useValue: mockDepositService }],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })
    );
    await app.init();

    depositService = moduleFixture.get<DepositService>(DepositService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a deposit and return response', async () => {
    const payload = {
      accountNumber: 'ACC123',
      amount: 100,
      userMail: 'user@example.com',
    };

    const res = await request(app.getHttpServer())
      .post('/deposit/create')
      .send(payload)
      .expect(201);

    expect(res.body).toEqual(
      expect.objectContaining({
        depositId: expect.any(String),
        accountNumber: payload.accountNumber,
        userMail: payload.userMail,
        amount: expect.any(String),
        createdAt: expect.any(String),
      })
    );
    expect(depositService.validateAndCreate).toHaveBeenCalledWith(payload);
  });

  it('should return 400 for invalid payload', async () => {
    const invalidPayload = {
      accountNumber: 'ACC123',
    };

    await request(app.getHttpServer())
      .post('/deposit/create')
      .send(invalidPayload)
      .expect(400);
  });

  it('should return 404 if DepositService throws NotFoundException', async () => {
    mockDepositService.validateAndCreate.mockRejectedValueOnce(
      new NotFoundException('Account not found')
    );

    const payload = {
      accountNumber: 'ACC123',
      amount: 100,
      userMail: 'user@example.com',
    };

    await request(app.getHttpServer())
      .post('/deposit/create')
      .send(payload)
      .expect(404);
  });
});
