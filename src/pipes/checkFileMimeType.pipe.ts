import {
  ArgumentMetadata,
  BadRequestException,
  ConflictException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class CheckFileMimeType implements PipeTransform {
  validMimeTypes: string[];
  constructor(mimeTypes: string[]) {
    this.validMimeTypes = mimeTypes.map((type) => type.toLowerCase());
  }

  transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
    if (!value || !value.originalname) return value;
 
    const extension = value.originalname.split('.').at(-1)?.toLowerCase();

    if (!extension || !this.validMimeTypes.includes(extension)) {
      throw new BadRequestException('You must only send jpg and png files!');
    }

    return value;
  }
}
