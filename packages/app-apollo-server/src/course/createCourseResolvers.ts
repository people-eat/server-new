import { type Authorization, type Service } from '@people-eat/server-domain';
import {
    type GQLCookMenuCourseMutation,
    type GQLCookMenuCourseMutationCreateOneArgs,
    type GQLCookMenuCourseMutationDeleteOneArgs,
} from '../generated';
import { type Resolvers } from '../Resolvers';

export function createCourseResolvers(service: Service): Resolvers<'Course' | 'CookMenuCourseMutation' | 'CookMenuCourseQuery'> {
    return {
        CookMenuCourseMutation: {
            createOne: async (
                { cookId, menuId }: GQLCookMenuCourseMutation,
                { request }: GQLCookMenuCourseMutationCreateOneArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.course.createOne(context, { cookId, menuId, ...request }),
            deleteOne: async (
                { cookId, menuId }: GQLCookMenuCourseMutation,
                { courseId }: GQLCookMenuCourseMutationDeleteOneArgs,
                context: Authorization.Context,
            ): Promise<boolean> => service.course.deleteOne(context, { cookId, menuId, courseId }),
        },
        CookMenuCourseQuery: {},
        Course: {},
    };
}
