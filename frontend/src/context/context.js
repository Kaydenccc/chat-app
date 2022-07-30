import React from 'react';
const Context = React.createContext();
const Provider = Context.Provider;

// FUNGSI PROVIDER
function GlobalProvider(Children) {
  return class Parent extends React.Component {
    state = {
      msg: 'This is message',
    };

    dispatch = (action) => {
      switch (action.type) {
        case 'GET_MESSAGE':
          return console.log('OK');
        default:
      }
    };
    render() {
      return (
        <Provider value={this.state}>
          <Children />
        </Provider>
      );
    }
  };
}

export default GlobalProvider;

// FUNGSI CONSUMER
