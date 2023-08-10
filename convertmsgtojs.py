import re
import json
import argparse

parser = argparse.ArgumentParser(description='Convert WhatsApp chat text file to JS file')
parser.add_argument('c', metavar='chat_dir', type=str, help='WhatsApp Export folder path')
args = parser.parse_args()


# Read the chat text file
with open(f'{args.c}/_chat.txt', 'r', encoding='utf-8') as file:
    chat_text = file.read()

# Remove Unicode control characters like \u202a and \u202c
cleaned_text = re.sub(r'[\u200e\u202a\u202c]', '', chat_text)

# Split the cleaned chat into individual messages
cleaned_lines = [line.strip() for line in cleaned_text.split('\n') if line.strip()]

# Split lines into individual messages
message_patterns = re.findall(r'\[(.*?)\] (.*?): (.*?)(?=\n\[\d{2}/\d{2}/\d{2}|$)', '\n'.join(cleaned_lines), re.DOTALL)

# Create messages array
messages = []

for timestamp, sender, content in message_patterns:
    if '<attached:' in content:
        message = {
            'timestamp': timestamp,
            'sender': sender,
            'content': content.split('<attached: ')[1].split('>')[0],
            'dir': args.c,
            'attachment': True,
            'caption': False
        }
        # if not startswith <attached: then it also has a caption
        if not content.startswith('<attached:'):
            # Remove from <attached: to > and remaining will be caption
            message['caption'] = content.split('<')[0] + content.split('>')[1]
        messages.append(message)
    else:
        message = {
            'timestamp': timestamp,
            'sender': sender,
            'content': content.strip(),
            'attachment': False,
            'caption': False
        }
        messages.append(message)

# Export messages to chat.js
output_js = f"const messages = {json.dumps(messages, ensure_ascii=False, indent=2)};\n"

with open('chat.js', 'w', encoding='utf-8') as js_file:
    js_file.write(output_js)
