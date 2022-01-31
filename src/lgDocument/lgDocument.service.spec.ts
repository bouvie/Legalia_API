import { Test, TestingModule } from '@nestjs/testing';
import { LgDocumentService } from './lgDocument.service';

describe('LgDocumentService', () => {
  let service: LgDocumentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LgDocumentService],
    }).compile();

    service = module.get<LgDocumentService>(LgDocumentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
