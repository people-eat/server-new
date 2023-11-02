import { Authorization, type CookLanguage, type DataSource, type Email, type Logger, type PaymentProvider } from '../../..';
import { type DBUser } from '../../../data-source';
import { type NanoId } from '../../shared';
import { type CreateOneCookRequest } from '../CreateOneCookRequest';

export interface CreateOneCookInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    emailAdapter: Email.Adapter;
    paymentAdapter: PaymentProvider.Adapter;
    context: Authorization.Context;
    request: CreateOneCookRequest & { cookId: NanoId };
}

// eslint-disable-next-line max-statements
export async function createOne({
    dataSourceAdapter,
    logger,
    emailAdapter,
    paymentAdapter,
    context,
    request,
}: CreateOneCookInput): Promise<boolean> {
    const {
        cookId,
        isVisible,
        name,
        location,
        rank,
        biography,
        travelExpenses,
        maximumTravelDistance,
        minimumPrice,
        maximumPrice,
        minimumParticipants,
        maximumParticipants,
        languageIds,
    } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId: cookId });

    const success: boolean = await dataSourceAdapter.cookRepository.insertOne({
        cookId,
        isLocked: false,
        isVisible,
        name,
        latitude: location.latitude,
        longitude: location.longitude,
        city: location.text ?? '',
        rank,
        biography: biography.trim(),
        travelExpenses,
        maximumTravelDistance,
        minimumPrice,
        maximumPrice,
        minimumParticipants,
        maximumParticipants,
        payoutMethods: [],
        createdAt: new Date(),
    });

    const user: DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ userId: cookId });

    if (!user) return false;

    await emailAdapter.sendToOne(
        'PeopleEat',
        'contact@people-eat.com',
        'Neue Koch Registrierung',
        `${user.firstName} ${user.lastName} hat sich als PeopleEat Koch registriert`,
    );

    if (languageIds) {
        const languageSuccess: boolean = await dataSourceAdapter.cookLanguageRepository.insertMany(
            languageIds.map((languageId: NanoId): CookLanguage => ({ languageId, cookId })),
        );

        if (!languageSuccess) return false;
    }

    if (!user.emailAddress) return success;

    const connectedAccountResult: { accountId: string } | undefined = await paymentAdapter.STRIPE.createConnectedAccount({
        emailAddress: user.emailAddress,
    });

    if (!connectedAccountResult) return false;

    await dataSourceAdapter.cookRepository.updateOne(
        { cookId },
        { payoutMethods: [{ provider: 'STRIPE', stripeAccountId: connectedAccountResult.accountId }] },
    );

    const connectedAccountUrlResult: { url: string } | undefined = await paymentAdapter.STRIPE.createConnectedAccountUrl({
        accountId: connectedAccountResult.accountId,
    });

    if (!connectedAccountUrlResult) return false;

    logger.debug(`Stripe connected account url: ${connectedAccountUrlResult.url}`);

    return success;
}
