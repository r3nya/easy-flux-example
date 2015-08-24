import React, { Component, findDOMNode } from 'react';
import ListStore from '../stores/ListStore.jsx';
import AppDispatcher from '../dispatcher/AppDispatcher.jsx';

export default class NewItemForm extends Component {
  createItem(e) {
    e.preventDefault();

    let items = ListStore.getItems();
    let id = guid();
    let itemTitle = findDOMNode(this.refs.item_title).value.trim();

    findDOMNode(this.refs.item_title).value = '';

    AppDispatcher.dispatch({
      action: 'add-item',
      new_item: {
        id: id,
        name: itemTitle
      }
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={ this.createItem.bind(this) }>
          <input type="text" ref="item_title" />
          <button>Add new item</button>
        </form>
      </div>
    );
  }
}

const guid = () => {
  let s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
