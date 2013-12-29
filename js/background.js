chrome.browserAction.onClicked.addListener(function(tab) {
    // chrome.tabs.create({'url': chrome.extension.getURL('tab.html')}, function(tab) {
    // });
    // chrome.windows.getCurrent(function(win) {
    //     chrome.tabs.captureVisibleTab(win.id, {format: "png"}, function(dataUrl) {
    //         console.log(win);
    //         console.log(dataUrl);
    //     });
    // });


    chrome.tabs.query({currentWindow: true, active: false}, function(tabs) {
      var populatedTabs = [];

      var photoTab = function(index) {
          chrome.tabs.update(tabs[index].id, {active: true}, function(updatedTab) {
              chrome.tabs.captureVisibleTab({format: "png"}, function(dataUrl) {
                  updatedTab.dataUrl = dataUrl;
                  populatedTabs.push(updatedTab);

                  var nextTabIndex = index + 1;
                  if (nextTabIndex < tabs.length) {
                     photoTab(nextTabIndex);
                  } else {
                     console.log(populatedTabs);
                     show1Tab(populatedTabs);
                  }
              });
          });
      }
      photoTab(0);
    });

    var show1Tab = function(tabs) {
        chrome.tabs.create({url: chrome.extension.getURL('tab.html')}, function(tab) {
            chrome.tabs.sendMessage(tab.id, {'tabs': tabs});
        });
    }
});
