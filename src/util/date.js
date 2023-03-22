import { format, register } from 'timeago.js';
import koLocale from 'timeago.js/lib/lang/ko';

register('ko', koLocale);

export default function formatAgo(time, lang) {
  return format(time, lang);
}
