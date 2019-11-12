import { ValidationSchema } from 'class-validator';
export let Description: ValidationSchema = {
  // using interface here is not required, its just for type-safety
  name: 'description',
  properties: {
    StartDate: [
      {
        type: 'minLength',
        constraints: [10],
      },
    ],
    EndDate: [
      {
        type: 'minLength',
        constraints: [10],
      },
    ],
    StartTime: [
      {
        type: 'maxLength',
        constraints: [6],
      },
      {
        type: 'minLength',
        constraints: [4],
      },
    ],
    EndTime: [
      {
        type: 'maxLength',
        constraints: [6],
      },
      {
        type: 'minLength',
        constraints: [4],
      },
    ],
  },
};
