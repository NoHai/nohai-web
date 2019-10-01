import { ValidationSchema } from 'class-validator';
export let Description: ValidationSchema = {
  // using interface here is not required, its just for type-safety
  name: 'description',
  properties: {
    Date: [
      {
        type: 'maxLength',
        constraints: [10],
      },
      {
        type: 'minLength',
        constraints: [10],
      },
    ],
    Time: [
      {
        type: 'maxLength',
        constraints: [5],
      },
      {
        type: 'minLength',
        constraints: [5],
      },
    ],
  },
};
