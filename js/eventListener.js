const dateHeader = document.getElementById('dateHeader');
let currentVisibleDate = null;

// Function to update the date header based on the current visible date
function updateDateHeader() {
    dateHeader.textContent = currentVisibleDate || '';
}

chatContainer.addEventListener('scroll', () => {
    const messageDivs = document.querySelectorAll('.chat-message');

    // Find the first visible message on top
    for (let i = messageDivs.length - 1; i >= 0; i--) {
        const rect = messageDivs[i].getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            // date is of format dd/mm/yyyy
            // convert it to mm/dd/yyyy
            let timestamp = messages[i].timestamp.split('/');
            timestamp = `${timestamp[1]}/${timestamp[0]}/${timestamp[2]}`;
            currentVisibleDate = new Date(timestamp).toLocaleDateString();
            // convert back
            currentVisibleDate = currentVisibleDate.split('/');
            currentVisibleDate = `${currentVisibleDate[1]}/${currentVisibleDate[0]}/${currentVisibleDate[2]}`;
            updateDateHeader();
            break;
        }
    }
});
