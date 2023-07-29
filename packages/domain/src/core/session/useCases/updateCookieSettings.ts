import { type Authorization, type DataSource, type Logger } from '../../..';

export interface UpdateCookieSettingsInput {
    dataSourceAdapter: DataSource.Adapter;
    logger: Logger.Adapter;
    context: Authorization.Context;
    request: { cookieSettings: UpdateCookieSettingsRequest };
}

export interface UpdateCookieSettingsRequest {
    sessionCookie?: boolean;
    googleAnalytics?: boolean;
}

export async function updateCookieSettings({ dataSourceAdapter, context, request }: UpdateCookieSettingsInput): Promise<boolean> {
    const { cookieSettings } = request;

    const success: boolean = await dataSourceAdapter.sessionRepository.updateOne({ sessionId: context.sessionId }, { cookieSettings });

    if (!success) return false;

    return true;
}
