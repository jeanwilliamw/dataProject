import { ObjectSchema } from 'yup';
import { ValidateOptions } from 'yup';

export const UseSchema = (
  schema: ObjectSchema<any>,
  options?: ValidateOptions,
): ClassDecorator => {
  return (target) => {
    target.prototype.schema = schema;
    target.prototype.options = options;
  };
};
