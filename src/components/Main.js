require('normalize.css/normalize.css');
require('styles/Main.css');

import React from 'react';
import Modal from 'react-modal';
import update from 'immutability-helper';

var defaultRecipes = [
{name:'pi', id:0, ingredients:'first1,sencond1,thred1'},
{name:'cheaps', id:1, ingredients:'first2,sencond2,thred2'},
{name:'fdgd', id:2, ingredients:'first3,sencond3,thred3'}]


var Recipes = JSON.parse(localStorage.getItem('recipes')) || defaultRecipes;
var LastId = JSON.parse(localStorage.getItem('lastId'));
if (LastId !== null) {
	LastId = LastId;
} else {
	LastId = defaultRecipes.length;
}

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
		this.props.body.split(',').forEach((piece) => {
			rows.push(<Piece piece = {piece} key={i}/>);
			i = i + 1;
		});
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
		this.handleCurrentEdit = this.handleCurrentEdit.bind(this);
  }

	handleCurrentOpenedChange() {
		var id = this.props.recipe.id;
		this.props.onCurrentChange(id);
	}

	handleCurrentDelete() {
		var id = this.props.recipe.id;
		this.props.onCurrentDelete(id);
	}

	handleCurrentEdit() {
		var id = this.props.recipe.id;
		this.props.onCurrentEdit(id);
	}

  render() {
    return (
      <tr className="itemBox">
        <td>
					<div onClick={this.handleCurrentOpenedChange}>{this.props.recipe.name}</div>
					{this.props.current &&
						<div>
							<div className="ingredients">Ingredients</div>
							<BodyTable show = {this.props.current} body = {this.props.recipe.ingredients} />
							<button onClick={this.handleCurrentDelete}>Delete</button>
							<button onClick={this.handleCurrentEdit}>Edit</button>
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
		this.handleEditItem = this.handleEditItem.bind(this);
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
		this.props.onDeleteItem(itemId);
	}

	handleEditItem(itemId){
		this.props.onEditItem(itemId);
	}

  render() {
    var rows = [];
    this.props.recipes.forEach((recipe) => {
			var show = (this.state.current === recipe.id) ? true : false;
      rows.push(<Item
					recipe={recipe}
					key={recipe.id}
					current={ show }
          onCurrentChange={this.handleCurrentChange}
					onCurrentDelete={this.handleDeleteItem}
					onCurrentEdit={this.handleEditItem}
					/>);
    });
    return (
      <table className="recipesTable">
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
			body: '',
			action: '',
			index: ''
		};
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
		this.handleAddItem = this.handleAddItem.bind(this);
		this.handleUpdateItem = this.handleUpdateItem.bind(this);
  }

  openModal(action, title, body, index) {
		if (action == 'Add') {
			this.setState({modalIsOpen: true,
				action: action,
				title: '',
				body: ''
			});
		} else { //Edit
			this.setState({modalIsOpen: true,
				action: action,
				title: title,
				body: body,
				index: index
			});
		}
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
		this.props.onAddItem(this.state.title, this.state.body);
	}

	handleUpdateItem() {
		this.props.onUpdateItem(this.state.title, this.state.body, this.state.index);
	}

	render() {
		var action;
		if (this.state.action == 'Add') {
			action = <button onClick={this.handleAddItem}>Add</button>;
		} else {
		  action = <button onClick={this.handleUpdateItem}>Update</button>;
		}
    return (
      <Modal
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel="Example Modal">
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
					{action}
        </form>
      </Modal>
    );
  }
}

class MainComponent extends React.Component {
	
  constructor(props) {
    super(props);
		this.state = {
			recipes: Recipes,
			lastId: LastId
		};
		this.addItem = this.addItem.bind(this);
		this.updateItem = this.updateItem.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
		this.handleDeleteItem = this.handleDeleteItem.bind(this);
		this.handleEditItem = this.handleEditItem.bind(this);
		this.handleAddItem = this.handleAddItem.bind(this);
		this.handleUpdateItem = this.handleUpdateItem.bind(this);
  }

	addItem(title, body) {
		var temp = this.state.recipes.slice()
		temp.push({
			name:title,
			id:this.state.lastId,
			ingredients:body
		});
		this.setState({
			recipes: temp,
			modalIsOpen: false
		});
    localStorage.setItem('recipes', JSON.stringify(temp));
		localStorage.setItem('lastId', JSON.stringify(this.state.lastId+1));
    this.setState(prevState => ({
      lastId: prevState.lastId + 1
    }));
	}

	updateItem(title, body, index) {
		var data = this.state.recipes;
    var updatedData = update(data[index], {name: {$set: title}, ingredients: {$set: body}});

    var newData = update(data, {
        $splice: [[index, 1, updatedData]]
    });
    this.setState({recipes: newData});
    localStorage.setItem('recipes', JSON.stringify(newData));
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
		var array = this.state.recipes;
		var index = array.map(function(e) { return e.id; }).indexOf(id);
		array.splice(index, 1);
    localStorage.setItem('recipes', JSON.stringify(array));
		this.setState({recipes: array });
	}

	handleEditItem(id) {
		var array = this.state.recipes;
		var index = array.map(function(e) { return e.id; }).indexOf(id);
		this.refs.dialog.openModal('Edit',array[index].name,array[index].ingredients, index)
	}

	handleAddItem(title, body) {
		this.addItem(title, body);
		this.refs.dialog.closeModal();
	}

	handleUpdateItem(title, body, ind) {
		this.updateItem(title, body, ind);
		this.refs.dialog.closeModal();
	}

	render() {
    return (
      <div className="main">
				<RecipesTable
					recipes={this.state.recipes}
					onDeleteItem={this.handleDeleteItem}
					onEditItem={this.handleEditItem}
				/>
        <button className="addButton" onClick={() => this.refs.dialog.openModal('Add')}>Add Recape</button>
				<Dialog ref="dialog" onAddItem={this.handleAddItem} onUpdateItem={this.handleUpdateItem} />
			</div>
    );
  }
}

export default MainComponent;
