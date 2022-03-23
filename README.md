# Mini Program Webview Bridge #

**This library should be used for development and testing purposes only. It is not intended for production use.**

This library is used to simplify the communication process between your [Mini Program](https://developer.vodapay.vodacom.co.za/mini-program) and [web-view](https://developer.vodapay.vodacom.co.za/docs/miniprogram_vodacom/mpdev/component_open_web-view).  
It was originally intended for logical analysis within a web-view but can be modified for other dev usecases e.g

* Debug any issues that are only viewable on Web app.
* Push errors and logs from Web app to Mini-Program.
* Detect wheter events completed or failed.

To start the app just run `npm run serve`. You can use the sample site provided in the root directory.

### Setting up the Webapp sample ###

Inside your HTML document, include the following before the closing body tag:

```
    <!-- Rest of your web app -->
    <script src="https://appx/web-view.min.js" type="text/javascript"></script>
    <script src="path/to/Mini-Program-Webview-Bridge/app.js" type="module"></script> <!-- Remove this script tag when releasing to production -->
  </body>

```

### Setting up Mini Program Webview sample ###

* axml:
```
<web-view id="web-view" src="http://localhost:3000/sample-site/index.html" onMessage="onMessage"></web-view>
```

* js:
```
Page({
  data: {
    webViewContext: null
  },
  onLoad() {
    this.webViewContext = my.createWebViewContext('web-view');
  },
  onMessage(e) {
    console.log(e);
  }
});
```


### Contents of a message object ###

```
// Example of a click event 

{ 
  event: {
    altKey: false,
    bubbles: true,
    button: 0,
    buttons: 0,
    cancelBubble: false,
    cancelable: true,
    clientX: 598,
    clientY: 673,
    composed: true,
    ctrlKey: false,
    currentTarget: "Window",
    defaultPrevented: false,
    detail: 1,
    eventPhase: 3,
    explicitOriginalTarget: '<input id="message-box" name="message-box" type="text">',
    isTrusted: true,
    layerX: 217,
    layerY: 5,
    metaKey: false,
    movementX: 0,
    movementY: 0,
    mozInputSource: 1,
    mozPressure: 0,
    offsetX: 215,
    offsetY: 3,
    originalTarget: Restricted {  },
    pageX: 598,
    pageY: 1130,
    rangeOffset: 0,
    rangeParent: null,
    region: "",
    relatedTarget: null,
    returnValue: true,
    screenX: 598,
    screenY: 758,
    shiftKey: false,
    srcElement: '<input id="message-box" name="message-box" type="text">',
    target: '<input id="message-box" name="message-box" type="text">',
    timeStamp: 69239,
    type: "click",
    view: "Window",
    which: 1,
    x: 598,
    y: 673
  },
  page: "index.html",
  timestamp: "2022-03-22T18:29:57.900Z",
  url: "http://localhost:3000/sample-site/index.html"
}

```

