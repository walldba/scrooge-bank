import { Test, TestingModule } from '@nestjs/testing';
import {
  INestApplication,
  ValidationPipe,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import request from 'supertest';
import { TransferService } from '../src/modules/transfer/transfer.service';
import { TransferController } from '../src/modules/transfer/transfer.controller';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { randomUUID } from 'node:crypto';
import { TransferStatusEnum } from '../src/modules/transfer/enum/transfer-status.enum';

describe('TransferController (e2e)', () => {
  let app: INestApplication;
  let transferService: TransferService;

  const mockTransferService = {
    validateAndExecute: jest.fn((payload) =>
      Promise.resolve({
        transferId: 'trans123',
        sourceAccountId: payload.sourceAccountId,
        destinationAccountId: payload.destinationAccountId,
        amount: payload.amount.toFixed(2),
        status: TransferStatusEnum.COMPLETED,
        createdAt: new Date().toISOString(),
      })
    ),
  };

  beforeAll(async () => {
    initializeTransactionalContext();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [TransferController],
      providers: [{ provide: TransferService, useValue: mockTransferService }],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })
    );
    await app.init();

    transferService = moduleFixture.get<TransferService>(TransferService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should execute a transfer and return response', async () => {
    const payload = {
      sourceAccountId: randomUUID(),
      destinationAccountId: randomUUID(),
      amount: 100,
    };

    const res = await request(app.getHttpServer())
      .post('/transfer/execute')
      .send(payload)
      .expect(201);

    expect(res.body).toEqual(
      expect.objectContaining({
        transferId: expect.any(String),
        sourceAccountId: payload.sourceAccountId,
        destinationAccountId: payload.destinationAccountId,
        amount: expect.any(String),
        status: expect.any(String),
        createdAt: expect.any(String),
      })
    );
    expect(transferService.validateAndExecute).toHaveBeenCalledWith(payload);
  });

  it('should return 400 for invalid payload', async () => {
    const invalidPayload = {
      sourceAccountId: 'SRC123',
    };

    await request(app.getHttpServer())
      .post('/transfer/execute')
      .send(invalidPayload)
      .expect(400);
  });

  it('should return 404 if TransferService throws NotFoundException', async () => {
    mockTransferService.validateAndExecute.mockRejectedValueOnce(
      new NotFoundException('Source account not found')
    );

    const payload = {
      sourceAccountId: randomUUID(),
      destinationAccountId: randomUUID(),
      amount: 100,
    };

    await request(app.getHttpServer())
      .post('/transfer/execute')
      .send(payload)
      .expect(404);
  });

  it('should return 400 if TransferService throws BadRequestException', async () => {
    mockTransferService.validateAndExecute.mockRejectedValueOnce(
      new BadRequestException('Insufficient funds')
    );

    const payload = {
      sourceAccountId: randomUUID(),
      destinationAccountId: randomUUID(),
      amount: 1000000,
    };

    await request(app.getHttpServer())
      .post('/transfer/execute')
      .send(payload)
      .expect(400);
  });
});
