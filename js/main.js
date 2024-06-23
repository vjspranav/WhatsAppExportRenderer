"use strict";

const chatContainer = document.getElementById('chatContainer');
let prevContainer = null;
let sender = null;
let receiver = null;

// First message is receiver and next different sender is sender
receiver = messages[0].sender;
for (let i = 1; i < messages.length; i++) {
    if (messages[i].sender !== receiver) {
        sender = messages[i].sender;
        break;
    }
}

messages.forEach(message => {

    const parentDiv = document.createElement('div');
    const preChatContainer = document.createElement('div');
    const postChatContainer = document.createElement('div');

    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${message.sender === receiver ? 'receiver' : 'sender'}`;
    messageDiv.innerHTML = `
<p>${message.content}</p>
`;

    if (message.attachment) {
        const attachmentDiv = document.createElement('div');
        attachmentDiv.className = 'attachment';

        if (message.content.endsWith('.webp') || message.content.endsWith('.png') || message.content.endsWith('.jpg')) {
            attachmentDiv.innerHTML = `
    <a href=${message.dir}/${message.content}" target="_blank">
      <img src="${message.dir}/${message.content}" alt="Attachment">
    </a>
    ${message.caption ? `<p>${message.caption}</p>` : ''}
  `;
        } else if (message.content.endsWith('.mp4')) {
            attachmentDiv.innerHTML = `
    <video controls>
      <source src="${message.dir}/${message.content}" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    ${message.caption ? `<p>${message.caption}</p>` : ''}
  `;
        } else {
            attachmentDiv.innerHTML = `
    <a href="${message.dir}/${message.content}" target="_blank">${message.content}</a>
    ${message.caption ? `<p>${message.caption}</p>` : ''}
  `;
        }

        messageDiv.appendChild(attachmentDiv);
    }

    // Add timestamp now
    messageDiv.innerHTML += `
    <small>${message.timestamp.split(',')[1].trim()
        }</small>
    `;

    // Add flexbox container for pre and post divs
    // Make parent flexbox container
    parentDiv.className = ' d-flex';
    preChatContainer.className = 'd-flex justify-content-center align-items-center';
    postChatContainer.className = 'd-flex justify-content-center align-items-center';
    // Add break word to message div
    messageDiv.style.wordBreak = 'break-word';
    // If sender is D, flex-start
    // else flex-end
    if (!prevContainer) {
        prevContainer = {
            sender: message.sender,
            preChatContainer: preChatContainer,
            postChatContainer: postChatContainer
        }
    }

    if (message.sender === receiver) {
        parentDiv.className += '';
        messageDiv.className += ' d-flex flex-column';
        if (prevContainer.sender !== receiver)
            prevContainer.postChatContainer.innerText = sender[0]
        preChatContainer.innerText = '...';
    } else {
        parentDiv.className += '';
        messageDiv.className += ' d-flex flex-column';
        // Add flex auto to pre 
        preChatContainer.style.flex = 'auto';
        postChatContainer.innerText = '..';
        if (prevContainer.sender === receiver)
            prevContainer.preChatContainer.innerText = receiver[0]

    }

    prevContainer = {
        sender: message.sender,
        preChatContainer: preChatContainer,
        postChatContainer: postChatContainer
    }

    parentDiv.appendChild(preChatContainer);
    parentDiv.appendChild(messageDiv);
    parentDiv.appendChild(postChatContainer);

    chatContainer.appendChild(parentDiv);
});

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