import { type DataSource, type Logger } from '@people-eat/server-domain';
import { type DeleteResult, type ObjectLiteral, type Repository, type UpdateResult } from 'typeorm';

export default function createGenericRepository<Entity extends ObjectLiteral>(
    genericRepository: Repository<Entity>,
    logger: Logger.Adapter,
): DataSource.Repository<Entity> {
    return {
        findOne: async (criteria: DataSource.NonEmptyPartial<Entity>): Promise<Entity | undefined> => {
            try {
                const entity: Entity | null = await genericRepository.findOne({ where: criteria });
                if (!entity) return undefined;
                return entity;
            } catch (error) {
                logger.error(error);
                return undefined;
            }
        },
        findMany: async (criteria: DataSource.NonEmptyPartial<Entity>): Promise<Entity[] | undefined> => {
            try {
                const entities: Entity[] = await genericRepository.find({ where: criteria });
                return entities;
            } catch (error) {
                logger.error(error);
                return undefined;
            }
        },
        insertOne: async (entity: Entity): Promise<boolean> => {
            try {
                await genericRepository.save(entity);
                return true;
            } catch (error) {
                logger.error(error);
                return false;
            }
        },
        insertMany: async (entities: Entity[]): Promise<boolean> => {
            try {
                await genericRepository.insert(entities);
                return true;
            } catch (error) {
                logger.error(error);
                return false;
            }
        },
        updateOne: async (criteria: Partial<Entity>, partialEntity: Partial<Entity>): Promise<boolean> => {
            for (const key in partialEntity)
                if (partialEntity[key] === null || partialEntity[key] === undefined) partialEntity[key] = null as any;

            try {
                const result: UpdateResult = await genericRepository.update(criteria, partialEntity);
                return result.affected === 1;
            } catch (error) {
                logger.error(error);
                return false;
            }
        },
        deleteOne: async (criteria: Partial<Entity>): Promise<boolean> => {
            try {
                const result: DeleteResult = await genericRepository.delete(criteria);
                return result.affected === 1;
            } catch (error) {
                logger.error(error);
                return false;
            }
        },
    };
}
