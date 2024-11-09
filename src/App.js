import MainController from './Controller/MainController.js';

class App {
  async run() {
    const mainController = new MainController();
    await mainController.run();
  }
}

export default App;
