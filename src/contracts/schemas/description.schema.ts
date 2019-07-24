import {ValidationSchema} from "class-validator";
export let Description: ValidationSchema = { // using interface here is not required, its just for type-safety
    name: "description",
    properties: {
        Description: [{
            type: "minLength",
            constraints: [15]
        },],
        Date: [{
            type: "minLength",
            constraints: [6]
        },],
        Time: [{
            type: "minLength",
            constraints: [4]
        },],
    }
};