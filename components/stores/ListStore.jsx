import { EventEmitter } from 'events';
import _ from 'lodash';

let ListStore = _.extend({}, EventEmitter.prototype, {
    items: [
        {
            name: 'item 1',
            id: 0
        },
        {
            name: 'item 2',
            id: 1
        }
    ],

    // Get all items
    getItems: function() {
        return this.items;
    },

    // Add item
    addItem: function(newItem) {
        this.items.push(newItem);
    },

    // Remove item
    removeItem: function(itemId) {
        let items = this.items;

        _.remove(items, (item) => {
            return itemId === item.id;
        });

        this.items = items;
    },

    // Emit change event
    emitChange: function() {
        this.emit('change');
    },

    // Add change listener
    addChangeListener: function(cb) {
        this.on('change', cb);
    },

    // Remove change listener
    removeChangeListener: function(cb) {
        this.removeListener('change', cb);
    }
})

export default ListStore;
