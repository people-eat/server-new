import { FileStore } from '@people-eat/server-domain';
import { ReadStream } from 'fs';

export function createFileStore(): FileStore.Adapter {
    return {
        profilePictures: {
            save: async (userId: string, profilePicture: ReadStream) => false,
            get: async (userId: string) => undefined,
            delete: async (userId: string) => false,
        },
        mealImages: {
            save: async (mealId: string, image: ReadStream) => false,
            get: async (mealId: string) => undefined,
            delete: async (mealId: string) => false,
        },
        menuImages: {
            save: async (menuId: string, image: ReadStream) => false,
            get: async (menuId: string) => undefined,
            delete: async (menuId: string) => false,
        },
    };
}
