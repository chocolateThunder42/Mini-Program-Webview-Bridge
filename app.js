import { handlePageLoadEvent, handleDOMLoadEvent, handleClickEvent, handleKeyPressEvent, handleErrorEvent } from './src/util.js';

window.addEventListener('load', handlePageLoadEvent);
window.addEventListener('DOMContentLoaded', handleDOMLoadEvent);
window.addEventListener('click', handleClickEvent);
window.addEventListener('keyup', handleKeyPressEvent);
window.addEventListener('error', handleErrorEvent);