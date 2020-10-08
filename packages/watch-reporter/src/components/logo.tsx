import { logoΔ } from '@betterer/logger';
import React, { FC } from 'react';
import { Text } from 'ink';

export const Logo: FC = function Logo() {
  const [LOGO] = logoΔ().messages;
  return <Text color="yellowBright">{LOGO}</Text>;
};
