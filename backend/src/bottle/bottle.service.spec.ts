import { Test, TestingModule } from '@nestjs/testing';
import { BottleService } from './bottle.service';

describe('BottleService', () => {
  let service: BottleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BottleService],
    }).compile();

    service = module.get<BottleService>(BottleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
