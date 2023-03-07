import { Email, Logger } from '@people-eat/server-domain';

export interface CreateEmailRendererInput {
    logger: Logger.Adapter;
}

export function createEmailRenderer({ logger }: CreateEmailRendererInput): Email.EmailRendererAdapter {
    logger.debug('initialized email renderer');
    return {
        renderReceivedBookingRequestEmail(): Email.RenderedEmail {
            return { subject: '', body: '' };
        },
        renderVerifyEmailAddressEmail(): Email.RenderedEmail {
            return { subject: '', body: '' };
        },
        renderWelcomeEmail(): Email.RenderedEmail {
            return { subject: '', body: '' };
        },
        renderForgotPasswordEmail(): Email.RenderedEmail {
            return { subject: '', body: '' };
        },
    };
}
