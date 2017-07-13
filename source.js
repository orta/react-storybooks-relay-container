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
          '@@RelayModernEnvironment': true,
          unstable_internal: {
            areEqualSelectors: () => {},
            createFragmentSpecResolver: () => ({
                resolve: () => (this.props.props),
                dispose: () => {},
                setProps: () => {}
            }),
            createOperationSelector: () => ({ fragment: {} }),
            getDataIDsFromObject: () => {},
            getFragment: () => {},
            getOperation: () => {},
            getSelector: () => {},
            getSelectorList: () => {},
            getSlectorsFromObject: () => {},
            getVariablesFromObject: () => {}
          },
          lookup: () => ({ data: {} }),
          retain: () => {},
          sendQuery: () => {},
          streamQuery: () => {},
          subscribe: () => {},
          applyMutation: () => {},
          sendMutation: (input: {
              onCompleted?: (?any, ?any) => void,
              optimisticResponse?: any,
              expectedError?: any
          }) => {
              const { onCompleted, optimisticResponse, expectedError } = input;
              if (onCompleted) {
                onCompleted(optimisticResponse, expectedError);
              }
          },
          forceFetch: () => ({ abort: () => {} }),
          getFragmentResolver: () => {},
          getStoreData: () => {},
          primeCache: () => ({ abort: () => {} })
        },
        refetch: () => {},
        variables: this.props.variables || {}
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
