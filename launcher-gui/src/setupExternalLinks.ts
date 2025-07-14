import $ from 'jquery';
import { openUrl } from './lib/openUrl';

export function setupExternalLinks() {
  $(document).on('click', 'a[href^="http"]', function (event) {
    event.preventDefault();
    const url = $(this).attr('href');
    if (url) {
      openUrl(url);
    }
  });
}
