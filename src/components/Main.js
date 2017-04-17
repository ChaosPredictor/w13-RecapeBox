require('normalize.css/normalize.css');
require('styles/Main.css');

import React from 'react';
import Modal from 'react-modal';
//import $ from 'jquery'

var DATA = [
{name:'pi', id:0, ingredients:'first1,sencond1,thred1'},
{name:'cheaps', id:1, ingredients:'first2,sencond2,thred2'},
{name:'fdgd', id:2, ingredients:'first3,sencond3,thred3'}]


var data = JSON.parse(localStorage.getItem('recipes')) || [];;
//const appElement = document.getElementById('your-app-element');
//add localstorage

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
		var i = 0;
//		if (this.props.show && this.props.body != null) {
		this.props.body.split(',').forEach((piece) => {
			rows.push(<Piece piece = {piece} key={i}/>);
			i = i + 1;
		});
//		}
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
		this.handleCurrentOpenedChange = this.handleCurrentOpenedChange.bind(this);
		this.handleCurrentDelete = this.handleCurrentDelete.bind(this);
  }

	handleCurrentOpenedChange() {
		var id = this.props.recipe.id;
		this.props.onCurrentChange(id);
		//console.log(id);
	}

	handleCurrentDelete() {
		var id = this.props.recipe.id;
		this.props.onCurrentDelete(id);
		//console.log("Current id: " + id);
	}

  render() {
    return (
      <tr className="itemBox">
        <td>
					<div onClick={this.handleCurrentOpenedChange}>{this.props.recipe.name}</div>
					{this.props.current &&
						<div>
							<BodyTable show = {this.props.current} body = {this.props.recipe.ingredients} />
							<button onClick={this.handleCurrentDelete}>Delete</button>
						</div>
					}

				</td>
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
		this.handleDeleteItem = this.handleDeleteItem.bind(this);
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

	handleDeleteItem(itemId){
		//:console.log("someone what to delete me: " + itemId);
		this.props.onDeleteItem(itemId);
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
					onCurrentDelete={this.handleDeleteItem}
					/>);
    });
    return (
      <table>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class Dialog extends React.Component {
	
  constructor(props) {
    super(props);
		this.state = {
			title: '',
			body: ''
		};
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
		this.handleAddItem = this.handleAddItem.bind(this);
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

	handleAddItem() {
		//alert("title: " + this.state.title + " / body: " + this.state.body);
		this.props.onAddItem(this.state.title, this.state.body);
		//this.closeModal;
	}


	render() {
    return (
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
				  <button onClick={this.handleAddItem}>Add</button>
        </form>
      </Modal>
    );
  }
}

class MainComponent extends React.Component {
	
  constructor(props) {
    super(props);
		this.state = {
			recipes: data,
//      modalIsOpen: false,
			lastId: data.length + 1,
			title: '',
			body: ''
		};
		this.addItem = this.addItem.bind(this);
    //this.openModal = this.openModal.bind(this);
    //this.afterOpenModal = this.afterOpenModal.bind(this);
    //this.closeModal = this.closeModal.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
		this.handleDeleteItem = this.handleDeleteItem.bind(this);
		this.handleAddItem = this.handleAddItem.bind(this);
  }

/*  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.refs.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }*/
	
	addItem(title, body) {
		var temp = this.state.recipes.slice()
		temp.push({
			name:title,
			id:this.state.lastId,
			ingredients:body
		});
		//console.log('last Id; ' +  this.state.lastId);
		this.setState({
			recipes: temp,
			modalIsOpen: false
		});

    //var todos = this.props.todos;
    //todos.push(React.findDOMNode(this.refs.myInput).value);
    //React.findDOMNode(this.refs.myInput).value = "";
    localStorage.setItem('recipes', JSON.stringify(temp));
    //this.setState({ todos: todos });

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

	handleDeleteItem(id) {
		//console.log("it's delete: " + index);
		var array = this.state.recipes;
		var index = array.map(function(e) { return e.id; }).indexOf(id);
		//console.log("list to delete: " + index);
		//findedIndexs.forEach((findedIndex) => {
		array.splice(index, 1);
		//});
		this.setState({recipes: array });
	}

	handleAddItem(title, body) {
		alert('handleAddItem Work!!! ' + title);
//		localStorage.setItem('itemsArray', "for test data");
		this.addItem(title, body);
		this.ref.dialog.closeModal();
	}

	render() {
    return (
      <div className="main">
				<RecipesTable
					recipes={this.state.recipes}
					onDeleteItem={this.handleDeleteItem}
				/>
        <button onClick={() => this.refs.dialog.openModal()}>Add Recape</button>
				<Dialog ref="dialog" onAddItem={this.handleAddItem} />
			</div>
    );
  }
}

export default MainComponent;
