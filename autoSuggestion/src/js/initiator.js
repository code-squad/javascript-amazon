import InputView from '../component/Input/InputView.js';
import ResultView from '../component/Result/ResultView.js';
import ResultViewRenderer from '../component/Result/ResultViewRenderer.js';
import Controller from './Controller.js';
import Model from './Model.js';

export default _ => {
  const inputView = new InputView();
  const resultView = new ResultView(ResultViewRenderer);
  const model = new Model();
  const controller = new Controller(model, inputView, resultView);
};
