document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get({ links: [] }, function(data) {
      var linksList = document.getElementById('links-list');
      linksList.innerHTML = '';

      // Create "Open All" button
      var openAllButton = document.createElement('button');
      openAllButton.textContent = 'Open All';
      openAllButton.addEventListener('click', function() {
        data.links.forEach(function(link) {
          window.open(link, '_blank');
        });
      });
      linksList.appendChild(openAllButton);

      // Create "Clear History" button
      var clearHistoryButton = document.createElement('button');
      clearHistoryButton.textContent = 'Clear History';
      clearHistoryButton.addEventListener('click', function() {
        chrome.storage.sync.set({ links: [] }, function() {
          linksList.innerHTML = '';
        });
      });
      linksList.appendChild(clearHistoryButton);

      data.links.forEach(function(link) {
        var listItem = document.createElement('li');
        listItem.style.marginBottom = '10px'; // Add margin between list items
        listItem.style.width = '100%'; // Set width to 100% to take up full width of the popup window
        listItem.style.display = 'flex'; // Use flexbox to layout the children of li
        listItem.style.justifyContent = 'space-between'; // Add separation between each child of li

        // Create the link element
        var linkNode = document.createElement('a');
        linkNode.href = link;
        linkNode.target = '_blank';
        listItem.appendChild(linkNode);

        // Create the YouTube icon element
        var youtubeIcon = document.createElement('img');
        youtubeIcon.src = 'https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg'; // replace with the URL to the YouTube icon
        youtubeIcon.alt = 'YouTube Icon';
        youtubeIcon.style.width = '20px'; // adjust size as needed
        youtubeIcon.style.marginRight = '10px'; // Add margin to the right of the icon
        linkNode.appendChild(youtubeIcon);
  
        // Extract the search text from the link
        var searchText = decodeURIComponent(link.split('=')[1]);
        var textNode = document.createTextNode(searchText);
        linkNode.appendChild(textNode);

        // Create the "enter" icon element
        var enterIcon = document.createElement('img');
        enterIcon.src = 'images/open.svg'; // replace with the path to your "enter" icon file
        enterIcon.alt = 'Open Link';
        enterIcon.style.width = '20px'; // adjust size as needed
        enterIcon.style.marginLeft = '10px'; // Add margin to the left of the icon
        linkNode.appendChild(enterIcon);
  
        linksList.appendChild(listItem);
      });
    });
  });