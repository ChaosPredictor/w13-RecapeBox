require('normalize.css/normalize.css');
require('styles/Main.css');

import React from 'react';
import Modal from 'react-modal';

var DATA = [{name:"pi", id:0, ingredients:["first","sencond","thred"]}, {name:"cheaps", id:1, ingredients:["first","sencond","thred"]}, {name:"fdgd", id:2, ingredients:["first","sencond","thred"]}]

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

class Item extends React.Component {
  render() {
    return (
      <tr>
        <td><div>{this.props.recipe.name}</div><div>{this.props.recipe.ingredients[0]}</div></td>
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
    this.props.recipes.forEach((recipe) => {
      rows.push(<Item recipe={recipe} key={recipe.id} />);
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
      modalIsOpen: false,
			lastId: 4,
			title: '',
			body: ''
		};
		this.myFunction = this.myFunction.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
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
		temp.push({name:this.state.title,id:this.state.lastId});
		console.log("last Id; " +  this.state.lastId);
		this.setState({ 
			recipes: temp, 
			modalIsOpen: false 
		});
    this.setState(prevstate => ({
      lastId: prevstate.lastId+1
    }));
	}

  handleTitleChange(e) {
    this.setState({
      title: e.target.value
    });
  }

	handleBodyChange(e) {
    this.setState({
      body: e.target.value
    });
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
          <input 
						value={this.state.title}
						onChange={this.handleTitleChange} />
					<textarea 
						value={this.state.body} 
						onFocus={ this.onFocus } 
						onChange={this.handleBodyChange} />
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
