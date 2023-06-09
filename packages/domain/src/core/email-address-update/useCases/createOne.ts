import { Authorization, type DataSource, type Email, type Logger } from '../../..';
import { type DBEmailAddressUpdate } from '../../../data-source';
import { createNanoId } from '../../../utils/createNanoId';
import { type NanoId } from '../../shared';
import { type CreateOneEmailAddressUpdateRequest } from '../CreateOneEmailAddressUpdateRequest';

interface CreateOneEmailAddressUpdateInput {
    dataSourceAdapter: DataSource.Adapter;
    emailAdapter: Email.Adapter;
    logger: Logger.Adapter;
    webAppUrl: string;
    context: Authorization.Context;
    request: CreateOneEmailAddressUpdateRequest;
}

export async function createOne({
    dataSourceAdapter,
    emailAdapter,
    logger,
    webAppUrl,
    context,
    request: { userId, emailAddress },
}: CreateOneEmailAddressUpdateInput): Promise<boolean> {
    await Authorization.canMutateUserData({ dataSourceAdapter, logger, context, userId });

    const emailAddressUpdate: DBEmailAddressUpdate | undefined = await dataSourceAdapter.emailAddressUpdateRepository.findOne({
        emailAddress,
    });

    if (emailAddressUpdate) return false;

    const secret: NanoId = createNanoId();

    const persistingSuccess: boolean = await dataSourceAdapter.emailAddressUpdateRepository.insertOne({
        userId,
        emailAddress,
        secret,
        createdAt: new Date(),
    });

    if (!persistingSuccess) return false;

    const emailSendingSuccess: boolean = await emailAdapter.sendToOne(
        'PeopleEat',
        emailAddress,
        'Verify your email address',
        `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html
          xmlns="http://www.w3.org/1999/xhtml"
          xmlns:v="urn:schemas-microsoft-com:vml"
          xmlns:o="urn:schemas-microsoft-com:office:office"
          lang="en"
        >
          <head>
            <meta name="x-apple-disable-message-reformatting" />
            <meta http-equiv="X-UA-Compatible" />
            <meta charset="utf-8" />
            <meta name="viewport" content="target-densitydpi" ="device-dpi" />
            <meta content="true" name="HandheldFriendly" />
            <meta content="width" ="device-width" name="viewport" />
            <style type="text/css">
              table {
                border-collapse: separate;
                table-layout: fixed;
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
              }
              table td {
                border-collapse: collapse;
              }
              .ExternalClass {
                width: 100%;
              }
              .ExternalClass,
              .ExternalClass p,
              .ExternalClass span,
              .ExternalClass font,
              .ExternalClass td,
              .ExternalClass div {
                line-height: 100%;
              }
              * {
                line-height: inherit;
                text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
                -moz-text-size-adjust: 100%;
                -o-text-size-adjust: 100%;
                -webkit-text-size-adjust: 100%;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
              }
              html {
                -webkit-text-size-adjust: none !important;
              }
              img + div {
                display: none;
                display: none !important;
              }
              img {
                margin: 0;
                padding: 0;
                -ms-interpolation-mode: bicubic;
              }
              h1,
              h2,
              h3,
              p,
              a {
                line-height: 1;
                overflow-wrap: normal;
                white-space: normal;
                word-break: break-word;
              }
              a {
                text-decoration: none;
              }
              h1,
              h2,
              h3,
              p {
                min-width: 100% !important;
                width: 100% !important;
                max-width: 100% !important;
                display: inline-block !important;
                border: 0;
                padding: 0;
                margin: 0;
              }
              a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: none !important;
                font-size: inherit !important;
                font-family: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
              }
              a[href^="mailto"],
              a[href^="tel"],
              a[href^="sms"] {
                color: inherit;
                text-decoration: none;
              }
              @media (min-width: 481px) {
                .hd {
                  display: none !important;
                }
              }
              @media (max-width: 480px) {
                .hm {
                  display: none !important;
                }
              }
              [style*="Albert Sans"] {
                font-family: "Albert Sans", BlinkMacSystemFont, Segoe UI, Helvetica Neue,
                  Arial, sans-serif !important;
              }
              @media only screen and (min-width: 481px) {
                .t3 {
                  mso-line-height-alt: 45px !important;
                  line-height: 45px !important;
                  display: block !important;
                }
                .t9 {
                  padding-left: 50px !important;
                  padding-bottom: 60px !important;
                  padding-right: 50px !important;
                }
                .t11 {
                  padding-left: 50px !important;
                  padding-bottom: 60px !important;
                  padding-right: 50px !important;
                  width: 500px !important;
                }
                .t15,
                .t23 {
                  width: 250px !important;
                }
                .t27,
                .t32 {
                  padding-bottom: 25px !important;
                }
                .t33 {
                  line-height: 41px !important;
                  font-size: 39px !important;
                  letter-spacing: -1.56px !important;
                }
                .t37,
                .t42 {
                  padding-bottom: 45px !important;
                }
                .t57 {
                  padding-bottom: 0 !important;
                  width: 287px !important;
                }
                .t62 {
                  padding-bottom: 0 !important;
                }
              }
            </style>
            <!--[if !mso]><!-->
            <link
              href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@500;800&display=swap"
              rel="stylesheet"
              type="text/css"
            />
            <!--<![endif]-->
            <!--[if mso]>
              <style type="text/css">
                div.t3 {
                  mso-line-height-alt: 45px !important;
                  line-height: 45px !important;
                  display: block !important;
                }
                td.t11,
                td.t9 {
                  padding-left: 50px !important;
                  padding-bottom: 60px !important;
                  padding-right: 50px !important;
                }
                td.t15,
                td.t23 {
                  width: 250px !important;
                }
                td.t27,
                td.t32 {
                  padding-bottom: 25px !important;
                }
                h1.t33 {
                  line-height: 41px !important;
                  font-size: 39px !important;
                  letter-spacing: -1.56px !important;
                }
                td.t37,
                td.t42 {
                  padding-bottom: 45px !important;
                }
                td.t57 {
                  padding-bottom: 0 !important;
                  width: 287px !important;
                }
                td.t62 {
                  padding-bottom: 0 !important;
                }
              </style>
            <![endif]-->
            <!--[if mso]>
              <xml>
                <o:OfficeDocumentSettings>
                  <o:AllowPNG />
                  <o:PixelsPerInch>96</o:PixelsPerInch>
                </o:OfficeDocumentSettings>
              </xml>
            <![endif]-->
          </head>
          <body
            class="t0"
            style="
              min-width: 100%;
              margin: 0px;
              padding: 0px;
              background-color: #ffffff;
            "
          >
            <div class="t1" style="background-color: #ffffff">
              <table
                role="presentation"
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                align="center"
              >
                <tr>
                  <td
                    class="t67"
                    style="font-size: 0; line-height: 0; mso-line-height-rule: exactly"
                    valign="top"
                    align="center"
                  >
                    <!--[if mso]>
                      <v:background
                        xmlns:v="urn:schemas-microsoft-com:vml"
                        fill="true"
                        stroke="false"
                      >
                        <v:fill color="#FFFFFF" />
                      </v:background>
                    <![endif]-->
                    <table
                      role="presentation"
                      width="100%"
                      cellpadding="0"
                      cellspacing="0"
                      border="0"
                      align="center"
                    >
                      <tr>
                        <td>
                          <div
                            class="t3"
                            style="
                              mso-line-height-rule: exactly;
                              font-size: 1px;
                              display: none;
                            "
                          >
                            &nbsp;
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <table
                            class="t10"
                            role="presentation"
                            cellpadding="0"
                            cellspacing="0"
                            align="center"
                          >
                            <tr>
                              <!--[if !mso]><!-->
                              <td
                                class="t11"
                                style="
                                  background-color: #f8f8f8;
                                  overflow: hidden;
                                  width: 540px;
                                  padding: 0 30px 40px 30px;
                                "
                              >
                                <!--<![endif]-->
                                <!--[if mso]><td class=t11 style="background-color:#F8F8F8;overflow:hidden;width:600px;padding:0 30px 40px 30px;"><![endif]-->
                                <table
                                  role="presentation"
                                  width="100%"
                                  cellpadding="0"
                                  cellspacing="0"
                                >
                                  <tr>
                                    <td>
                                      <div
                                        class="t54"
                                        style="
                                          mso-line-height-rule: exactly;
                                          mso-line-height-alt: 27px;
                                          line-height: 27px;
                                          font-size: 1px;
                                          display: block;
                                        "
                                      >
                                        &nbsp;
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <table
                                        class="t56"
                                        role="presentation"
                                        cellpadding="0"
                                        cellspacing="0"
                                        align="left"
                                      >
                                        <tr>
                                          <!--[if !mso]><!-->
                                          <td
                                            class="t57"
                                            style="width: 80px; padding: 0 0 50px 0"
                                          >
                                            <!--<![endif]-->
                                            <!--[if mso]><td class=t57 style="width:80px;padding:0 0 50px 0;"><![endif]-->
                                            <div style="font-size: 0px">
                                              <img
                                                class=t63
                                                style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;"
                                                width=287 height=73.53125
                                                src="https://www.people-eat.com/_next/image?url=%2Flogo.svg&w=256&q=75"
                                              />
                                            </div>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div
                                        class="t55"
                                        style="
                                          mso-line-height-rule: exactly;
                                          mso-line-height-alt: 45px;
                                          line-height: 45px;
                                          font-size: 1px;
                                          display: block;
                                        "
                                      >
                                        &nbsp;
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <table
                                        class="t26"
                                        role="presentation"
                                        cellpadding="0"
                                        cellspacing="0"
                                        align="center"
                                      >
                                        <tr>
                                          <!--[if !mso]><!-->
                                          <td
                                            class="t27"
                                            style="width: 600px; padding: 0 0 20px 0"
                                          >
                                            <!--<![endif]-->
                                            <!--[if mso]><td class=t27 style="width:600px;padding:0 0 20px 0;"><![endif]-->
                                            <h1
                                              class="t33"
                                              style="
                                                font-family: BlinkMacSystemFont,
                                                  Segoe UI, Helvetica Neue, Arial,
                                                  sans-serif, 'Albert Sans';
                                                line-height: 28px;
                                                font-weight: 800;
                                                font-style: normal;
                                                font-size: 26px;
                                                text-decoration: none;
                                                text-transform: none;
                                                letter-spacing: -1.04px;
                                                direction: ltr;
                                                color: #191919;
                                                text-align: left;
                                                mso-line-height-rule: exactly;
                                                mso-text-raise: 1px;
                                              "
                                            >
                                              Herzlich Willkommen,
                                            </h1>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <table
                                        class="t46"
                                        role="presentation"
                                        cellpadding="0"
                                        cellspacing="0"
                                        align="center"
                                      >
                                        <tr>
                                          <!--[if !mso]><!-->
                                          <td
                                            class="t47"
                                            style="width: 600px; padding: 0 0 22px 0"
                                          >
                                            <!--<![endif]-->
                                            <!--[if mso]><td class=t47 style="width:600px;padding:0 0 22px 0;"><![endif]-->
                                            <p
                                              class="t53"
                                              style="
                                                font-family: BlinkMacSystemFont,
                                                  Segoe UI, Helvetica Neue, Arial,
                                                  sans-serif, 'Albert Sans';
                                                line-height: 22px;
                                                font-weight: 500;
                                                font-style: normal;
                                                font-size: 14px;
                                                text-decoration: none;
                                                text-transform: none;
                                                letter-spacing: -0.56px;
                                                direction: ltr;
                                                color: #333333;
                                                text-align: left;
                                                mso-line-height-rule: exactly;
                                                mso-text-raise: 2px;
                                              "
                                            >
                                              Vielen Dank für deine Registrierung! Nun
                                              wird es Zeit, deinen nächsten Anlass zu
                                              einen unvergesslichen<span
                                                class="t64"
                                                style="
                                                  color: #ff6433;
                                                  mso-line-height-rule: exactly;
                                                "
                                                > kulinarischen Erlebnismoment </span
                                              >zu machen.
                                            </p>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <table
                                        class="t36"
                                        role="presentation"
                                        cellpadding="0"
                                        cellspacing="0"
                                        align="center"
                                      >
                                        <tr>
                                          <!--[if !mso]><!-->
                                          <td
                                            class="t37"
                                            style="width: 600px; padding: 0 0 34px 0"
                                          >
                                            <!--<![endif]-->
                                            <!--[if mso]><td class=t37 style="width:600px;padding:0 0 34px 0;"><![endif]-->
                                            <p
                                              class="t43"
                                              style="
                                                font-family: BlinkMacSystemFont,
                                                  Segoe UI, Helvetica Neue, Arial,
                                                  sans-serif, 'Albert Sans';
                                                line-height: 22px;
                                                font-weight: 500;
                                                font-style: normal;
                                                font-size: 14px;
                                                text-decoration: none;
                                                text-transform: none;
                                                letter-spacing: -0.56px;
                                                direction: ltr;
                                                color: #333333;
                                                text-align: left;
                                                mso-line-height-rule: exactly;
                                                mso-text-raise: 2px;
                                              "
                                            >
                                              Bestätige den unten stehenden Link und
                                              hole dir deine nächste<span
                                                class="t65"
                                                style="
                                                  color: #ff6433;
                                                  mso-line-height-rule: exactly;
                                                "
                                                > Private Chef Experience </span
                                              >zu dir<span
                                                class="t66"
                                                style="
                                                  color: #ff6433;
                                                  mso-line-height-rule: exactly;
                                                "
                                                > nach Hause </span
                                              >:
                                            </p>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <table
                                        class="t14"
                                        role="presentation"
                                        cellpadding="0"
                                        cellspacing="0"
                                        align="left"
                                      >
                                        <tr>
                                          <!--[if !mso]><!-->
                                          <td
                                            class="t15"
                                            style="
                                              background-color: #ff6433;
                                              overflow: hidden;
                                              width: 353px;
                                              text-align: center;
                                              line-height: 44px;
                                              mso-line-height-rule: exactly;
                                              mso-text-raise: 10px;
                                              border-radius: 44px 44px 44px 44px;
                                            "
                                          >
                                            <!--<![endif]-->
                                            <!--[if mso]><td class=t15 style="background-color:#FF6433;overflow:hidden;width:353px;text-align:center;line-height:44px;mso-line-height-rule:exactly;mso-text-raise:10px;border-radius:44px 44px 44px 44px;"><![endif]-->
                                            <a
                                              href="${webAppUrl}/de/email-address-updates/confirm/${secret}"
                                              class="t21"
                                              style="
                                                display: block;
                                                font-family: BlinkMacSystemFont,
                                                  Segoe UI, Helvetica Neue, Arial,
                                                  sans-serif, 'Albert Sans';
                                                line-height: 44px;
                                                font-weight: 800;
                                                font-style: normal;
                                                font-size: 12px;
                                                text-decoration: none;
                                                text-transform: uppercase;
                                                letter-spacing: 2.4px;
                                                direction: ltr;
                                                color: #f8f8f8;
                                                text-align: center;
                                                mso-line-height-rule: exactly;
                                                mso-text-raise: 10px;
                                              "
                                              target="_blank"
                                            >
                                              Account Bestätigen
                                            </a>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div
                            class="t4"
                            style="
                              mso-line-height-rule: exactly;
                              mso-line-height-alt: 18px;
                              line-height: 18px;
                              font-size: 1px;
                              display: block;
                            "
                          >
                            &nbsp;
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </div>
          </body>
        </html>
        `,
    );

    if (!emailSendingSuccess) return false;

    return true;
}
