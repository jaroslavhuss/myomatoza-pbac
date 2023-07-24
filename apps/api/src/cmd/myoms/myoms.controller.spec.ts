import { Test, TestingModule } from '@nestjs/testing';
import { MyomsController } from './myoms.controller';
import { MyomsService } from './myoms.service';

describe('MyomsController', () => {
  let controller: MyomsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MyomsController],
      providers: [MyomsService],
    }).compile();

    controller = module.get<MyomsController>(MyomsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
