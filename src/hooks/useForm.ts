import _ from 'lodash';
import * as Yup from 'yup';
import dot from 'dot-object';
import { useState } from 'react';

type SubmitHandlerProps<T> = {
  validateSchema: Yup.AnyObjectSchema;
  callback: (formFields: T) => Promise<void>;
  onError: (error: any) => void;
};

export const useForm = <T>(initialData: T) => {
  const [fields, setFields] = useState<T>(initialData);
  const [errors, setErrors] = useState<any>({});

  const validate = async (
    schema: Yup.AnyObjectSchema,
    fields: Record<string, any>,
  ) => {
    try {
      setErrors({});

      const validFields = await schema.validate(fields, { abortEarly: false });

      return validFields;
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        let validationErrors = {};

        err.inner.forEach(error => {
          if (error.path) {
            validationErrors = _.merge(
              validationErrors,
              dot.object({ [error.path]: error.message }),
            );
          }
        });

        setErrors(validationErrors);
      }

      throw err;
    }
  };

  const submitHandler = ({
    validateSchema,
    callback,
    onError,
  }: SubmitHandlerProps<T>) => {
    return async () => {
      try {
        const validFormFields = await validate(validateSchema, fields);

        await callback(validFormFields);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          console.error(err);
          return;
        }

        onError(err);
      }
    };
  };

  const resetForm = () => {
    setFields(initialData);
    setErrors({});
  };

  return {
    fields,
    setFields,
    resetForm,
    errors,
    submitHandler,
  };
};
