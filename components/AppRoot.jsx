import React, { Component } from 'react';
import ListStore from './stores/ListStore.jsx';
import AppDispatcher from './dispatcher/AppDispatcher.jsx';
import NewItemForm from './actions/NewItemForm.jsx';

let getListState = () => {
    return {
        items: ListStore.getItems()
    };
}

class AppRoot extends Component {
    constructor() {
        super();
        this.state = getListState();
    }

    // Method to setState based upon Store changes
    _onChange() {
        this.setState(getListState());
    }

    componentDidMount() {
        ListStore.addChangeListener(this._onChange.bind(this));
    }

    componentWillUnmount() {
        ListStore.removeChangeListener(this._onChange.bind(this));
    }

    removeItem(e) {
        let id = e.target.dataset.id;

        AppDispatcher.dispatch({
            action: 'remove-item',
            id: id
        });
    }

    render() {
        let items = ListStore.getItems();
        let itemHtml = items.map(( listItem ) => {
            return (
                <li key={ listItem.id }>
                    { listItem.name } <button onClick={ this.removeItem } data-id={ listItem.id }>x</button>
                </li>
            );
        });

        return (
            <div>
                <ul>
                    { itemHtml }
                </ul>
                <NewItemForm />
            </div>
        )
    }
}

React.render(
    <AppRoot />,
    document.getElementById('app-root')
);
