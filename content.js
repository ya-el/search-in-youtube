chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === "searchOnYouTube") {
    var selectedText = message.selectedText.trim();
    if (selectedText) {
      var searchUrl = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(selectedText);
      window.open(searchUrl, '_blank');
      // Send a message to the background script with the generated link
      chrome.runtime.sendMessage({ action: 'storeLink', link: searchUrl });
    }
  }
});