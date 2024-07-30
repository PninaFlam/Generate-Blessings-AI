# Generate Blessings AI

The project is a Node.js application that utilizes the OpenAI API to generate personalized blessings based on user input. It provides endpoints for creating blessings in different tones and styles, and it includes error handling for failed requests.

## Installation

1. Clone the repository
2. Run `npm install` to install dependencies
3. Create a `.env` file and add your OpenAI API key as `OPENAI_KEY=your-api-key`
4. Run `npm start` to start the server

## Usage

1. Visit http://localhost:PORT in your browser
2. Enter the required details and submit to generate blessings

## Endpoints

- `GET /`: Renders the index page
- `POST /blessings`: Generates blessings based on user input

## Technologies Used

- Node.js
- Express
- OpenAI API
- CORS
