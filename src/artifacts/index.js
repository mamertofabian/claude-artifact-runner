import React, { useState, useMemo, useEffect } from "react";
import {
  ArrowLeft,
  Search,
  Tag,
  PlusCircle,
  X,
  ChevronUp,
  ChevronDown,
  AlertCircle,
} from "lucide-react";

// Import your artifacts here
import DjangoStaticFilesExplainer from "./django-static-files-explainer";
import MoodBoardGenerator from "./mood-board-generator";
import SurvivalGame from "./survival-game-component";
// import OtherArtifact from './OtherArtifact';

const defaultArtifacts = [
  {
    id: "django-static-files",
    name: "Django Static Files Explainer",
    component: DjangoStaticFilesExplainer,
    category: "Web Development",
    description: "Interactive explanation of Django static files concepts.",
    version: "1.0.0",
    type: "react",
  },
  {
    id: "mood-board-generator",
    name: "Mood Board Generator",
    component: MoodBoardGenerator,
    category: "Design",
    description: "Generate a mood board with random shapes and colors.",
    version: "1.0.0",
    type: "react",
  },
  {
    id: "confetti-animation",
    name: "Confetti Animation",
    path: "/artifacts/html/confetti-animation.html",
    category: "Animation",
    description: "A confetti animation using matter.js.",
    version: "1.0.0",
    type: "html",
  },
  {
    id: "survival-game-component",
    name: "Survival Game Component",
    component: SurvivalGame,
    category: "Games",
    description: "A simple survival game component.",
    version: "1.0.0",
    type: "react",
  },

  // Add other default artifacts here
];

const ArtifactRunner = () => {
  const [artifacts] = useState(defaultArtifacts);
  const [selectedArtifact, setSelectedArtifact] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showInstructions, setShowInstructions] = useState(false);
  const [htmlContent, setHtmlContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "ascending",
  });

  const categories = useMemo(() => {
    const cats = new Set(artifacts.map((a) => a.category));
    return ["All", ...Array.from(cats)];
  }, [artifacts]);

  const sortedArtifacts = useMemo(() => {
    let sortableArtifacts = [...artifacts];
    if (sortConfig.key) {
      sortableArtifacts.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableArtifacts;
  }, [artifacts, sortConfig]);

  const filteredArtifacts = useMemo(() => {
    return sortedArtifacts.filter(
      (artifact) =>
        (selectedCategory === "All" ||
          artifact.category === selectedCategory) &&
        (artifact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          artifact.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [sortedArtifacts, searchTerm, selectedCategory]);

  useEffect(() => {
    if (selectedArtifact && selectedArtifact.type === "html") {
      setIsLoading(true);
      setError(null);
      fetch(`${process.env.PUBLIC_URL}${selectedArtifact.path}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to load artifact");
          }
          return response.text();
        })
        .then((content) => {
          setHtmlContent(content);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error loading HTML file:", error);
          setError("Failed to load artifact. Please try again later.");
          setIsLoading(false);
        });
    }
  }, [selectedArtifact]);

  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === "ascending"
          ? "descending"
          : "ascending",
    }));
  };

  const renderSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? (
        <ChevronUp size={14} />
      ) : (
        <ChevronDown size={14} />
      );
    }
    return null;
  };

  const renderInstructions = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">
            How to Add a New Artifact
          </h2>
          <button
            onClick={() => setShowInstructions(false)}
            className="text-gray-400 hover:text-gray-200"
          >
            <X size={24} />
          </button>
        </div>
        <ol className="list-decimal list-inside space-y-4 text-gray-200">
          <li>
            For React components:
            <ul className="list-disc list-inside ml-4 mt-2">
              <li>
                Create a new file in the{" "}
                <code className="bg-gray-700 p-1 rounded">src/artifacts/</code>{" "}
                directory (e.g.,{" "}
                <code className="bg-gray-700 p-1 rounded">NewArtifact.js</code>
                ).
              </li>
              <li>
                Create and export your artifact as a default React component.
              </li>
              <li>Import your new artifact in this file.</li>
            </ul>
          </li>
          <li>
            For HTML files:
            <ul className="list-disc list-inside ml-4 mt-2">
              <li>
                Create a new HTML file in the{" "}
                <code className="bg-gray-700 p-1 rounded">
                  public/artifacts/html/
                </code>{" "}
                directory (e.g.,{" "}
                <code className="bg-gray-700 p-1 rounded">
                  new-artifact.html
                </code>
                ).
              </li>
              <li>
                Ensure your HTML file is self-contained (includes any necessary
                CSS and JavaScript).
              </li>
            </ul>
          </li>
          <li>
            Add a new entry to the{" "}
            <code className="bg-gray-700 p-1 rounded">defaultArtifacts</code>{" "}
            array:
            <pre className="bg-gray-700 p-2 rounded mt-2">
              {`{
              id: 'unique-id-for-new-artifact',
              name: 'New Artifact Name',
              component: NewArtifact, // for React components
              path: '/artifacts/html/new-artifact.html', // for HTML files
              category: 'Your Category',
              description: 'Brief description of your artifact.',
              version: '1.0.0',
              type: 'react', // or 'html' for HTML files
            },`}
            </pre>
          </li>
          <li>
            Save all changes and restart your development server if necessary.
          </li>
          <li>Your new artifact should now appear in the Artifact Runner!</li>
        </ol>
        <p className="mt-4 text-sm text-gray-400">
          Note: Ensure that your artifact (React component or HTML file) is
          self-contained and doesn't rely on external resources that aren't
          available in the Artifact Runner environment.
        </p>
      </div>
    </div>
  );

  const renderArtifactList = () => (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-white">
        Claude Artifact Runner
      </h1>
      <p className="text-gray-300 mb-6">
        An interactive web application for showcasing and exploring various web
        development artifacts. Search, sort, and interact with React components
        and HTML files in a unified interface. Perfect for educational purposes,
        code demonstrations, and component libraries.
      </p>
      <div className="mb-4 flex flex-col sm:flex-row items-stretch sm:items-center">
        <div className="relative flex-grow mb-2 sm:mb-0 sm:mr-4">
          <input
            type="text"
            placeholder="Search artifacts..."
            className="w-full p-2 pl-8 border rounded bg-gray-700 text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-2 top-2 text-gray-400" size={20} />
        </div>
        <select
          className="p-2 border rounded bg-gray-700 text-white"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <button
          onClick={() => setShowInstructions(true)}
          className="flex items-center text-blue-400 hover:text-blue-300"
        >
          <PlusCircle className="mr-2" size={20} />
          How to Add a New Artifact
        </button>
      </div>
      {filteredArtifacts.length === 0 ? (
        <p className="text-gray-400">
          No artifacts found matching your criteria.
        </p>
      ) : (
        <div>
          <div className="grid grid-cols-3 gap-4 mb-2 text-gray-300 font-semibold">
            <button
              onClick={() => handleSort("name")}
              className="flex items-center"
            >
              Name {renderSortIcon("name")}
            </button>
            <button
              onClick={() => handleSort("category")}
              className="flex items-center"
            >
              Category {renderSortIcon("category")}
            </button>
            <button
              onClick={() => handleSort("version")}
              className="flex items-center"
            >
              Version {renderSortIcon("version")}
            </button>
          </div>
          <ul className="space-y-4">
            {filteredArtifacts.map((artifact) => (
              <li
                key={artifact.id}
                className="border p-4 rounded hover:shadow-md transition-shadow border-gray-700 hover:shadow-lg hover:shadow-gray-700"
              >
                <h2 className="text-xl font-semibold mb-2">
                  <button
                    className="text-blue-400 hover:text-blue-300"
                    onClick={() => setSelectedArtifact(artifact)}
                  >
                    {artifact.name}
                  </button>
                </h2>
                <p className="text-gray-300 mb-2">{artifact.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Tag size={16} className="text-gray-400 mr-1" />
                    <span className="text-sm text-gray-400">
                      {artifact.category}
                    </span>
                  </div>
                  <span className="text-sm text-gray-400">
                    v{artifact.version}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const renderSelectedArtifact = () => (
    <div className="p-4">
      <button
        className="mb-4 flex items-center text-blue-400 hover:text-blue-300"
        onClick={() => setSelectedArtifact(null)}
      >
        <ArrowLeft className="mr-2" size={20} />
        Back to List
      </button>
      <h2 className="text-2xl font-bold mb-2 text-white">
        {selectedArtifact.name}
      </h2>
      <p className="text-gray-300 mb-4">{selectedArtifact.description}</p>
      <div className="flex items-center text-sm text-gray-400 mb-4">
        <Tag size={16} className="mr-1" />
        <span className="mr-4">{selectedArtifact.category}</span>
        <span>Version: {selectedArtifact.version}</span>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-64 text-red-500">
          <AlertCircle size={24} className="mr-2" />
          <span>{error}</span>
        </div>
      ) : selectedArtifact.type === "react" ? (
        <selectedArtifact.component />
      ) : (
        <iframe
          srcDoc={htmlContent}
          title={selectedArtifact.name}
          className="w-full h-[calc(100vh-250px)] border-none"
          sandbox="allow-scripts"
        />
      )}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="min-h-screen bg-gray-900">
        {selectedArtifact ? renderSelectedArtifact() : renderArtifactList()}
        {showInstructions && renderInstructions()}
      </div>
    </div>
  );
};

export default ArtifactRunner;
