# WhatsApp Chat Export Renderer
## Description
This is a simple webpage that loads exported whatsapp chats as a website. It is intended to be used with the chat export feature of WhatsApp. It is written in plain HTML, CSS and JavaScript and does not require any server-side processing. It is therefore possible to host the website on any static webserver, such as GitHub Pages.

## Features
- Load exported WhatsApp chats
- Display chat messages
- Display chat media (images, videos, audio, documents)
- Display Date and Time of messages

## Usage
1. Export the chat you want to view from WhatsApp. You can find instructions on how to do this [here](https://faq.whatsapp.com/en/android/23756533/).
2. Extract the zip file you received from WhatsApp and store in the same directory as the `index.html` file.
3. Run `convertmsgtojs.py` to convert the exported chat to a JavaScript file:
    - `python3 convertmsgtojs.py <path to exported chat>`
    > Note: This script requires Python 3.6 or higher.
4. Open the `index.html` file in your browser.