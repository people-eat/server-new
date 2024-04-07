export interface WelcomeInput {
    webAppUrl: string;
}

export function welcome({ webAppUrl }: WelcomeInput): string {
    return `
    <!DOCTYPE html>
    <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">

    <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0"><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
        <style>
            * {
                box-sizing: border-box;
            }

            body {
                margin: 0;
                padding: 0;
            }

            a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: inherit !important;
            }

            #MessageViewBody a {
                color: inherit;
                text-decoration: none;
            }

            p {
                line-height: inherit
            }

            .desktop_hide,
            .desktop_hide table {
                mso-hide: all;
                display: none;
                max-height: 0px;
                overflow: hidden;
            }

            .image_block img+div {
                display: none;
            }

            @media (max-width:620px) {
                .social_block.desktop_hide .social-table {
                    display: inline-block !important;
                }

                .mobile_hide {
                    display: none;
                }

                .row-content {
                    width: 100% !important;
                }

                .stack .column {
                    width: 100%;
                    display: block;
                }

                .mobile_hide {
                    min-height: 0;
                    max-height: 0;
                    max-width: 0;
                    overflow: hidden;
                    font-size: 0px;
                }

                .desktop_hide,
                .desktop_hide table {
                    display: table !important;
                    max-height: none !important;
                }

                .row-3 .column-1 {
                    padding: 5px 0 5px 30px !important;
                }
            }
        </style>
    </head>

    <body style="background-color: #ff6433; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
        <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ff6433;">
            <tbody>
                <tr>
                    <td>
                        <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                            <tbody>
                                <tr>
                                    <td>
                                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff; background-position: center top; color: #000; width: 600px; margin: 0 auto;" width="600">
                                            <tbody>
                                                <tr>
                                                    <td class="column column-1" width="100%" style="font-weight: 400; text-align: left; mso-table-lspace: 0pt; mso-table-rspace: 0pt; padding-bottom: 10px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                        <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                            <tr>
                                                                <td class="pad" style="padding-top:10px;width:100%;padding-right:0px;padding-left:0px;">
                                                                    <div class="alignment" align="center" style="line-height:10px"><a href="www.people-eat.com" target="_blank" style="outline:none" tabindex="-1"><img src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/1068458_1053702/1.png" style="display: block; height: auto; border: 0; max-width: 270px; width: 100%;" width="270"></a></div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-size: auto;">
                            <tbody>
                                <tr>
                                    <td>
                                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-size: auto; background-color: #fff; color: #000; width: 600px; margin: 0 auto;" width="600">
                                            <tbody>
                                                <tr>
                                                    <td class="column column-1" width="100%" style="font-weight: 400; text-align: left; mso-table-lspace: 0pt; mso-table-rspace: 0pt; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                        <table class="heading_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                            <tr>
                                                                <td class="pad" style="padding-bottom:5px;padding-top:25px;text-align:center;width:100%;">
                                                                    <h1 style="margin: 0; color: #000000; direction: ltr; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size: 36px; font-weight: normal; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><strong>Willkommen bei PeopleEat!</strong></h1>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table class="paragraph_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                            <tr>
                                                                <td class="pad" style="padding-bottom:20px;padding-left:30px;padding-right:30px;padding-top:20px;">
                                                                    <div style="color:#000000;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:18px;font-weight:400;line-height:200%;text-align:left;mso-line-height-alt:36px;">
                                                                        <p style="margin: 0;">Vielen Dank für die Registrierung und herzlich willkommen bei PeopleEat. Wir freuen uns, dich auf unserer Plattform begrüßen zu dürfen und außergewöhnliche Erlebnismomente mit dir und deinen Lieben in Zukunft zu teilen.&nbsp;</p>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table class="image_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                            <tr>
                                                                <td class="pad" style="padding-bottom:5px;padding-left:20px;padding-right:20px;padding-top:5px;width:100%;">
                                                                    <div class="alignment" align="center" style="line-height:10px"><img src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/1068458_1053702/Erlebe%20die%20Zeit%20mit%20deinen%20Freunden%20auf%20ein%20neue%20Art%20und%20Weise%20kennen.png" style="display: block; height: auto; border: 0; max-width: 560px; width: 100%;" width="560" alt="Erlebnisse mit Freunden teilen" title="Erlebnisse mit Freunden teilen"></div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                            <tbody>
                                <tr>
                                    <td>
                                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff; color: #000; border-radius: 0; width: 600px; margin: 0 auto;" width="600">
                                            <tbody>
                                                <tr>
                                                    <td class="column column-1" width="100%" style="font-weight: 400; text-align: left; mso-table-lspace: 0pt; mso-table-rspace: 0pt; padding-bottom: 5px; padding-left: 30px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                        <table class="heading_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                            <tr>
                                                                <td class="pad">
                                                                    <h1 style="margin: 0; color: #000000; direction: ltr; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size: 34px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder">Erinnerungen die bleiben</span></h1>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table class="paragraph_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                            <tr>
                                                                <td class="pad">
                                                                    <div style="color:#000000;direction:ltr;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:18px;font-weight:400;letter-spacing:0px;line-height:180%;text-align:left;mso-line-height-alt:32.4px;">
                                                                        <p style="margin: 0; margin-bottom: 16px;">Wir sind davon überzeugt, dass die aufregendsten und emotionalsten Gespräche mit deinen Lieben gemeinsam am Tisch stattfinden. Die Zeit mit der Familie, den Freunden, Arbeitskollegen, dem Partner oder der Partnerin ist wertvoll, deshalb sollten wir sie in vollen Zügen genießen.&nbsp;</p>
                                                                        <p style="margin: 0;">Essen verbindet und wir bringen euch an eurem Lieblingsorten zusammen.</p>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                            <tbody>
                                <tr>
                                    <td>
                                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff; color: #000; border-radius: 0; width: 600px; margin: 0 auto;" width="600">
                                            <tbody>
                                                <tr>
                                                    <td class="column column-1" width="100%" style="font-weight: 400; text-align: left; mso-table-lspace: 0pt; mso-table-rspace: 0pt; padding-bottom: 5px; padding-left: 30px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                        <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                            <tr>
                                                                <td class="pad" style="padding-bottom:5px;padding-right:20px;padding-top:5px;width:100%;">
                                                                    <div class="alignment" align="center" style="line-height:10px"><img src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/1068458_1053702/Genie%C3%9Fe%20die%20Zeit%20mit%20deinen%20Lieben%20.png" style="display: block; height: auto; border: 0; max-width: 550px; width: 100%;" width="550" alt="Erlebnisse mit Freunden teilen" title="Erlebnisse mit Freunden teilen"></div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table class="heading_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                            <tr>
                                                                <td class="pad">
                                                                    <h1 style="margin: 0; color: #000000; direction: ltr; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size: 33px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder">Werde Gastgeber aus Leidenschaft</span></h1>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table class="paragraph_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                            <tr>
                                                                <td class="pad">
                                                                    <div style="color:#101112;direction:ltr;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:18px;font-weight:400;letter-spacing:0px;line-height:180%;text-align:left;mso-line-height-alt:32.4px;">
                                                                        <p style="margin: 0;">Ab heute stehen dir bei PeopleEat zahlreiche aufregende Möglichkeiten offen, um unvergessliche Erlebnismomente mit deinen Lieben zu teilen.&nbsp;</p>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table><!--[if mso]><style>#list-r3c0m3 ul{margin: 0 !important; padding: 0 !important;} #list-r3c0m3 ul li{mso-special-format: bullet;}#list-r3c0m3 .levelOne li {margin-top: 0 !important;} #list-r3c0m3 .levelOne {margin-left: -20px !important;}#list-r3c0m3 .levelTwo li {margin-top: 0 !important;} #list-r3c0m3 .levelTwo {margin-left: 10px !important;}#list-r3c0m3 .levelThree li {margin-top: 0 !important;} #list-r3c0m3 .levelThree {margin-left: 40px !important;}</style><![endif]-->
                                                        <table class="list_block block-4" id="list-r3c0m3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                            <tr>
                                                                <td class="pad" style="padding-bottom:10px;padding-right:30px;padding-top:10px;">
                                                                    <div class="levelOne" style="margin-left: 0;">
                                                                        <ul class="leftList" start="1" style="margin-top: 0; margin-bottom: 0; padding: 0; padding-left: 20px; font-weight: 400; text-align: left; color: #5f5f5f; direction: ltr; font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; font-size: 18px; letter-spacing: 0; line-height: 120%; mso-line-height-alt: 21.599999999999998px; list-style-type: disc;">
                                                                            <li style="margin-bottom: 0; text-align: left;"><span style="color: #ff6433;"><strong>Entdecke täglich neue Menükreationen 🍝</strong></span><br><br>Entdecke täglich neue Menükreationen in deiner Nähe und mache diese zu deinem nächsten Anlass mit deinen Lieben an deinem Lieblingsort.&nbsp;<br><br></li>
                                                                            <li style="margin-bottom: 0; text-align: left;"><strong><span style="color: #ff6433;">Menüs nach deinen Präferenzen 🌱</span></strong><br><br>Stimme dich direkt mit deinem Privatkoch:in ab und genieße das Menü nach deinen individuellen Präferenzen, die perfekt auf deine Vorlieben zugeschnitten sind.&nbsp;<br><br></li>
                                                                            <li style="margin-bottom: 0; text-align: left;"><strong><span style="color: #ff6433;">Bewertungen und Empfehlungen 🌟</span></strong><br><br>Teile deine Erfahrungen mit Privatköchen und lasse dich von den Erlebnissen anderer Gastgeber inspirieren.<br><br></li>
                                                                            <li style="margin-bottom: 0; text-align: left;"><strong><span style="color: #ff6433;">Support 24/7 📞</span></strong><br><br>Bei Fragen zu deiner Buchung oder Anliegen steht wir dir jederzeit zur Verfügung. Du erreichst uns unter:<span style="color: #ff6433;"><br><a href="mailto:contact@people-eat.com" target="_blank" title="contact@people-eat.com" style="text-decoration: underline; color: #ff6433;" rel="noopener">contact@people-eat.com</a></span></li>
                                                                        </ul>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="row row-5" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                            <tbody>
                                <tr>
                                    <td>
                                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff; color: #000; width: 600px; margin: 0 auto;" width="600">
                                            <tbody>
                                                <tr>
                                                    <td class="column column-1" width="100%" style="font-weight: 400; text-align: left; mso-table-lspace: 0pt; mso-table-rspace: 0pt; padding-left: 30px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                        <table class="paragraph_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                            <tr>
                                                                <td class="pad" style="padding-bottom:20px;padding-left:30px;padding-right:30px;padding-top:20px;">
                                                                    <div style="color:#000000;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:18px;font-weight:400;line-height:180%;text-align:left;mso-line-height-alt:32.4px;">
                                                                        <p style="margin: 0;">Wir sind stolz darauf, dich als Teil unserer Plattform zu haben, und freuen uns auf deine ersten Entdeckungen und Erfahrungen.</p>
                                                                        <p style="margin: 0;">&nbsp;</p>
                                                                        <p style="margin: 0;">Wenn du weitere Informationen oder Unterstützung benötigst, zögere nicht uns zu kontaktieren.&nbsp;</p>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table class="button_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                            <tr>
                                                                <td class="pad">
                                                                    <div class="alignment" align="center">
                                                                        <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" style="height:50px;width:246px;v-text-anchor:middle;" arcsize="120%" stroke="false" fillcolor="#ff6433"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#ffffff; font-family:Arial, sans-serif; font-size:20px"><![endif]-->
                                                                            <div style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#ff6433;border-radius:60px;width:auto;border-top:0px solid transparent;font-weight:400;border-right:0px solid transparent;border-bottom:0px solid transparent;border-left:0px solid transparent;padding-top:5px;padding-bottom:5px;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:20px;text-align:center;mso-border-alt:none;word-break:keep-all;">
                                                                                <span style="padding-left:20px;padding-right:20px;font-size:20px;display:inline-block;letter-spacing:normal;">
                                                                                    <a href="${webAppUrl}/chefs" style="word-break: break-word; line-height: 32px; text-decoration: none; color: #f8f8f8;">
                                                                                        Privatköche entdecken
                                                                                    </a>
                                                                                </span>
                                                                            </div>
                                                                        <!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table class="divider_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                            <tr>
                                                                <td class="pad">
                                                                    <div class="alignment" align="center">
                                                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                            <tr>
                                                                                <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #dddddd;"><span>&#8202;</span></td>
                                                                            </tr>
                                                                        </table>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table class="paragraph_block block-4" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                            <tr>
                                                                <td class="pad">
                                                                    <div style="color:#101112;direction:ltr;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:18px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:21.599999999999998px;">
                                                                        <p style="margin: 0;">Mit freundlichen Grüßen,<br><span style="font-family: inherit;">Dein PeopleEat-Team ❤️<br></span><span style="color: #ff6433;"><a href="http://www.people-eat.com" target="_blank" style="text-decoration: underline; color: #7747FF;" rel="noopener">www.people-eat.com</a></span></p>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table class="image_block block-5" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                            <tr>
                                                                <td class="pad" style="padding-bottom:35px;padding-top:10px;width:100%;">
                                                                    <div class="alignment" align="center" style="line-height:10px"><img src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/4016/divider.png" style="display: block; height: auto; border: 0; max-width: 541px; width: 100%;" width="541"></div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table class="paragraph_block block-6" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                            <tr>
                                                                <td class="pad">
                                                                    <div style="color:#07113e;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:18px;line-height:180%;text-align:center;mso-line-height-alt:32.4px;">
                                                                        <p style="margin: 0; word-break: break-word;"><span>Folge uns 📲</span></p>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table class="social_block block-7" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                            <tr>
                                                                <td class="pad" style="padding-bottom:15px;padding-left:15px;padding-right:15px;padding-top:10px;text-align:center;">
                                                                    <div class="alignment" align="center">
                                                                        <table class="social-table" width="92px" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;">
                                                                            <tr>
                                                                                <td style="padding:0 7px 0 7px;"><a href="https://www.linkedin.com/company/peopleeat" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-dark-gray/linkedin@2x.png" width="32" height="32" alt="LinkedIn" title="LinkedIn" style="display: block; height: auto; border: 0;"></a></td>
                                                                                <td style="padding:0 7px 0 7px;"><a href="https://instagram.com/peopleeat_official/" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-dark-gray/instagram@2x.png" width="32" height="32" alt="Instagram" title="Instagram" style="display: block; height: auto; border: 0;"></a></td>
                                                                            </tr>
                                                                        </table>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="row row-6" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                            <tbody>
                                <tr>
                                    <td>
                                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff; background-position: center top; color: #000; width: 600px; margin: 0 auto;" width="600">
                                            <tbody>
                                                <tr>
                                                    <td class="column column-1" width="100%" style="font-weight: 400; text-align: left; mso-table-lspace: 0pt; mso-table-rspace: 0pt; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                        <table class="text_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                            <tr>
                                                                <td class="pad" style="padding-bottom:15px;padding-left:5px;padding-right:5px;">
                                                                    <div style="font-family: sans-serif">
                                                                        <div class style="font-size: 12px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #262b30; line-height: 1.2;">
                                                                            <p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 16.8px;"><span style="font-size:12px;">© 2023 PeopleEat UG | Montgolfier-Allee-24, Frankfurt am Main 60486</span></p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table><!-- End -->
    </body>

    </html>
    `;
}
