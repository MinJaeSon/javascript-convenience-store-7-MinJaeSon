import InitController from './Controller/InitController.js';

class App {
  async run() {
    const initController = new InitController();
    await initController.run();
  }
}

export default App;
