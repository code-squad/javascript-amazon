import InputView from './src/js/InputView.js';
import ResultView from './src/js/ResultView.js';
import Controller from './src/js/Controller.js';
import Model from './src/js/Model.js';

const inputView = new InputView();
const resultView = new ResultView();
const model = new Model();
const controller = new Controller();

controller.inputView = inputView;
controller.resultView = resultView;
controller.model = model;
