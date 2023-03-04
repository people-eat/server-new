import { FileStore } from '@people-eat/server-domain';
import { ReadStream } from 'fs';

export function createFileStore(): FileStore.Adapter {
    return {
        profilePictures: {
            save: async (_userId: string, _profilePicture: ReadStream) => false,
            get: async (_userId: string) => undefined,
            delete: async (_userId: string) => false,
        },
        mealImages: {
            save: async (_mealId: string, _image: ReadStream) => false,
            get: async (_mealId: string) => undefined,
            delete: async (_mealId: string) => false,
        },
        menuImages: {
            save: async (_menuId: string, _image: ReadStream) => false,
            get: async (_menuId: string) => undefined,
            delete: async (_menuId: string) => false,
        },
    };
}
