import { ValidationSchema } from "class-validator";
export let ParticipantsDetailsSchema: ValidationSchema = { // using interface here is not required, its just for type-safety
    name: "participantsDetailsSchema",
    properties: {
        Sport: [{
            type: "minLength",
            constraints: [3]
        }],
        Level: [{
            type: "isInt",
        }, {
            type: "min",
            constraints: [1]
        }],
        TotalParticipants: [{
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