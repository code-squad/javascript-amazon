import { initSearchBar } from './search_bar/app.js'
import { initCarousel } from './card_navigation/app.js'
import { on } from './utils/allenibrary.js'

on(window, 'DOMContentLoaded', () => {
  initSearchBar();
  initCarousel();
})