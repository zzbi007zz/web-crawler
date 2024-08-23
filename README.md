# Web Crawler Project

This project is a simple web crawler application with a Node.js backend and React frontend. It allows users to input a URL, crawls the specified website, and displays information about the links found, including thumbnails when available.

## Features

- Crawl any website by entering its URL
- Extract links and associated thumbnails from the crawled page
- Display crawled data in a user-friendly table format
- Support for partial URL inputs (e.g., "example.com")

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v12.0.0 or higher)
- npm (v6.0.0 or higher)

## Installation

To install the Web Crawler Project, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/web-crawler-nodejs.git
   cd web-crawler-project
   ```

2. Install backend dependencies:
   ```
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```
   cd ../frontend
   npm install
   ```

## Usage

To use the Web Crawler Project, follow these steps:

1. Start the backend server:
   ```
   cd backend
   npm start
   ```
   The server will start running on `http://localhost:3001`.

2. In a new terminal, start the frontend development server:
   ```
   cd frontend
   npm start
   ```
   The React app will start running on `http://localhost:3000`.

3. Open your web browser and navigate to `http://localhost:3000`.

4. Enter a URL in the input field (e.g., "example.com" or "https://www.example.com") and click "Crawl".

5. The application will display the crawled data, including links and thumbnails found on the webpage.

## Project Structure

```
web-crawler-project/
├── backend/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
└── README.md
```

## Technologies Used

- Backend:
  - Node.js
  - Express.js
  - Axios (for making HTTP requests)
  - Cheerio (for parsing HTML)

- Frontend:
  - React
  - Axios (for making API calls to the backend)

## Contributing

Contributions to the Web Crawler Project are welcome. Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b <branch_name>`.
3. Make your changes and commit them: `git commit -m '<commit_message>'`
4. Push to the original branch: `git push origin <project_name>/<location>`
5. Create the pull request.

Alternatively, see the GitHub documentation on [creating a pull request](https://help.github.com/articles/creating-a-pull-request/).

## License

This project uses the following license: [MIT License](https://opensource.org/licenses/MIT).

## Acknowledgements

- [Cheerio](https://github.com/cheeriojs/cheerio) for HTML parsing
- [Axios](https://github.com/axios/axios) for HTTP requests
- [React](https://reactjs.org/) for the frontend framework
