import Publisher from './publisher.js'

export default class StateManager extends Publisher {
  constructor({ startIdx, quantityToSlide, panelQuantity }) {
    super();
    this.state = {
      currentIdx: startIdx,
      targetIdx: startIdx,
      direction: null,
      quantityToSlide: quantityToSlide,
      panelQuantity: panelQuantity
    };
  }

  setState(data) {
    this.state = { ...this.state, ...data };

    if (data.direction) {
      this.updateTargetIdx(this.state);
      this.updateDirection(this.state);
      this.updateCurrentIdx(this.state);
      this.notify('carousel', this.state);
      this.syncronizeIdx(this.state);
      this.notify('pagination', this.state);
    }
    else {
      this.updateCurrentIdx(this.state);
      this.notify('carousel', this.state);
      this.notify('pagination', this.state);
    }
  }

  updateTargetIdx(state) {
    let { currentIdx, direction, quantityToSlide } = state;
    direction = direction === 'prev' ? -1 : 1;
    state.targetIdx = currentIdx + direction * quantityToSlide;
  }

  updateDirection(state) {
    const direction = state.targetIdx - state.currentIdx;
    state.direction = direction < 0 ? 'prev' : 'next';
  }

  updateCurrentIdx(state) {
    const { targetIdx, panelQuantity } = state;
    state.currentIdx = targetIdx < 0 || targetIdx > panelQuantity - 1
      ? panelQuantity - Math.abs(targetIdx)
      : targetIdx;
  }

  syncronizeIdx(state) {
    state.targetIdx = state.currentIdx;
  }
}