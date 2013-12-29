chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        onPageReady(request);
    }
);

var onPageReady = function(tabs) {
    console.log(tabs);
    for (var i = 0; i < tabs.tabs.length; i++) {
        $('body ul').append("<img src='" + tabs.tabs[i].dataUrl + "'>");
    }
}

