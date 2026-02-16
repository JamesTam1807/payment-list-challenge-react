// Note: This logger is placed in utils folder for simplicity.
// Production logging should be done in its own dedicated module.

import { Logger } from '@open-draft/logger';

const base = new Logger('payment-service');

export const logger = {
  info: (msg: string, metadata?: object) => base.info(msg, metadata ?? {}),
  error: (msg: string, metadata?: object) => base.error(msg, metadata ?? {}),
  warn: (msg: string, metadata?: object) => base.warning(msg, metadata ?? {}),
};
