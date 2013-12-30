chrome.browserAction.onClicked.addListener(function(tab) {

    chrome.tabs.query({currentWindow: true}, function(tabs) {
        var populatedTabs = [];

        var photoTab = function(index) {
            chrome.tabs.update(tabs[index].id, {active: true}, function(updatedTab) {
                chrome.tabs.captureVisibleTab({format: "png"}, function(dataUrl) {

                    var img = document.createElement("img");
                    img.src = dataUrl;
                    var canvas = document.createElement("canvas");
                    var scale = 0.25;
                    canvas.width = img.width * scale;
                    canvas.height = img.height * scale;
                    var ctx = canvas.getContext("2d");
                    // ctx.scale(0.25, 0.25);
                    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);

                    updatedTab.dataUrl = canvas.toDataURL("image/png");
                    populatedTabs.push(updatedTab);

                    var nextTabIndex = index + 1;
                    if (nextTabIndex < tabs.length) {
                        photoTab(nextTabIndex);
                    } else {
                        show1Tab(populatedTabs);
                    }
                });

            });
        }
        photoTab(0);
    });

    var show1Tab = function(tabs) {
        chrome.storage.local.set({'tabs': tabs}, function() {
            console.log("Tabs saved");
            chrome.tabs.create({url: chrome.extension.getURL('tab.html')}, function(tab) {
                chrome.tabs.sendMessage(tab.id, {'tabs': tabs});
            });
        });
    }
});
