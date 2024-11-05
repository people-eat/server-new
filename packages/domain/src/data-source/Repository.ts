export type NonEmptyPartial<T> = { [K in keyof T]: Pick<T, K> }[keyof T] & Partial<T>;

export interface Repository<Entity> {
    findOne: (criteria: NonEmptyPartial<Entity>) => Promise<Entity | undefined>;
    findMany: (criteria: NonEmptyPartial<Entity>) => Promise<Entity[] | undefined>;
    findAll: () => Promise<Entity[] | undefined>;
    insertOne: (entity: Entity) => Promise<boolean>;
    insertMany: (entities: Entity[]) => Promise<boolean>;
    updateOne: (criteria: NonEmptyPartial<Entity>, partialEntity: NonEmptyPartial<Entity>) => Promise<boolean>;
    deleteOne: (criteria: NonEmptyPartial<Entity>) => Promise<boolean>;
}
