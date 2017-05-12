import React from 'react';
import offlinePlugin from 'offline-plugin/runtime';
import { AppContainer } from 'react-hot-loader'

import './polyfills/intl';

if (process.env.NODE_ENV === 'production') {
  offlinePlugin.install();
}

async function startApp() {
  await import('./app');
}

startApp();
