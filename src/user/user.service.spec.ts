import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
const mockPrismaService = {
  user: {
    findFirst: jest.fn(),
    create: jest.fn(),
  },
};
describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
      imports: [],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('', () => {});
  it('', () => {});
  it('', () => {});
  it('', () => {});
  it('', () => {});
  it('', () => {});
});
