
import React, { useState, useEffect } from "react";

export default function App() {
  const [accepted, setAccepted] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });

  const moveNoButton = () => {
    const randomX = Math.floor(Math.random() * 300 - 150);
    const randomY = Math.floor(Math.random() * 300 - 150);
    setNoPosition({ x: randomX, y: randomY });
  };

  useEffect(() => {
    const startAudio = () => {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.type = "sawtooth";
      oscillator.frequency.setValueAtTime(55, ctx.currentTime);
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      gainNode.gain.setValueAtTime(0.02, ctx.currentTime);
      oscillator.start();

      document.removeEventListener("click", startAudio);
    };

    document.addEventListener("click", startAudio);
  }, []);

  return (
    <div className="container">
      <div className="flicker-overlay"></div>

      <h1 className="title">
        {accepted
          ? "You Escaped the Upside Down ❤️"
          : "Will You Be My Valentine?"}
      </h1>

      {!accepted ? (
        <div className="buttons">
          <button className="yes" onClick={() => setAccepted(true)}>
            Yes ❤️
          </button>

          <button
            className="no"
            onMouseEnter={moveNoButton}
            style={{ transform: `translate(${noPosition.x}px, ${noPosition.y}px)` }}
          >
            No
          </button>
        </div>
      ) : (
        <p className="message">
          Looks like we’re binge-watching forever together in Hawkins.
        </p>
      )}

      <style>{`
        body {
          margin: 0;
          background: radial-gradient(circle at center, #2b0000 0%, #000000 70%);
          font-family: 'Courier New', monospace;
          color: #ff2e2e;
          overflow: hidden;
        }

        .container {
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          position: relative;
        }

        .title {
          font-size: 3rem;
          text-shadow: 0 0 10px red, 0 0 20px darkred;
          animation: glow 2s infinite alternate;
        }

        @keyframes glow {
          from { text-shadow: 0 0 5px #ff0000; }
          to { text-shadow: 0 0 20px #ff4d4d; }
        }

        .buttons {
          margin-top: 40px;
          display: flex;
          gap: 30px;
        }

        button {
          padding: 12px 28px;
          font-size: 1.2rem;
          border: none;
          cursor: pointer;
          border-radius: 12px;
          transition: 0.3s ease;
        }

        .yes {
          background: #8b0000;
          color: white;
          box-shadow: 0 0 15px red;
        }

        .yes:hover {
          background: #b30000;
        }

        .no {
          background: #111;
          color: #ff4d4d;
          position: relative;
        }

        .message {
          margin-top: 30px;
          font-size: 1.4rem;
          color: #ff8080;
        }

        .flicker-overlay {
          position: absolute;
          width: 100%;
          height: 100%;
          background: rgba(255, 0, 0, 0.05);
          animation: flicker 0.15s infinite;
          pointer-events: none;
        }

        @keyframes flicker {
          0% { opacity: 0.05; }
          50% { opacity: 0.1; }
          100% { opacity: 0.05; }
        }
      `}</style>
    </div>
  );
}
