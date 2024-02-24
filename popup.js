var linksList = document.getElementById('links-list');

document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get({ links: [] }, function(data) {
        linksList = document.getElementById('links-list');
        linksList.innerHTML = '';
        data.links.forEach(function(link) {
            var listItem = document.createElement('li');
            listItem.classList.add('list-item');

            // Create the link element
            var linkNode = document.createElement('a');
            linkNode.href = link;
            linkNode.target = '_blank';
            linkNode.classList.add('link-node');
            listItem.appendChild(linkNode);

            // Create the YouTube icon element
            var youtubeIcon = document.createElement('img');
            youtubeIcon.src = 'https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg'; // replace with the URL to the YouTube icon
            youtubeIcon.alt = 'YouTube Icon';
            youtubeIcon.classList.add('youtube-icon');
            linkNode.appendChild(youtubeIcon);

            // Extract the search text from the link
            var searchText = decodeURIComponent(link.split('=')[1]);
            var textNode = document.createTextNode(searchText);
            linkNode.appendChild(textNode);

            // Create the "enter" icon element
            var enterIcon = document.createElement('img');
            enterIcon.src = 'images/open.svg'; // replace with the path to your "enter" icon file
            enterIcon.alt = 'Open Link';
            enterIcon.classList.add('enter-icon');
            linkNode.appendChild(enterIcon);

            linksList.appendChild(listItem);
        });
    });
});

// Get buttons
var openAllButton = document.getElementById('open-all');
var clearHistoryButton = document.getElementById('clear-history');

// Add event listener for "Open All" button
openAllButton.addEventListener('click', function() {
    chrome.storage.sync.get({ links: [] }, function(data) {
        linksList.innerHTML = ''; // Clear the linksList
        var message = document.createElement('p');
        if (data.links.length === 0) {
            message.textContent = 'There are no links to open.';
        } else {
            data.links.forEach(function(link) {
                window.open(link, '_blank');
            });
            message.textContent = 'All links have been opened.';
        }
        linksList.appendChild(message);
    });
});

// Add event listener for "Clear History" button
clearHistoryButton.addEventListener('click', function() {
    chrome.storage.sync.get({ links: [] }, function(data) {
        chrome.storage.sync.set({ links: [] }, function() {
            linksList.innerHTML = '';
            var message = document.createElement('p');
            message.textContent = 'The storage is empty. You have cleared the history.';
            linksList.appendChild(message);
        });
    });
});