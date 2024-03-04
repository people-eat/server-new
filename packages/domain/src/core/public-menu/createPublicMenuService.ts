import { type Authorization, type Course, type PublicMenu } from '../..';
import { type Runtime } from '../Runtime';
import { type NanoId } from '../shared';
import { type FindManyPublicMenusRequest } from './FindManyPublicMenusRequest';
import { checkAvailability } from './useCases/checkAvailability';
import { findAllCourses } from './useCases/findAllCourses';
import { findHeroes } from './useCases/findHeroes';
import { findMany } from './useCases/findMany';
import { findManyByCookId } from './useCases/findManyByCookId';
import { findOne } from './useCases/findOne';

export interface PublicMenuService {
    findOne(context: Authorization.Context, menuId: string): Promise<PublicMenu | undefined>;
    findMany(context: Authorization.Context, request: FindManyPublicMenusRequest): Promise<PublicMenu[] | undefined>;
    findManyByCookId(context: Authorization.Context, request: { cookId: NanoId }): Promise<PublicMenu[] | undefined>;
    findAllCourses(context: Authorization.Context, request: { menuId: NanoId }): Promise<Course[] | undefined>;
    findHeroes(context: Authorization.Context): Promise<PublicMenu[] | undefined>;
    checkAvailability(context: Authorization.Context, request: FindManyPublicMenusRequest): Promise<boolean>;
}

export function createPublicMenuService({ dataSourceAdapter, logger }: Runtime): PublicMenuService {
    return {
        findOne: (context: Authorization.Context, menuId: string) => findOne({ dataSourceAdapter, logger, context, request: { menuId } }),
        findMany: (context: Authorization.Context, request: FindManyPublicMenusRequest) =>
            findMany({ dataSourceAdapter, logger, context, request }),
        findManyByCookId: (context: Authorization.Context, request: { cookId: NanoId }) =>
            findManyByCookId({ dataSourceAdapter, logger, context, request }),
        findAllCourses: (context: Authorization.Context, request: { menuId: NanoId }) =>
            findAllCourses({ dataSourceAdapter, logger, context, request }),
        findHeroes: (context: Authorization.Context) => findHeroes({ dataSourceAdapter, logger, context, request: {} }),
        checkAvailability: (context: Authorization.Context, request: FindManyPublicMenusRequest) =>
            checkAvailability({ dataSourceAdapter, logger, context, request }),
    };
}
