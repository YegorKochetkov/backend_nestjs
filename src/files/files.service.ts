import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FilesService {
  async createFile(file: Express.Multer.File): Promise<string> {
    const fileName = crypto.randomUUID() + '.jpg';
    const filePath = path.resolve(__dirname, '..', 'static');

    try {
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      await fs.promises.writeFile(path.join(filePath, fileName), file.buffer);
    } catch (error) {
      new HttpException(
        `An error occurred while saving the image: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return fileName;
  }
}
