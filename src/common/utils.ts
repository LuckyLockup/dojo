export interface StringStoreState<T> {
    readonly allIds: ReadonlyArray<String>;
    readonly byId: {[key: string] : T};
}