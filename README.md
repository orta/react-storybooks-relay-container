# react-storybooks-relay-container

When writing React Storybook stories that have components that rely on relay, you can _very_ easily run those components against your real API. However, doing it against stubbed data can be tricky. 

This module adds a container that will pass through your API responses as though they were the real relay data.

So your stories looks like this:

```js
import React from 'react';

import { storiesOf } from '@kadira/react-native-storybook';
import StubContainer from "react-storybooks-relay-container";

import ArtistHeader from '../lib/components/artist/header';

storiesOf('Artist Header')
  .add('Handles having no birthday in data', () => {
    const props = {
      artist: {
        name : 'Example Data',
        nationality: 'UK',
        counts : { follows: 12 }

      }
    };
    return <StubContainer Component={ArtistHeader} props={props}/>;
  })
```  

It looks like this behind the scenes:

``` js
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
          sendMutation: ({ onCompleted, optimisticResponse, expectedError }) => {
            onCompleted(optimisticResponse, expectedError)
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
```
