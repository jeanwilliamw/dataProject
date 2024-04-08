// custom-validators.ts

import { registerDecorator, ValidationOptions } from 'class-validator';
import { Role } from '@prisma/client';

export function IsRoleEnum(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isRoleEnum',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          return value === undefined || Object.values(Role).includes(value);
        },
      },
    });
  };
}
