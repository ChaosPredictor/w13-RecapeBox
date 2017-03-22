require('normalize.css/normalize.css');
require('styles/Footer.css');

import React from 'react';
import { Col } from 'react-bootstrap';

class FooterComponent extends React.Component {
  render() {
    return (
			<footer>
				<Col md={6}>coded by <a class="text-danger" target="_blank" href="https://www.freecodecamp.com/chaospredictor">Chaos Predictor</a></Col>
				<Col md={6} className="rightFooter">souces in <a class="text-danger" target="_blank" href="https://github.com/ChaosPredictor/w12-CamperLeaderboard">GitHub</a></Col>
			</footer>
		);
  }
}

export default FooterComponent;
