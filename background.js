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
  