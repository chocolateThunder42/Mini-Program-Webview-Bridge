function handleAnchorTagEvent(e) {
  if (!e) {
    return;
  }

  const type = e.type;
  const target = e.target;
  const keyPressed = e.key;

  // User focused on A tag
  if (type === 'keyup' && keyPressed === 'TAB') {
    return;
  }

  // User interacted with an achor
}

function handleButtonEvent(e) {
  if (!e) {
    return;
  }

  const type = e.type;
  const target = e.target;
  const keyPressed = e.key;

  // User interacted with a button
}

function handleLabelEvent(e) {
  if (!e) {
    return;
  }

  const type = e.type;
  const target = e.target;
  const keyPressed = e.key;

  // user interacted with a label
}

function handleInputEvent(e) {
  if (!e) {
    return;
  }

  const type = e.type;
  const target = e.target;
  const keyPressed = e.key;

  // User interacted with input field
}

function handleTextAreaEvent(e) {
  if (!e) {
    return;
  }

  const type = e.type;
  const target = e.target;
  const keyPressed = e.key;

  // User interacted with text area
}

export { 
  handleAnchorTagEvent,
  handleButtonEvent,
  handleLabelEvent,
  handleInputEvent,
  handleTextAreaEvent
};