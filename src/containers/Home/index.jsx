import { asyncComponent } from 'react-async-component';
import asyncInjector from '../../utils/asyncInjector';

import reducer from '../I18nProvider/reducer';
import sagas from '../I18nProvider/sagas';

export default (store) => {
  const { injectReducer, injectSagas } = asyncInjector(store);
  return asyncComponent({
    resolve: () => {
      injectReducer('i18n', reducer);
      injectSagas(sagas);
      return import('./Home');
    },
  });
}
