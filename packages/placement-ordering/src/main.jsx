import PlacementOrdering from './placement-ordering'
import React from 'react';
import withContext from './with-context';

class Main extends React.Component {

  render() {
    const { model, session, onSessionChange } = this.props;
    return <PlacementOrdering
      model={model}
      session={session}
      onSessionChange={onSessionChange} />
  }
}

export default withContext(Main);

