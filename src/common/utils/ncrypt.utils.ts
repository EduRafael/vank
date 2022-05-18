import * as bcrypt from 'bcrypt';

export const encrypted = async (phrase: string) =>
  await bcrypt.hash(phrase, 10);

export const compare = async (phrase: string, secret: string) =>
  await bcrypt.compare(phrase, secret);
