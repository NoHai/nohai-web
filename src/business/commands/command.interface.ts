export interface ICommand<TInput, TOutput> {
    execute(value: TInput): TOutput;
}
