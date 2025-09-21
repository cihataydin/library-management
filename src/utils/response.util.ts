import { IFormattedResponse } from '@/interfaces';

export const formatResponse = (
  data?: any,
  pagination?: any,
): IFormattedResponse => ({
  data,
  pagination,
});
