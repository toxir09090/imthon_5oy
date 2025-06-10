import { ArgumentMetadata, BadRequestException, ConflictException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class CheckFileMimeType implements PipeTransform{
    validMimeTypes:string[]
    constructor(mimeTypes: string[]) {
        this.validMimeTypes = mimeTypes
    };

    transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
        if (!value) return value;
        if(!this.validMimeTypes.includes(value.originalname.split('.').at(-1) as string)){
            throw new BadRequestException('You must only send jpg and png files!')
        }
        return value;
    }
}