require('normalize.css/normalize.css');
require('styles/Main.css');

import React from 'react';
import Modal from 'react-modal';

var DATA = [
{name:'pi', id:0, ingredients:['first1','sencond1','thred1']},
{name:'cheaps', id:1, ingredients:['first2','sencond2','thred2']},
{name:'fdgd', id:2, ingredients:['first3','sencond3','thred3']}]

//const appElement = document.getElementById('your-app-element');

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

class Piece extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <tr className="pieceBox">
        <td><div>{this.props.piece}</div></td>
      </tr>
    );
  }
}


class BodyTable extends React.Component {
  constructor(props) {
    super(props);
  }
	render() {
		var rows = [];
		if (this.props.show && this.props.body != null) {
			this.props.body.forEach((piece) => {
				rows.push(<Piece piece = {piece} />);
			});
		}
		return (
			<table>
				<tbody>
					{rows}
				</tbody>
			</table>
		)
	}
}

class Item extends React.Component {
  constructor(props) {
    super(props);
		this.myFunction = this.myFunction.bind(this);
  }

	myFunction() {
		var id = this.props.recipe.id;
		this.props.onCurrentChange(id);
		//console.log(id);
	}

  render() {
    return (
      <tr onClick={this.myFunction} className="itemBox">
        <td><div>{this.props.recipe.name}</div><BodyTable show = {this.props.current} body = {this.props.recipe.ingredients} /></td>
      </tr>
    );
  }
}

class RecipesTable extends React.Component {
  constructor(props) {
    super(props);
		this.state = {
			current: null
		};
		this.handleCurrentChange = this.handleCurrentChange.bind(this);
  }

	handleCurrentChange(itemId){
		if (itemId === this.state.current) {
			this.setState({
				current: null
			});
		} else {
			this.setState({
				current: itemId
			});
		}
	}

  render() {
    var rows = [];
    this.props.recipes.forEach((recipe) => {
			var show = (this.state.current === recipe.id) ? true : false;
			//console.log(show);
      rows.push(<Item
					recipe={recipe}
					key={recipe.id}
					current={ show }
          onCurrentChange={this.handleCurrentChange}
					/>);
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
		//console.log('last Id; ' +  this.state.lastId);
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
