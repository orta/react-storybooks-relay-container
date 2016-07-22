# react-storybooks-relay-container

When writing React Storybook stories that have components that rely on relay, you can _very_ easily run those components against your real API. However, doing it against stubbed data can be tricky. 

This module adds a container that will pass through your API responses as though they were the real relay data.

So your stories looks like this:

```js

import React from 'react';
import { View } from 'react-native';

import { storiesOf } from '@kadira/react-native-storybook';

import ArtistHeader from '../lib/components/artist/header';
import StubContainer from "react-storybooks-relay-container";

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

// Emulates a Relay-compatible container, passing the data in directly.
// It's hard to know how well this can work for complicated examples. However,
// it's worked well enough so far - ./

export default class StubbedRelayContainer extends React.Component {
  // Provide a stubbed context for child componentes
  getChildContext() {
    return {
      relay: {
        forceFetch: () => {},
        getFragmentResolver: () => {},
        getStoreData: () => {},
        primeCache: () => {}
      },
      route: { name: 'string', params:{}, useMockData: true, queries: {}}
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

// Expose dummy relay and a fake route
StubbedRelayContainer.childContextTypes = {
  relay: React.PropTypes.object,
  route: React.PropTypes.object
};

```