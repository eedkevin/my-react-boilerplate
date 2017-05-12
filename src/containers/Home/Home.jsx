import React, { PureComponent } from 'react';
import { FormattedMessage, FormattedPlural } from 'react-intl';

import messages from './messages';

class Home extends PureComponent {
  render() {
    return (
      <div>
        <FormattedMessage {...messages.greeting} />
        <FormattedPlural value={1} one="message" other="messages" />
      </div>
    );
  }
}

export default Home;
