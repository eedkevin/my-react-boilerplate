import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  .nav {
    display: inline-block;
  }
`;

export default class Navigator extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      nav: [
        'CORPORATE PROFILE',
        '5+1+OTHERS',
        'OUR TEAM',
        'COLLABORATIONS',
        'CONTACT US',
      ],
      lang: [
        'ENG',
        '繁',
        '简'
      ]
    };
  }

  render() {
    return (
      <StyledDiv>
        <div>
          {this.state.nav.map((key, index) => (<div className="nav" key={index}>{key}</div>))}
        </div>
        <div>
          {this.state.lang.map((key, index) => (<a href={index} key={index}>{key} - </a>))}
        </div>
      </StyledDiv>
    )
  }
}