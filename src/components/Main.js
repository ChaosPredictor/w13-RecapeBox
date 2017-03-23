require('normalize.css/normalize.css');
require('styles/Main.css');

import React from 'react';
import Modal from 'react-modal';

var DATA = [{name:"pi", id:0}, {name:"cheaps", id:1}, {name:"fdgd", id:2}]

const appElement = document.getElementById('your-app-element');

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

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
			recipes: DATA,
      modalIsOpen: false
		};
		this.myFunction = this.myFunction.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.refs.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }
	
	myFunction() {
		var temp = this.state.recipes.slice()
		temp.push({name:"newOne",id:4})
		this.setState({ recipes: temp, modalIsOpen: false })
	}

	render() {
    return (
      <div className="main">
				<RecipesTable recipes={this.state.recipes} />
        <button onClick={this.myFunction}>Add</button>
        <button onClick={this.openModal}>Open Modal</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <h2 ref="subtitle">Hello</h2>
          <input />
          <form>
						<button onClick={this.closeModal}>Close</button>
            <button onClick={this.myFunction}>Add</button>
          </form>
        </Modal>
      </div>
    );
  }
}

export default MainComponent;
