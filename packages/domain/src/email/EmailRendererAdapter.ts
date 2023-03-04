export interface RenderReceivedBookingRequestEmailInput {
    senderId: string;
}

export interface RenderedEmail {
    subject: string;
    body: string;
}

export interface EmailRendererAdapter {
    renderReceivedBookingRequestEmail: (request: RenderReceivedBookingRequestEmailInput) => RenderedEmail;
    renderVerifyEmailAddressEmail: () => RenderedEmail;
    renderWelcomeEmail: () => RenderedEmail;
    renderForgotPasswordEmail: () => RenderedEmail;
}
