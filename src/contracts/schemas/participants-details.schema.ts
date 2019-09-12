import { ValidationSchema } from "class-validator";
export let ParticipantsDetailsSchema: ValidationSchema = { // using interface here is not required, its just for type-safety
    name: "participantsDetailsSchema",
    properties: {
        Level: [{
            type: "isInt",
        }, {
            type: "min",
            constraints: [1]
        }],
        FreeSpots: [{
            type: "isInt",
        }, {
            type: "min",
            constraints: [1]
        }],
        PriceForParticipant: [{
            type: "isInt",
        }, {
            type: "min",
            constraints: [1]
        }],
    }
};