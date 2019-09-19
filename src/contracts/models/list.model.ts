export class ListModel<T> {
    public Data!: T[];
    public Total!: number;
    public CustomTotal!: number;

    constructor(){
        this.Data = [];
    }
}
