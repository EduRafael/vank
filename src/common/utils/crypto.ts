import * as bcrypt from 'bcrypt';

export const encrypt = async (param) => await bcrypt.hash(param, 10);

export const compare = async (input, secret) =>
  await bcrypt.compare(input, secret);
