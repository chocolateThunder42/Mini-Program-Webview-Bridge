import { tags, keys, FALSEALARMFLAG } from './constants.js';
import { handleAnchorTagEvent, handleButtonEvent, handleLabelEvent, handleInputEvent, handleTextAreaEvent } from './handlers.js';
import { PageLoadedEventKeys, DOMLoadedEventKeys, clickEventKeys, keyPressEventKeys, errorEventKeys, consoleEventKeys } from './events.js';

function onMessage(callback) {
  try {
    my.onMessage = function(e) {
      callback(e);
    }
  } catch(e) {
    throw e;
  }
}

function postMessage(msg) {
  try {
    my.postMessage(msg);
  } catch(e) {
    throw e;
  }
}

function handlePageLoadEvent(e) {
  throwWarning();
  handleEvent(e);
  createConsoleListener();
}

function handleDOMLoadEvent(e) {
  handleEvent(e);
}

function handleErrorEvent(e) {
  handleEvent(e);
}

function handleClickEvent(e) {
  if (!e) {
    return;
  }

  const target = e.target;
  const tagName = target.tagName;
  
  if (tags.every(tag => tag !== tagName)) {
    return;
  }

  handleEvent(e);
}

function handleKeyPressEvent(e) {
  const keyPressed = e.key;
  const target = e.target;
  const tagName = target.tagName;
  const type = target.type;
  const isInput = tagName === 'INPUT' || tagName === 'TEXTAREA';
  const isPasswordInput = tagName === 'INPUT' && type === 'password' && keyPressed !== 'TAB';
  const event = {};

  if (tags.every(tag => tag !== tagName)) {
    return;
  }

  if (!isInput && keys.every(key => key !== keyPressed)) {
    return;
  }

  if (isPasswordInput) {
    return;
  }

  handleEvent(e);
}

function handleEvent(e) {
  if (!e) {
    return;
  }

  const type = e.type;
  const target = e.target;
  const tagName = target.tagName;

  if (tagName === 'A') {
    handleAnchorTagEvent(e);
  } else if (tagName === 'BUTTON') {
    handleButtonEvent(e);
  } else if (tagName === 'LABEL') {
    handleLabelEvent(e);
  } else if (tagName === 'INPUT') {
    handleInputEvent(e);
  } else if (tagName === 'TEXTAREA') {
    handleTextAreaEvent(e);
  }

  sayHello(e);
}

function createConsoleListener() {
  const length = Object.keys(console).length - 1;
  let ready = false;
  let i = 0;

  for (const property in console) {
    if (typeof console[property] === 'function') {
      console[property] = new Proxy(console[property], {
        apply(target, thisArg, args) {
          const event = {
            property,
            type: 'console'
          };
          const e = { event, target, args };
          const isFalseAlarm = args.lastIndexOf(FALSEALARMFLAG) === args.length - 1;

          if (ready && !isFalseAlarm)
            handleEvent(e);
          if (isFalseAlarm)
            args.pop();

          return (target(...args));
        }
      });
    }
    if (++i === length)
      ready = true;
  }
}

function sayHello(event) {
  if (!event) {
    return;
  }

  const path = window.location.pathname;
  const msg = {
    event: extractEventValues(event),
    url: window.location.href,
    page: path.split('/').pop(),
    timestamp: (new Date()).toISOString()
  };

  if (msg.url.indexOf('/sample-site/index.html') > -1) {
    document.getElementById('messages').innerHTML = `${event.type} event: ${event.target.tagName || event.message} tag`;
  }

  postMessage(msg);
}

function extractEventValues(event) {
  const result = {};

  if (!event) {
    return (result);
  }
  
  switch(event.type) {
    case 'load':
      extractEvent(PageLoadedEventKeys, event, result);
      break;
    case 'DOMContentLoaded':
      extractEvent(DOMLoadedEventKeys, event, result);
      break;
    case 'click':
      extractEvent(clickEventKeys, event, result);
      break;
    case 'keyup':
      extractEvent(keyPressEventKeys, event, result);
      break;
    case 'error':
      extractEvent(errorEventKeys, event, result);
      break;
    case 'console':
      extractEvent(consoleEventKeys, event, result);
      break;
  }

  parseHTMLBOMReferences(result);

  return (result);
}

function extractEvent(arr, e, result) {
  if (arr && e && result)
    arr.forEach(item => result[item] = e[item]);
}

function throwWarning() {
  console.warn("Hi there. Please don't let the Mini-program-web-view-bridge library run in production. It is intended purely for dev use.");
}

function parseHTMLBOMReferences(result) {
  for (const key in result) {
    const value = result[key];
    let tagName;
    let attributes = [];

    if (value instanceof Window) {
      result[key] = 'Window'
    } else if (value instanceof HTMLElement) {
      tagName = value.tagName.toLowerCase();
      attributes = [...value.attributes].map(attr => `${attr.name}=${attr.value}`).join(' ');
      result[key] = `<${tagName} ${attributes}>`;
    } else if (value instanceof TextPrototype) {
      result[key] = value.textContent;
    }
  }

  return (result);
}

export {
  onMessage,
  handlePageLoadEvent,
  handleDOMLoadEvent,
  handleClickEvent,
  handleKeyPressEvent,
  handleErrorEvent
};
