import { Injectable, InternalServerErrorException } from '@nestjs/common';
import path from 'path';
import * as fs from 'fs';

@Injectable()
export class UploadService {
    saveFile(file: Express.Multer.File): string {
        try {
            const uploadPath = path.join(__dirname, '..', '..', 'uploads');

            if (!fs.existsSync(uploadPath)) {
                fs.mkdirSync(uploadPath, { recursive: true });
            }

            const filePath = path.join(uploadPath, file.originalname);

            fs.writeFileSync(filePath, file.buffer);
            return `/uploads/${encodeURIComponent(file.originalname)}`;
        } catch (error) {
            console.error('Erro ao salvar o arquivo:', error);
            throw new InternalServerErrorException('Falha ao salvar o arquivo.');
        }
    }
}
