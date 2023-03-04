export interface DatabaseRepository<Entity> {
    findOne: (criteria: Partial<Entity>) => Promise<Entity | undefined>;
    findMany: (criteria: Partial<Entity>) => Promise<Entity[] | undefined>;
    insertOne: (entity: Entity) => Promise<boolean>;
    insertMany: (entities: Entity[]) => Promise<boolean>;
    updateOne: (criteria: Partial<Entity>, partialEntity: Partial<Entity>) => Promise<boolean>;
    deleteOne: (criteria: Partial<Entity>) => Promise<boolean>;
}
