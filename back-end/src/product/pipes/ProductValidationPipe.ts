import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
export class ProductValidationPipe implements PipeTransform {
  transform(value, metadata: ArgumentMetadata) {
    const isArray = Array.isArray(value);
    const REG_EXP = /[a-zA-Z0-9]/g;
    let isNotAlphabetNum = false;

    if (isArray) {
      value.forEach((item) => {
        const { code } = item;
        if (code.replace(REG_EXP, '').length > 0) isNotAlphabetNum = true;
      });
    } else {
      const { code } = value;
      if (code.replace(REG_EXP, '').length > 0) isNotAlphabetNum = true;
    }

    if (isNotAlphabetNum) {
      throw new BadRequestException(`code is only alphabet/number`);
    }

    return value;
  }
}
