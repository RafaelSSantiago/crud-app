import { Test, TestingModule } from '@nestjs/testing';
import { UploadService } from '../../src/upload/upload.service';
import * as fs from 'fs';
import * as path from 'path';

jest.mock('fs');

describe('UploadService', () => {
  let service: UploadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UploadService],
    }).compile();

    service = module.get<UploadService>(UploadService);
  });

  test('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('saveFile', () => {
    let mockFile: Express.Multer.File;
    let uploadPath: string;
    let filePath: string;

    beforeEach(() => {
      mockFile = {
        originalname: 'test.txt',
        buffer: Buffer.from('test content'),
      } as Express.Multer.File;

      uploadPath = path.join(__dirname, '..', '..', 'uploads');
      filePath = path.join(uploadPath, mockFile.originalname);

      (fs.existsSync as jest.Mock).mockClear();
      (fs.mkdirSync as jest.Mock).mockClear();
      (fs.writeFileSync as jest.Mock).mockClear();
    });

    test('should save a file and return the file path', () => {
      (fs.existsSync as jest.Mock).mockReturnValue(false);
      (fs.mkdirSync as jest.Mock).mockImplementation(jest.fn());
      (fs.writeFileSync as jest.Mock).mockImplementation(jest.fn());

      const result = service.saveFile(mockFile);

      expect(fs.existsSync).toHaveBeenCalledWith(uploadPath);
      expect(fs.mkdirSync).toHaveBeenCalledWith(uploadPath);
      expect(fs.writeFileSync).toHaveBeenCalledWith(filePath, mockFile.buffer);
      expect(result).toBe(`/uploads/${mockFile.originalname}`);
    });

    test('should not create directory if it already exists', () => {
      (fs.existsSync as jest.Mock).mockReturnValue(true);
      (fs.writeFileSync as jest.Mock).mockImplementation(() => true);

      const result = service.saveFile(mockFile);

      expect(fs.existsSync).toHaveBeenCalledWith(uploadPath);
      expect(fs.mkdirSync).not.toHaveBeenCalled();
      expect(fs.writeFileSync).toHaveBeenCalledWith(filePath, mockFile.buffer);
      expect(result).toBe(`/uploads/${mockFile.originalname}`);
    });
  });
});
