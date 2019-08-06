export class ListModel<T> {
    public Data!: T[];
    public Total!: number;

    constructor(){
        this.Data = [];
    }
}
