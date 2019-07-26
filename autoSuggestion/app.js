import InputView from './src/component/Input/InputView.js';
import ResultView from './src/component/Result/ResultView.js';
import ResultViewRenderer from './src/component/Result/ResultViewRenderer.js';
import Controller from './src/js/Controller.js';
import Model from './src/js/Model.js';

const inputView = new InputView();
const resultView = new ResultView(ResultViewRenderer);
const model = new Model();
const controller = new Controller(model, inputView, resultView);
