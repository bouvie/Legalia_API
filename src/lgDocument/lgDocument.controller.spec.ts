import { Test, TestingModule } from '@nestjs/testing';
import { LgDocumentController } from './lgDocument.controller';

describe('LgDocumentController', () => {
  let controller: LgDocumentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LgDocumentController],
    }).compile();

    controller = module.get<LgDocumentController>(LgDocumentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
