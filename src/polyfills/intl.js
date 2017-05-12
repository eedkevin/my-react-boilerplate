import {addLocaleData} from 'react-intl';
import zhLocaleData from 'react-intl/locale-data/zh';
import areIntlLocalesSupported from 'intl-locales-supported';

const localesMyAppSupports = [
  'en',
  'zh-Hans',
  'zh-Hant',
];

if (global.Intl) {
  // Determine if the built-in `Intl` has the locale data we need.
  if (!areIntlLocalesSupported(localesMyAppSupports)) {
    // `Intl` exists, but it doesn't have the data we need, so load the
    // polyfill and replace the constructors with need with the polyfill's.
    const IntlPolyfill = require('intl');
    Intl.NumberFormat   = IntlPolyfill.NumberFormat;
    Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
  }
} else {
  // No `Intl`, so use and load the polyfill.
  global.Intl = require('intl');
}


addLocaleData(zhLocaleData);
