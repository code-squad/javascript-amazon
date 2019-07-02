import Publisher from './publisher.js'

export default class StateManager extends Publisher {
  constructor(startIdx, panelQuantity) {
    super();
    this.state = {
      currentIdx: startIdx,
      targetIdx: startIdx,
      direction: null,
      panelQuantity: panelQuantity
    };
  }

}