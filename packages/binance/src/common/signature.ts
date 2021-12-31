import crypto from 'crypto';

export const sign = (queryParameters: string, secretKey: string): string => {
  const hmac = crypto.createHmac('sha256', secretKey);
  const result = hmac.update(queryParameters);

  return `signature=${result.digest('hex')}`;
};
