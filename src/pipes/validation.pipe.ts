import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from '../exceptions/validation.exception';
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (!metadata.metatype) {
      return value;
    }

    const valueInstance = plainToInstance(metadata.metatype, value);
    const errors = await validate(valueInstance);

    if (errors.length) {
      const messages = errors.map(
        (error) =>
          `${error.property} - ${Object.values(error.constraints).join(', ')}`,
      );
      throw new ValidationException(messages);
    }

    if (metadata.type === 'param') {
      return valueInstance;
    }

    return value;
  }
}
