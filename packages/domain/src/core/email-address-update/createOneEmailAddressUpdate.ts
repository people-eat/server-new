import { Authorization, Database, Email, Logger } from '../../index.js';

interface CreateOneEmailAddressUpdateInput {
    databaseAdapter: Database.Adapter;
    emailAdapter: Email.EmailAdapter;
    emailRendererAdapter: Email.EmailRendererAdapter;
    logger: Logger.Adapter;
    context: Authorization.Context & { userCreation?: boolean };
    request: {
        userId: string;
        emailAddress: string;
    };
}

export async function createOneEmailAddressUpdate({
    databaseAdapter,
    emailAdapter,
    emailRendererAdapter,
    logger,
    context,
    request: { userId, emailAddress },
}: CreateOneEmailAddressUpdateInput): Promise<boolean> {
    if (!context.userCreation) await Authorization.canMutateUserData({ databaseAdapter, logger, context, userId });

    const { subject, body } = emailRendererAdapter.renderVerifyEmailAddressEmail();

    const success: boolean = await emailAdapter.send('PeopleEat', [emailAddress], subject, body);

    return success;
}
