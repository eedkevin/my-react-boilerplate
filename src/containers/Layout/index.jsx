import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeLocale } from '../I18nProvider/actions';

function mapDispatchToProps(dispatch) {
  return {
    changeLocale: (locale) => dispatch(changeLocale(locale)),
  };
}

class Layout extends PureComponent {
  handleChangeLocale = (event) => {
    this.props.changeLocale(event.target.getAttribute('data-value'));
  }
  render() {
    const { children } = this.props;
    return (
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/hello">Hello</Link></li>
        </ul>
        <div>
          <button data-value="en" onClick={this.handleChangeLocale}>
            English
          </button>
          <button data-value="zh-Hans" onClick={this.handleChangeLocale}>
            Simplified Chinese
          </button>
          <button data-value="zh-Hant" onClick={this.handleChangeLocale}>
            Traditional Chinese
          </button>
        </div>
        {children}
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  changeLocale: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Layout);
