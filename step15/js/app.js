import InputView from './InputView.js';
import ResultView from './ResultView.js';
import Model from './Model.js';
import config from './config.js';

const inputView = new InputView(config);
const resultView = new ResultView(config);
const model = new Model(config);

model.resultView = resultView;
inputView.model = model;
