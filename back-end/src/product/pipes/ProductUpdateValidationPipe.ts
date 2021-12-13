import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { IProduct } from '../product.module';

export class ProductUpdateValidationPipe implements PipeTransform {
  transform(value: IProduct, metadata: ArgumentMetadata) {
    const { code } = value;
    const isNotAlphabet = code.replace(/[a-zA-Z]/g, '').length > 0;

    if (isNotAlphabet) {
      throw new BadRequestException(`code is only alphabet - code: ${code}`);
    }

    return code;
  }
}
