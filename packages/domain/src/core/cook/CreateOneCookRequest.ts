import { CreateOneCookLanguageRequest } from '../cook-language/CreateOneCookLanguageRequest.js';
import { Cook } from './Cook.js';

export interface CreateOneCookRequest extends Omit<Cook, 'cookId' | 'isLocked' | 'createdAt'> {
    languages: CreateOneCookLanguageRequest[];
}
