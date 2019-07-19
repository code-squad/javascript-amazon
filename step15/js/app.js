import InputView from './InputView.js';
import ResultView from './ResultView.js';
import Controller from './Controller.js';
import Model from './Model.js';

const inputView = new InputView();
const resultView = new ResultView();
const model = new Model();
const controller = new Controller();

controller.inputView = inputView;
controller.resultView = resultView;
controller.model = model;
