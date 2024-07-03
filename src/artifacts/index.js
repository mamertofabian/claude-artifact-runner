import React, { useState, useMemo } from "react";
import { ArrowLeft, Search, Tag, PlusCircle, X } from "lucide-react";

// Import your artifacts here
import DjangoStaticFilesExplainer from "./django-static-files-explainer";
// import OtherArtifact from './OtherArtifact';

const artifacts = [
  {
    name: "Django Static Files Explainer",
    component: DjangoStaticFilesExplainer,
    category: "Web Development",
    description: "Interactive explanation of Django static files concepts.",
  },
  // {
  //   name: 'Other Artifact',
  //   component: OtherArtifact,
  //   category: 'Data Science',
  //   description: 'Description of the other artifact.'
  // },
];

const ArtifactRunner = () => {
  const [selectedArtifact, setSelectedArtifact] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showInstructions, setShowInstructions] = useState(false);

  const categories = useMemo(() => {
    const cats = new Set(artifacts.map((a) => a.category));
    return ["All", ...Array.from(cats)];
  }, []);

  const filteredArtifacts = useMemo(() => {
    return artifacts.filter(
      (artifact) =>
        (selectedCategory === "All" ||
          artifact.category === selectedCategory) &&
        (artifact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          artifact.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm, selectedCategory]);

  const renderInstructions = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">How to Add a New Artifact</h2>
          <button
            onClick={() => setShowInstructions(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        <ol className="list-decimal list-inside space-y-4">
          <li>
            Create a new file in the{" "}
            <code className="bg-gray-100 p-1 rounded">src/artifacts/</code>{" "}
            directory for your artifact (e.g.,{" "}
            <code className="bg-gray-100 p-1 rounded">NewArtifact.js</code>).
          </li>
          <li>
            In this new file, paste your artifact code and ensure it's exported
            as a default React component.
          </li>
          <li>
            Open{" "}
            <code className="bg-gray-100 p-1 rounded">
              src/artifacts/index.js
            </code>{" "}
            and import your new artifact at the top of the file:
            <pre className="bg-gray-100 p-2 rounded mt-2">
              import NewArtifact from './NewArtifact';
            </pre>
          </li>
          <li>
            In the same file, add a new entry to the{" "}
            <code className="bg-gray-100 p-1 rounded">artifacts</code> array:
            <pre className="bg-gray-100 p-2 rounded mt-2">
              {`{
  name: 'New Artifact Name',
  component: NewArtifact,
  category: 'Your Category',
  description: 'Brief description of your artifact.'
},`}
            </pre>
          </li>
          <li>
            Save all changes and restart your development server if necessary.
          </li>
          <li>Your new artifact should now appear in the Artifact Runner!</li>
        </ol>
        <p className="mt-4 text-sm text-gray-600">
          Note: Always ensure that your artifact component is self-contained and
          doesn't rely on external dependencies that aren't available in the
          Artifact Runner environment.
        </p>
      </div>
    </div>
  );

  const renderArtifactList = () => (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Claude Artifact Runner</h1>
      <div className="mb-4 flex items-center">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search artifacts..."
            className="w-full p-2 pl-8 border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-2 top-2 text-gray-400" size={20} />
        </div>
        <select
          className="ml-4 p-2 border rounded"
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
      <button
        onClick={() => setShowInstructions(true)}
        className="mb-4 flex items-center text-blue-500 hover:text-blue-700"
      >
        <PlusCircle className="mr-2" size={20} />
        How to Add a New Artifact
      </button>
      {filteredArtifacts.length === 0 ? (
        <p className="text-gray-500">
          No artifacts found matching your criteria.
        </p>
      ) : (
        <ul className="space-y-4">
          {filteredArtifacts.map((artifact, index) => (
            <li
              key={index}
              className="border p-4 rounded hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2">
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => setSelectedArtifact(artifact)}
                >
                  {artifact.name}
                </button>
              </h2>
              <p className="text-gray-600 mb-2">{artifact.description}</p>
              <div className="flex items-center">
                <Tag size={16} className="text-gray-400 mr-1" />
                <span className="text-sm text-gray-500">
                  {artifact.category}
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
        className="mb-4 flex items-center text-blue-500 hover:text-blue-700"
        onClick={() => setSelectedArtifact(null)}
      >
        <ArrowLeft className="mr-2" size={20} />
        Back to List
      </button>
      <h2 className="text-2xl font-bold mb-4">{selectedArtifact.name}</h2>
      <selectedArtifact.component />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      {selectedArtifact ? renderSelectedArtifact() : renderArtifactList()}
      {showInstructions && renderInstructions()}
    </div>
  );
};

export default ArtifactRunner;
