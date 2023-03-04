import { CreateOneCookRequest } from '../cook/CreateOneCookRequest.js';
import { User } from './User.js';

export interface CreateOneUserRequest extends Pick<User, 'firstName' | 'lastName' | 'language' | 'gender' | 'birthDate'> {
    cook?: CreateOneCookRequest;
}
