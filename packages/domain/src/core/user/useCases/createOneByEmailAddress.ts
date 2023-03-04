import bcrypt from 'bcryptjs';
import { Authorization, Database, Email, Logger } from '../../../index.js';
import createNanoId from '../../../utils/createNanoId.js';
import { createOne as createOneEmailAddressUpdate } from '../../email-address-update/useCases/createOne.js';
import { CreateOneUserRequest } from '../CreateOneUserRequest.js';

export interface CreateOneUserByEmailAddressInput {
    databaseAdapter: Database.Adapter;
    emailAdapter: Email.EmailAdapter;
    emailRendererAdapter: Email.EmailRendererAdapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: CreateOneUserByEmailAddressRequest;
}

export type CreateOneUserByEmailAddressRequest = CreateOneUserRequest & { emailAddress: string; password: string };

export async function createOneByEmailAddress({
    databaseAdapter,
    emailAdapter,
    emailRendererAdapter,
    logger,
    context,
    request,
}: CreateOneUserByEmailAddressInput): Promise<boolean> {
    const userId: string = createNanoId();

    // const imageId: string = nanoid();
    // const profilePicture: FileUpload = await (request.profilePicture as any);

    const success: boolean = await databaseAdapter.userRepository.insertOne({
        userId: userId,
        isLocked: false,
        emailAddress: request.emailAddress,
        phoneNumber: undefined,
        password: bcrypt.hashSync(request.password, bcrypt.genSaltSync()),
        failedSignInAttempts: 0,
        firstName: request.firstName,
        lastName: request.lastName,
        language: request.language,
        gender: request.gender,
        birthDate: request.birthDate,
        profilePictureUrl: undefined,
        acceptedPrivacyPolicy: new Date(),
        acceptedTerms: new Date(),
        createdAt: new Date(),
    });

    if (!success) return false;

    const emailSuccess: boolean = await createOneEmailAddressUpdate({
        databaseAdapter,
        emailAdapter,
        emailRendererAdapter,
        logger,
        context: { ...context, userCreation: true },
        request: { userId, emailAddress: request.emailAddress },
    });

    if (!emailSuccess) return false;

    // if (profilePicture) await this.imageService.saveProfilePicture(profilePicture.createReadStream(), imageId);

    return success;
}
