export abstract class Entity<TType> {
    public props: TType;

    constructor(data: TType) {
        this.props = { ...data };
    }
}
