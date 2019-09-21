import initSearchBar from './components/search_bar/app.js';
import initCardNavigation from './components/card_navigation/app.js';
import { on } from './utils/allenibrary.js';

on(window, 'DOMContentLoaded', () => {
  initSearchBar();
  initCardNavigation();
});
