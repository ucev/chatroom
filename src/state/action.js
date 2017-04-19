import store from './store';

const action = {
  __unsubscribe: undefined,
  increment: () => {
    store.dispatch({type: "INCREMENT"});
  },
  decrement: () => {
    store.dispatch({type: "DECREMENT"});
  },
  getState: () => {
    return store.getState();
  },
  pageChange: (page) => {
    return store.dispatch({type: "PAGE_CHANGE", page: page});
  },
  pageCheck: () => {
    return store.dispatch({type: "PAGE_CHECK"});
  },
  subscribe: function(updateFunc) {
    this.unsubscribe();
    this.__unsubscribe = store.subscribe(updateFunc);
  },
  unsubscribe: function() {
    if (this.__unsubscribe) {
      this.__unsubscribe();
      this.__unsubscribe = undefined;
    }
  }
}

export default action;
