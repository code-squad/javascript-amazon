import { initSearchBar } from './components/search_bar/app.js'
import { initCarousel } from './components/card_navigation/app.js'
import { on } from './utils/allenibrary.js'

on(window, 'DOMContentLoaded', () => {
  initSearchBar();
  initCarousel();
})