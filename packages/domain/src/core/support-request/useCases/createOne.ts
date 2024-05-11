import { Authorization } from '../../..';
import { type DBUser } from '../../../data-source';
import { createNanoId } from '../../../utils/createNanoId';
import { type Runtime } from '../../Runtime';
import { type NanoId } from '../../shared';
import { type CreateOneSupportRequestRequest } from '../CreateOneSupportRequestRequest';
import { type SupportRequest } from '../SupportRequest';

export interface CreateOneSupportRequestInput {
    runtime: Runtime;
    context: Authorization.Context;
    request: CreateOneSupportRequestRequest & { userId: NanoId };
}

export async function createOne({ runtime, context, request }: CreateOneSupportRequestInput): Promise<boolean> {
    const { dataSourceAdapter, logger } = runtime;

    const { userId, bookingRequestId, subject, message } = request;

    await Authorization.canMutateUserData({ context, dataSourceAdapter, logger, userId });

    const supportRequestId: NanoId = createNanoId();

    const supportRequest: SupportRequest = {
        supportRequestId,
        userId,
        bookingRequestId,
        subject,
        message,
        createdAt: new Date(),
    };

    const success: boolean = await dataSourceAdapter.supportRequestRepository.insertOne(supportRequest);

    if (!success) {
        logger.error(`Was not able to persist support request with parameters. ${supportRequest}`);
        return false;
    }

    const user: DBUser | undefined = await dataSourceAdapter.userRepository.findOne({ userId });

    if (!user) return true;

    runtime.emailAdapter
        .sendToMany(
            'Neue Support Anfrage',
            runtime.notificationEmailAddresses,
            `von ${user.firstName} ${user.lastName}`,
            `Neue Support Anfrage von <b>${user.firstName} ${user.lastName}</b><br/><br/><b>Titel:</b> ${subject}<br/><b>Nachricht:</b> ${message}<br/><br/><br/>supportRequestId: ${supportRequestId}`,
        )
        .then(() => undefined)
        .catch(() => undefined);

    return true;
}
