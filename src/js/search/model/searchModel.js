export default class searchModel {
  constructor() {
    this.curInputVal = null;
    this.recentSearches = [];
    this.autocomData = [
      'diplomatic',
      'opposition',
      'parameter',
      'understanding',
      'favorable',
      'beautiful',
      'multimedia',
      'publication',
      'timetable',
      'identity',
      'demonstrator',
      'manufacture',
      'minority',
      'constellation',
      'legislation',
      'community',
      'recovery',
      'astonishing',
      'miserable',
      'motorcycle',
    ];
  }

  setCurInputVal(inputVal) {
    this.curInputVal = inputVal;
    console.log(this.curInputVal);
  } 
}