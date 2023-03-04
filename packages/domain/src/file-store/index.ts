import { ReadStream } from 'fs';
import { Readable } from 'stream';

export interface Adapter {
    profilePictures: {
        save: (userId: string, profilePicture: ReadStream) => Promise<boolean>;
        get: (userId: string) => Promise<Readable | undefined>;
        delete: (userId: string) => Promise<boolean>;
    };
    mealImages: {
        save: (mealId: string, image: ReadStream) => Promise<boolean>;
        get: (mealId: string) => Promise<Readable | undefined>;
        delete: (mealId: string) => Promise<boolean>;
    };
    menuImages: {
        save: (menuId: string, image: ReadStream) => Promise<boolean>;
        get: (menuId: string) => Promise<Readable | undefined>;
        delete: (menuId: string) => Promise<boolean>;
    };
}
