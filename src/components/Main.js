require('normalize.css/normalize.css');
require('styles/Main.css');

import React from 'react';

var DATA = [{name:"pi"}, {name:"cheaps"}, {name:"fdgd"}]

class ProductRow extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.recipe.name}</td>
      </tr>
    );
  }
}

class RecipesTable extends React.Component {
  constructor(props) {
    super(props);
  //  this.handleInStockInputChange = this.handleInStockInputChange.bind(this);
  }

  render() {
    var rows = [];
    var lastCategory = null;
    console.log(this.props.inStockOnly)
    this.props.recipes.forEach((recipe) => {
      rows.push(<ProductRow recipe={recipe} key={recipe.id} />);
    });
    return (
      <table>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}


class MainComponent extends React.Component {
	
  constructor(props) {
    super(props);
		this.state = {
			recipes: DATA
		};
		this.myFunction = this.myFunction.bind(this);
  }

	myFunction() {
		var temp = this.state.recipes.slice()
		temp.push({name:"newOne"})
		this.setState({ recipes: temp })
	}

	render() {
    return (
      <div className="main">
				<RecipesTable recipes={this.state.recipes} />
				<button onClick={this.myFunction}>Activate Lasers</button>
      </div>
    );
  }
}

export default MainComponent;
