/* @flow */
'use strict';

import React from 'react';
import PropTypes from 'prop-types';

// Emulates a Relay-compatible container, passing the data in directly.
// It's hard to know how well this can work for complicated examples. However,
// it's worked well enough so far - ./

export default class StubbedRelayContainer extends React.Component {
  // Provide a stubbed context for child componentes
  getChildContext() {
    return {
      relay: {
        environment: {
          applyMutation: () => {},
          sendMutation: () => {},
          forceFetch: () => ({ abort: () => {} }),
          getFragmentResolver: () => {},
          getStoreData: () => {},
          primeCache: () => ({ abort: () => {} })
        },
        variables: {}
      },
      route: { name: 'string', params: {}, useMockData: true, queries: {} },
      useFakeData: true
    };
  }

  // Directly render the child, and add the data
  render() {
    return <this.props.Component {...this.props.props} />;
  }

  // Needed to pass the isRelayContainer validation step
  getFragmentNames() {}
  getFragment() {}
  hasFragment() {}
  hasVariable() {}
}

StubbedRelayContainer.childContextTypes = {
    relay: PropTypes.object,
    route: PropTypes.object,
    useFakeData: PropTypes.bool
};
