import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';

function mapStateToProps(state) {
  return {
    messages: state.i18n.messages,
    locale: state.i18n.locale,
  };
}

class I18nProvider extends PureComponent {
  render() {
    const { locale, messages, children } = this.props;
    return (
      <IntlProvider key={locale} locale={locale} messages={messages}>
        {React.Children.only(children)}
      </IntlProvider>
    );
  }
}

I18nProvider.propTypes = {
  messages: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};


export default connect(mapStateToProps)(I18nProvider);
