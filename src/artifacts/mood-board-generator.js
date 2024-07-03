import React, { useState, useEffect } from "react";
import { Shuffle, Plus, X } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

const colorPalettes = [
  ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8"],
  ["#F8B195", "#F67280", "#C06C84", "#6C5B7B", "#355C7D"],
  ["#A8E6CF", "#DCEDC1", "#FFD3B6", "#FFAAA5", "#FF8B94"],
  ["#D4A5A5", "#FFECDA", "#F9FFEA", "#A6D0E4", "#7E9CD6"],
];

const shapes = ["circle", "square", "triangle"];

const MoodBoardGenerator = () => {
  const [colors, setColors] = useState(colorPalettes[0]);
  const [words, setWords] = useState(["Inspiring", "Creative", "Bold"]);
  const [newWord, setNewWord] = useState("");
  const [shapeElements, setShapeElements] = useState([]);

  useEffect(() => {
    generateShapes();
  }, [colors]);

  const shuffleColors = () => {
    const newPalette =
      colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
    setColors(newPalette);
  };

  const addWord = () => {
    if (newWord && !words.includes(newWord)) {
      setWords([...words, newWord]);
      setNewWord("");
    }
  };

  const removeWord = (word) => {
    setWords(words.filter((w) => w !== word));
  };

  const generateShapes = () => {
    const newShapes = Array(20)
      .fill()
      .map(() => {
        const type = shapes[Math.floor(Math.random() * shapes.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.floor(Math.random() * 50) + 20;
        const x = Math.random() * 100;
        const y = Math.random() * 100;

        let shapeStyle = {
          position: "absolute",
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: color,
          left: `${x}%`,
          top: `${y}%`,
        };

        switch (type) {
          case "circle":
            shapeStyle.borderRadius = "50%";
            break;
          case "square":
            // No additional style needed for square
            break;
          case "triangle":
            shapeStyle = {
              ...shapeStyle,
              width: "0",
              height: "0",
              backgroundColor: "transparent",
              borderLeft: `${size / 2}px solid transparent`,
              borderRight: `${size / 2}px solid transparent`,
              borderBottom: `${size}px solid ${color}`,
            };
            break;
        }

        return <div key={`${x}-${y}-${type}`} style={shapeStyle} />;
      });

    setShapeElements(newShapes);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white">
      <h1 className="text-3xl font-bold mb-6">Mood Board Generator</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Color Palette</h2>
        <div className="flex items-center space-x-4">
          {colors.map((color, index) => (
            <div
              key={index}
              className="w-10 h-10 rounded-full"
              style={{ backgroundColor: color }}
            />
          ))}
          <Button onClick={shuffleColors} size="icon">
            <Shuffle className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Mood Words</h2>
        <div className="flex flex-wrap gap-2 mb-2">
          {words.map((word, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-200 rounded-full px-3 py-1"
            >
              <span>{word}</span>
              <Button
                onClick={() => removeWord(word)}
                variant="ghost"
                size="icon"
                className="ml-2 h-5 w-5"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
        <div className="flex space-x-2">
          <Input
            value={newWord}
            onChange={(e) => setNewWord(e.target.value)}
            placeholder="Add a mood word"
            className="flex-grow"
          />
          <Button onClick={addWord}>
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Shape Grid</h2>
        <div className="relative w-full h-80 bg-gray-100 rounded-lg overflow-hidden">
          {shapeElements}
        </div>
      </div>

      <Button onClick={generateShapes} className="w-full">
        Regenerate Shapes
      </Button>
    </div>
  );
};

export default MoodBoardGenerator;
