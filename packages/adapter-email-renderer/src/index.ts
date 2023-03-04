import { Email, Logger } from '@people-eat/server-domain';

export interface CreateEmailRendererInput {
    logger: Logger.Adapter;
}

export function createEmailRenderer(_input: CreateEmailRendererInput): Email.EmailRendererAdapter {
    return {
        renderReceivedBookingRequestEmail(): Email.RenderedEmail {
            return { subject: '', body: '' };
        },
        renderVerifyEmailAddressEmail(): Email.RenderedEmail {
            return { subject: 'Verify your email address', body: 'Lorem Ipsum' };
        },
        renderWelcomeEmail(): Email.RenderedEmail {
            return { subject: '', body: '' };
        },
        renderForgotPasswordEmail(): Email.RenderedEmail {
            return { subject: '', body: '' };
        },
    };
}
