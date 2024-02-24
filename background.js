chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    title: "Search on YouTube",
    contexts: ["selection"],
    id: "searchOnYouTube"
  });
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === "searchOnYouTube") {
    chrome.tabs.sendMessage(tab.id, { action: "searchOnYouTube", selectedText: info.selectionText });
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'storeLink') {
    chrome.storage.sync.get({ links: [] }, function(data) {
      var links = data.links;
      links.push(request.link);
      chrome.storage.sync.set({ links: links }, function() {
        console.log('Link stored successfully');
      });
    });
  }
});