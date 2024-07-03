# Claude Artifact Runner

Claude Artifact Runner is an interactive web application for showcasing and exploring various web development artifacts. This React-based tool allows users to view, search, and interact with both React components and HTML files in a unified interface. It's ideal for educational purposes, code demonstrations, and component libraries.

## Features

- Display and interact with React components and HTML artifacts
- Search and filter artifacts by name, category, and description
- Sort artifacts by various properties (name, category, version)
- Responsive design for desktop and mobile viewing
- Built-in instructions for adding new artifacts
- Error handling and loading states for improved user experience

## Table of Contents

- [Claude Artifact Runner](#claude-artifact-runner)
  - [Features](#features)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Adding New Artifacts](#adding-new-artifacts)
  - [Project Structure](#project-structure)
  - [Deployment](#deployment)
  - [Contributing](#contributing)
  - [License](#license)

## Installation

To set up the Claude Artifact Runner on your local machine, follow these steps:

1. Clone the repository:

   ```
   git clone https://github.com/mamertofabian/claude-artifact-runner.git
   ```

2. Navigate to the project directory:

   ```
   cd claude-artifact-runner
   ```

3. Install the dependencies:

   ```
   npm install
   ```

4. Start the development server:
   ```
   npm start
   ```

The application should now be running on `http://localhost:3000`.

## Usage

Once the application is running, you can:

- Browse through the list of available artifacts
- Use the search bar to find specific artifacts by name or description
- Filter artifacts by category using the dropdown menu
- Sort artifacts by clicking on the column headers (Name, Category, Version)
- Click on an artifact to view its details and interact with it
- For HTML artifacts, the content will be displayed in an iframe
- For React component artifacts, the component will be rendered directly

To return to the main list from an artifact view, click the "Back to List" button.

## Adding New Artifacts

To add a new artifact to the runner:

1. For React components:

   - Create a new file in the `src/artifacts/` directory (e.g., `NewArtifact.js`)
   - Create and export your artifact as a default React component
   - Import your new artifact in the main Artifact Runner component

2. For HTML files:

   - Create a new HTML file in the `public/artifacts/html/` directory (e.g., `new-artifact.html`)
   - Ensure your HTML file is self-contained (includes any necessary CSS and JavaScript)

3. Add a new entry to the `defaultArtifacts` array in the main Artifact Runner component:

   ```javascript
   {
     id: 'unique-id-for-new-artifact',
     name: 'New Artifact Name',
     component: NewArtifact, // for React components
     path: '/artifacts/html/new-artifact.html', // for HTML files
     category: 'Your Category',
     description: 'Brief description of your artifact.',
     version: '1.0.0',
     type: 'react', // or 'html' for HTML files
   }
   ```

4. Save all changes and restart your development server if necessary

## Project Structure

```
claude-artifact-runner/
├── public/
│   └── artifacts/
│       └── html/
│           └── sample.html
├── src/
│   ├── artifacts/
│   │   └── DjangoStaticFilesExplainer.js
│   ├── components/
│   │   └── ArtifactRunner.js
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

## Deployment

To deploy the Claude Artifact Runner to GitHub Pages, follow these steps:

1. Ensure your project is in a GitHub repository.

2. Install the `gh-pages` package as a dev dependency:

   ```
   npm install gh-pages --save-dev
   ```

3. Open your `package.json` file and add the following properties:

   ```json
   {
     "homepage": "https://<username>.github.io/<repository-name>",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

   Replace `<username>` with your GitHub username and `<repository-name>` with your repository name.

4. If you're using React Router, adjust the router base path in your main App component:

   ```javascript
   <Router basename={process.env.PUBLIC_URL}>{/* Your routes here */}</Router>
   ```

5. Commit and push all your changes to GitHub.

6. Run the deploy script:

   ```
   npm run deploy
   ```

7. Go to your GitHub repository settings. Under the "Pages" section, select the `gh-pages` branch as the source for GitHub Pages.

8. Your application should now be live at `https://<username>.github.io/<repository-name>`.

Remember to run the deploy script every time you want to update the deployed version of your application.

Note: Make sure all paths to artifacts (especially HTML files) are relative to the root of your deployed site.

## Contributing

Contributions to the Claude Artifact Runner are welcome! Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch for your feature or bug fix
3. Make your changes and commit them with a clear commit message
4. Push your changes to your fork
5. Submit a pull request to the main repository

Please ensure your code adheres to the existing style and include appropriate tests if applicable.

## License

[MIT License](https://opensource.org/licenses/MIT)

Copyright (c) 2024 Codefrost

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
