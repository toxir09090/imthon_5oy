import { SetMetadata } from '@nestjs/common';
export const PROTECTED_KEY = 'protected';
export const Protected = (isProtected: boolean = false) =>
  SetMetadata(PROTECTED_KEY, isProtected);
