import React, { useState, useRef } from "react";

export default function App() {
  const [accepted, setAccepted] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [entered, setEntered] = useState(false);
  const audioRef = useRef(null);

  const moveNoButton = () => {
    const randomX = Math.floor(Math.random() * 300 - 150);
    const randomY = Math.floor(Math.random() * 300 - 150);
    setNoPosition({ x: randomX, y: randomY });
  };

  const handleEnter = () => {
    setEntered(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(() => {});
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/stranger-things.mp3" loop />

      {!entered ? (
        <div className="enter-screen" onClick={handleEnter}>
          <h1>ENTER THE UPSIDE DOWN</h1>
          <p>Click to begin</p>
        </div>
      ) : (
        <div className={`container ${accepted ? "love-mode" : ""}`}>
          <div className="fog"></div>
          <div className="particles"></div>

          <h1
            className="glitch"
            data-text={
              accepted
                ? "Even the Upside Down can't keep us apart ❤️"
                : "Will You Be My Valentine?"
            }
          >
            {accepted
              ? "Even the Upside Down can't keep us apart ❤️"
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
                style={{
                  transform: `translate(${noPosition.x}px, ${noPosition.y}px)`
                }}
              >
                No
              </button>
            </div>
          ) : (
            <p className="message">
              In every universe… in every timeline…  
              I’d still choose you. 🖤
            </p>
          )}

          <style>{`
            body {
              margin: 0;
              overflow: hidden;
              background: black;
              font-family: 'Courier New', monospace;
            }

            .enter-screen {
              height: 100vh;
              background: black;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              color: red;
              cursor: pointer;
              text-align: center;
              animation: pulse 2s infinite;
            }

            .container {
              height: 100vh;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              text-align: center;
              position: relative;
              color: #ff2e2e;
              background: radial-gradient(circle at center, #1a0000 0%, #000 80%);
            }

            .love-mode {
              background: radial-gradient(circle at center, #330000 0%, #000 80%);
              animation: heartbeat 1.5s infinite;
            }

            .glitch {
              font-size: 2.8rem;
              position: relative;
              text-transform: uppercase;
              color: #ff2e2e;
            }

            .glitch::before,
            .glitch::after {
              content: attr(data-text);
              position: absolute;
              left: 0;
              width: 100%;
              overflow: hidden;
            }

            .glitch::before {
              color: #ff0000;
              animation: glitchTop 1s infinite;
              clip-path: inset(0 0 50% 0);
            }

            .glitch::after {
              color: #990000;
              animation: glitchBottom 1s infinite;
              clip-path: inset(50% 0 0 0);
            }

            @keyframes glitchTop {
              0% { transform: translate(-2px, -2px); }
              100% { transform: translate(2px, 2px); }
            }

            @keyframes glitchBottom {
              0% { transform: translate(2px, 2px); }
              100% { transform: translate(-2px, -2px); }
            }

            .buttons {
              margin-top: 40px;
              display: flex;
              gap: 30px;
            }

            button {
              padding: 12px 28px;
              font-size: 1.1rem;
              border-radius: 10px;
              cursor: pointer;
              border: none;
            }

            .yes {
              background: darkred;
              color: white;
              box-shadow: 0 0 20px red;
              transition: 0.3s;
            }

            .yes:hover {
              background: crimson;
              box-shadow: 0 0 30px red;
            }

            .no {
              background: black;
              color: #ff4d4d;
              border: 1px solid red;
              position: relative;
            }

            .message {
              margin-top: 30px;
              font-size: 1.4rem;
              color: #ff8080;
              animation: fadeIn 2s ease forwards;
            }

            .particles {
              position: absolute;
              width: 100%;
              height: 100%;
              background-image: radial-gradient(#ff0000 1px, transparent 1px);
              background-size: 40px 40px;
              opacity: 0.15;
              animation: moveParticles 20s linear infinite;
              pointer-events: none;
            }

            .fog {
              position: absolute;
              width: 200%;
              height: 200%;
              background: radial-gradient(circle, rgba(255,0,0,0.1), transparent 70%);
              animation: fogMove 25s linear infinite;
              pointer-events: none;
            }

            @keyframes moveParticles {
              from { transform: translateY(0); }
              to { transform: translateY(-200px); }
            }

            @keyframes fogMove {
              from { transform: translate(-25%, -25%); }
              to { transform: translate(-35%, -35%); }
            }

            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }

            @keyframes pulse {
              0% { opacity: 0.8; }
              50% { opacity: 1; }
              100% { opacity: 0.8; }
            }

            @keyframes heartbeat {
              0% { transform: scale(1); }
              25% { transform: scale(1.02); }
              50% { transform: scale(1); }
              75% { transform: scale(1.02); }
              100% { transform: scale(1); }
            }
          `}</style>
        </div>
      )}
    </>
  );
}
