import { Test, TestingModule } from '@nestjs/testing';
import { MyomsService } from './myoms.service';

describe('MyomsService', () => {
  let service: MyomsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MyomsService],
    }).compile();

    service = module.get<MyomsService>(MyomsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
