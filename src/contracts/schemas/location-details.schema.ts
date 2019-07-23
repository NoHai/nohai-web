import {ValidationSchema} from "class-validator";
export let LocationDetailsSchema: ValidationSchema = { // using interface here is not required, its just for type-safety
    name: "locationDetailsSchema",
    properties: {
        County: [{
            type: "minLength",
            constraints: [3]
        },],
        City: [{
            type: "minLength",
            constraints: [3]
        },],
        Address: [{
            type: "minLength",
            constraints: [3]
        },],
    }
};