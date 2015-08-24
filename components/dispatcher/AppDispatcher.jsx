import { Dispatcher } from 'flux';
import ListStore from '../stores/ListStore.jsx';

let AppDispatcher = new Dispatcher();

export default AppDispatcher.register((payload) => {
    let action = payload.action;
    let new_item = payload.new_item;
    let id = payload.id;

    switch(action) {
        case 'add-item':
            ListStore.addItem(new_item);
            break;

        case 'remove-item':
            ListStore.removeItem(id);
            break;

        default:
            return true;
    }

    // If action was responded to, emit change event
    ListStore.emitChange();

    return true;
});
