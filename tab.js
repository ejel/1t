chrome.tabs.query({currentWindow: true, active: false}, function(tabs) {
    for (i = 0; i < tabs.length; i++) {
        $("body ul").append("<li>" + tabs[i].title + "</li>");
    }
});
