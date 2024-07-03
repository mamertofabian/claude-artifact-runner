import React, { useState, useMemo } from "react";
import { ArrowLeft, Search, Tag, PlusCircle, X } from "lucide-react";

// Import your artifacts here
import DjangoStaticFilesExplainer from "./django-static-files-explainer";
// import OtherArtifact from './OtherArtifact';

const defaultArtifacts = [
  {
    id: "django-static-files",
    name: "Django Static Files Explainer",
    component: DjangoStaticFilesExplainer,
    category: "Web Development",
    description: "Interactive explanation of Django static files concepts.",
    version: "1.0.0",
  },
  // Add other default artifacts here
];

const ArtifactRunner = () => {
  const [artifacts] = useState(defaultArtifacts);
  const [selectedArtifact, setSelectedArtifact] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showInstructions, setShowInstructions] = useState(false);

  const categories = useMemo(() => {
    const cats = new Set(artifacts.map((a) => a.category));
    return ["All", ...Array.from(cats)];
  }, [artifacts]);

  const filteredArtifacts = useMemo(() => {
    return artifacts.filter(
      (artifact) =>
        (selectedCategory === "All" ||
          artifact.category === selectedCategory) &&
        (artifact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          artifact.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [artifacts, searchTerm, selectedCategory]);

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
            Create a new file in the{" "}
            <code className="bg-gray-700 p-1 rounded">src/artifacts/</code>{" "}
            directory for your artifact (e.g.,{" "}
            <code className="bg-gray-700 p-1 rounded">NewArtifact.js</code>).
          </li>
          <li>
            In this new file, create and export your artifact as a default React
            component.
          </li>
          <li>
            Open{" "}
            <code className="bg-gray-700 p-1 rounded">
              src/artifacts/index.js
            </code>{" "}
            and import your new artifact at the top of the file:
            <pre className="bg-gray-700 p-2 rounded mt-2">
              import NewArtifact from './NewArtifact';
            </pre>
          </li>
          <li>
            In the same file, add a new entry to the{" "}
            <code className="bg-gray-700 p-1 rounded">defaultArtifacts</code>{" "}
            array:
            <pre className="bg-gray-700 p-2 rounded mt-2">
              {`{
  id: 'unique-id-for-new-artifact',
  name: 'New Artifact Name',
  component: NewArtifact,
  category: 'Your Category',
  description: 'Brief description of your artifact.',
  version: '1.0.0',
},`}
            </pre>
          </li>
          <li>
            Save all changes and restart your development server if necessary.
          </li>
          <li>Your new artifact should now appear in the Artifact Runner!</li>
        </ol>
        <p className="mt-4 text-sm text-gray-400">
          Note: Always ensure that your artifact component is self-contained and
          doesn't rely on external dependencies that aren't available in the
          Artifact Runner environment.
        </p>
      </div>
    </div>
  );

  const renderArtifactList = () => (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-white">
        Claude Artifact Runner
      </h1>
      <div className="mb-4 flex items-center flex-wrap">
        <div className="relative flex-grow mb-2 sm:mb-0">
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
          className="ml-0 sm:ml-4 p-2 border rounded bg-gray-700 text-white"
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
      <h2 className="text-2xl font-bold mb-4 text-white">
        {selectedArtifact.name}
      </h2>
      <selectedArtifact.component />
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
