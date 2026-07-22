# Code Typing Test

A typing test for practicing code snippets, built with React and Vite. Type through randomly selected code snippets and get feedback on speed and accuracy.

## Features

- **Random code snippets** - a new snippet is selected each time you load the page or restart
- **Live character feedback** - each character changes colour as you type with character by character comparison
- **Animated cursor** - an animated cursor tracks your position in the snippet, blinking while idle and staying solid while typing
- **WPM (words per minute)** - calculated on completion using 5 charaters per word
- **Accuracy** - percentage of characters typed correctly shown on completion
- **Invisible input overlay** - there is no text box, the snippets colours in as you type
- **Restart** - resets with a new random snippet

## Tech Stack

- [React](https://react.dev/) — UI and state management
- [Vite](https://vite.dev/) — build tool and dev server
- Plain CSS — colour theme inspired by the github dark theme

## Running Locally

Clone the repo and install dependencies:

```bash
git clone https://github.com/Matty-PW/code-typing-test.git
cd code-typing-test
npm install
```

Start the dev server:

```bash
npm run dev
```

Then open the URL it prints in your browser.

## How It Works

- Each character of the snippet is rendered as its own `<span>`, allowing individual colouring
- A hidden `<input>` is overlaid on top of the snippet to capture keystrokes so there is no need for an input text box
- WPM and accuracy are calculated from the typed string on completion rather than tracked as separate state
- The cursor position is measured using `offsetLeft` on the currently active character span and animated with a CSS transition

## Future Improvements

- Multi line custom code snippets
- Real time WPM updates while typing
- Leaderboard and stats stored in local storage
- Language selection
