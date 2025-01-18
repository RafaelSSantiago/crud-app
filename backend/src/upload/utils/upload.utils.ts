import { BadRequestException } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import * as path from 'path';

export const multerOptions = (): MulterOptions => ({
    limits: {
        fileSize: 1 * 1024 * 1024 // 1MB
    },
    fileFilter: (req, file, callback) => {
        const allowedExtensions = /jpeg|jpg|png|gif/;
        const extension = path.extname(file.originalname).toLowerCase().substring(1); // Remove o ponto

        if (allowedExtensions.test(extension)) {
            callback(null, true);
        } else {
            callback(new BadRequestException('Jut archives of image (jpeg, jpg, png, gif) allow!'), false);
        }
    }
});
