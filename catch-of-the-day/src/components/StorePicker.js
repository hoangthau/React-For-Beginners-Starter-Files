import React from 'react';

class StorePicker extends React.Component {
  render() {
    return (
      <form action="" className="store-selector">
        <h2>Please enter a store name</h2>
        <input type="text" required placeholder="Store Name" />
        <button type="submit">Visit Store -></button>
      </form>
    );
  }
}

export default StorePicker;
