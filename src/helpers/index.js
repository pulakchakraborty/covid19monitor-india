import { format } from 'date-fns';

export const getCurrentTimestamp = () => {
  return format(new Date(), 'dd.MM.yy hh:mm aaaa zzzz');
};
