import React from 'react';
const Consumer = React.createContext().Consumer;
export default function GlobalConsumer(Children) {
  return class ParentConsumer extends React.Component {
    render() {
      return (
        <Consumer>
          {(value) => {
            <Children {...value} />;
          }}
        </Consumer>
      );
    }
  };
}
