import { Injectable } from '@nestjs/common';
import path from 'path';
import * as fs from 'fs';


@Injectable()
export class UploadService {
  saveFile(file: Express.Multer.File): string {
    const uploadPath = path.join(__dirname, '..', '..', 'uploads');
   
   if(!fs.existsSync(uploadPath)){
      fs.mkdirSync(uploadPath);
    }

    const filePath = path.join(uploadPath, file.originalname);
    
    fs.writeFileSync(filePath, file.buffer);
    return `/uploads/${file.originalname}`;
  }
}
