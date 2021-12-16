import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
export class ProductValidationPipe implements PipeTransform {
  transform(value, metadata: ArgumentMetadata) {
    const isArray = Array.isArray(value);
    const REG_EXP = /[a-zA-Z-]/g;
    let isNotAlphabetNum = false;

    if (isArray) {
      value.forEach((item) => {
        const { market } = item;
        if (market.replace(REG_EXP, '').length > 0) isNotAlphabetNum = true;
      });
    } else {
      const { market } = value;
      if (market.replace(REG_EXP, '').length > 0) isNotAlphabetNum = true;
    }

    if (isNotAlphabetNum) {
      throw new BadRequestException(`market format Error : KRW-CODE`);
    }

    return value;
  }
}
