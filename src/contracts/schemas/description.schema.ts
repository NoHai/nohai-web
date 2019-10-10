import { ValidationSchema } from 'class-validator';
export let Description: ValidationSchema = {
  // using interface here is not required, its just for type-safety
  name: 'description',
  properties: {
    StartDate: [
      {
        type: 'maxLength',
        constraints: [10],
      },
      {
        type: 'minLength',
        constraints: [10],
      },
    ],
    EndDate: [
      {
        type: 'maxLength',
        constraints: [10],
      },
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
