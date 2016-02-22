import ReactDOM from 'react-dom/server';

class App {
  constructor (horseKlass, config) {
    // should return a class that extends horseKlass instead? may make event
    // binding easier
    this._horse = new horseKlass(config);

    for (const k in this._horse) {
      this[k] = this._horse[k];
    }
  }

  get (klass) {
    const config = this.config;

    return async function buildController (ctx, next) {
      const props = {
        ctx,
        config,
      };

      const controller = new klass(props);
      await controller.get(next);

      // if this.body is a react element
      this.body = ReactDOM.renderToString(this.body);
      //else, do nothing, just send back contents of this.body
    };
  }

}

export default App;
