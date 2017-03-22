require('normalize.css/normalize.css');
require('styles/Title.css');

import React from 'react';

class TitleComponent extends React.Component {
  render() {
    return (
      <div>
				<h1 className="title"> Template Web </h1>
      </div>
    );
  }
}

export default TitleComponent;
