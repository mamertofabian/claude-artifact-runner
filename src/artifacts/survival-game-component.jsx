import React, { useState, useEffect, useCallback } from "react";

const GRID_SIZE = 10;
const CELL_SIZE = 40;
const INITIAL_OPPONENTS = 3;
const MAX_OPPONENTS = 5;
const OPPONENT_MOVE_INTERVAL = 1000;
const ITEM_SPAWN_INTERVAL = 5000;

const SurvivalGame = () => {
  const [player, setPlayer] = useState({ x: 0, y: 0 });
  const [opponents, setOpponents] = useState([]);
  const [items, setItems] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [difficulty, setDifficulty] = useState(1);

  const playSound = useCallback((sound) => {
    const audio = new Audio(`/sounds/${sound}.mp3`);
    audio.play().catch((error) => {
      console.warn(`Failed to play sound: ${sound}`, error);
    });
  }, []);

  const initializeGame = useCallback(() => {
    setPlayer({ x: 0, y: 0 });
    setOpponents(
      Array.from({ length: INITIAL_OPPONENTS }, () => ({
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      }))
    );
    setItems([]);
    setScore(0);
    setGameOver(false);
    setDifficulty(1);
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const movePlayer = useCallback(
    (dx, dy) => {
      if (gameOver) return;

      setPlayer((prev) => {
        const newX = Math.max(0, Math.min(GRID_SIZE - 1, prev.x + dx));
        const newY = Math.max(0, Math.min(GRID_SIZE - 1, prev.y + dy));
        return { x: newX, y: newY };
      });
      playSound("move");
    },
    [gameOver, playSound]
  );

  const handleKeyDown = useCallback(
    (e) => {
      switch (e.key) {
        case "ArrowUp":
          movePlayer(0, -1);
          break;
        case "ArrowDown":
          movePlayer(0, 1);
          break;
        case "ArrowLeft":
          movePlayer(-1, 0);
          break;
        case "ArrowRight":
          movePlayer(1, 0);
          break;
        default:
          break;
      }
    },
    [movePlayer]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (gameOver) return;

    const moveOpponents = () => {
      setOpponents((prevOpponents) =>
        prevOpponents.map((opponent) => ({
          x: Math.max(
            0,
            Math.min(
              GRID_SIZE - 1,
              opponent.x + Math.floor(Math.random() * 3) - 1
            )
          ),
          y: Math.max(
            0,
            Math.min(
              GRID_SIZE - 1,
              opponent.y + Math.floor(Math.random() * 3) - 1
            )
          ),
        }))
      );
    };

    const opponentInterval = setInterval(
      moveOpponents,
      OPPONENT_MOVE_INTERVAL / difficulty
    );
    return () => clearInterval(opponentInterval);
  }, [gameOver, difficulty]);

  useEffect(() => {
    if (gameOver) return;

    const spawnItem = () => {
      setItems((prevItems) => [
        ...prevItems,
        {
          x: Math.floor(Math.random() * GRID_SIZE),
          y: Math.floor(Math.random() * GRID_SIZE),
        },
      ]);
    };

    const itemInterval = setInterval(spawnItem, ITEM_SPAWN_INTERVAL);
    return () => clearInterval(itemInterval);
  }, [gameOver]);

  useEffect(() => {
    if (gameOver) return;

    // Check for collisions with opponents
    const hasCollision = opponents.some(
      (opponent) => opponent.x === player.x && opponent.y === player.y
    );
    if (hasCollision) {
      setGameOver(true);
      playSound("gameover");
      return;
    }

    // Check for item collection
    const collectedItem = items.find(
      (item) => item.x === player.x && item.y === player.y
    );
    if (collectedItem) {
      setItems((prevItems) =>
        prevItems.filter((item) => item !== collectedItem)
      );
      setScore((prevScore) => prevScore + 10);
      playSound("collect");
    }

    // Increase difficulty
    if (score > 0 && score % 50 === 0) {
      setDifficulty((prev) => Math.min(prev + 0.1, 2));
      if (opponents.length < MAX_OPPONENTS) {
        setOpponents((prev) => [
          ...prev,
          {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE),
          },
        ]);
      }
    }
  }, [player, opponents, items, score, gameOver, playSound]);

  return (
    <div className="flex flex-col items-center bg-gray-100 py-10">
      <div className="mb-4">Score: {score}</div>
      <svg
        width={GRID_SIZE * CELL_SIZE}
        height={GRID_SIZE * CELL_SIZE}
        className="border border-gray-300"
      >
        {/* Grid */}
        {Array.from({ length: GRID_SIZE }).map((_, i) => (
          <React.Fragment key={i}>
            <line
              x1={0}
              y1={i * CELL_SIZE}
              x2={GRID_SIZE * CELL_SIZE}
              y2={i * CELL_SIZE}
              stroke="lightgray"
              strokeWidth="1"
            />
            <line
              x1={i * CELL_SIZE}
              y1={0}
              x2={i * CELL_SIZE}
              y2={GRID_SIZE * CELL_SIZE}
              stroke="lightgray"
              strokeWidth="1"
            />
          </React.Fragment>
        ))}
        {/* Player */}
        <circle
          cx={player.x * CELL_SIZE + CELL_SIZE / 2}
          cy={player.y * CELL_SIZE + CELL_SIZE / 2}
          r={CELL_SIZE / 3}
          fill="blue"
        />
        {/* Opponents */}
        {opponents.map((opponent, index) => (
          <circle
            key={index}
            cx={opponent.x * CELL_SIZE + CELL_SIZE / 2}
            cy={opponent.y * CELL_SIZE + CELL_SIZE / 2}
            r={CELL_SIZE / 3}
            fill="red"
          />
        ))}
        {/* Items */}
        {items.map((item, index) => (
          <rect
            key={index}
            x={item.x * CELL_SIZE + CELL_SIZE / 4}
            y={item.y * CELL_SIZE + CELL_SIZE / 4}
            width={CELL_SIZE / 2}
            height={CELL_SIZE / 2}
            fill="gold"
          />
        ))}
      </svg>
      <div className="mt-4">
        <button
          className="px-4 py-2 mr-2 bg-blue-500 text-white rounded"
          onClick={() => movePlayer(0, -1)}
        >
          Up
        </button>
        <button
          className="px-4 py-2 mr-2 bg-blue-500 text-white rounded"
          onClick={() => movePlayer(0, 1)}
        >
          Down
        </button>
        <button
          className="px-4 py-2 mr-2 bg-blue-500 text-white rounded"
          onClick={() => movePlayer(-1, 0)}
        >
          Left
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => movePlayer(1, 0)}
        >
          Right
        </button>
      </div>
      {gameOver && (
        <div className="mt-4 text-center">
          <h2 className="text-2xl font-bold">Game Over</h2>
          <p>Final Score: {score}</p>
          <button
            className="px-4 py-2 mt-2 bg-green-500 text-white rounded"
            onClick={initializeGame}
          >
            Restart
          </button>
        </div>
      )}
    </div>
  );
};

export default SurvivalGame;
