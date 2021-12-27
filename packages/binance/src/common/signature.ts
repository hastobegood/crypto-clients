import crypto from 'crypto';

export class Signature {
  constructor(private apiKey: string, private secretKey: string) {}

  getApiKey(): string {
    return this.apiKey;
  }

  getSignature(queryParameters: string): string {
    const hmac = crypto.createHmac('sha256', this.secretKey);
    const result = hmac.update(queryParameters);

    return result.digest('hex');
  }
}
