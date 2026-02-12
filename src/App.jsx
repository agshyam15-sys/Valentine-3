import React, { useState, useRef } from "react";

export default function App() {
  const [accepted, setAccepted] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [entered, setEntered] = useState(false);
  const audioRef = useRef(null);

  const moveNoButton = () => {
    const randomX = Math.floor(Math.random() * 200 - 100);
    const randomY = Math.floor(Math.random() * 200 - 100);
    setNoPosition({ x: randomX, y: randomY });
  };

  const handleEnter = () => {
    setEntered(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.6;
      audioRef.current.play().catch(() => {});
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/stranger-things.mp3" loop />

      {!entered ? (
        <div
          style={{
            height: "100vh",
            background: "black",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            color: "red",
          }}
          onClick={handleEnter}
        >
          <h1>ENTER THE UPSIDE DOWN</h1>
          <p>Click to begin</p>
        </div>
      ) : (
        <div
          style={{
            height: "100vh",
            background:
              "radial-gradient(circle at center, #2b0000 0%, #000000 70%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "#ff2e2e",
            position: "relative", // required for snow layer
            overflow: "hidden",
          }}
        >
          {/* Snow Layer */}
          <div className="snow"></div>

          <h1>
            {accepted
              ? "You Escaped the Upside Down ❤️"
              : "Will You Be My Valentine?"}
          </h1>

          {!accepted ? (
            <div style={{ marginTop: "30px", display: "flex", gap: "20px" }}>
              <button
                onClick={() => setAccepted(true)}
                style={{
                  padding: "10px 20px",
                  background: "darkred",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Yes ❤️
              </button>

              <button
                onMouseEnter={moveNoButton}
                style={{
                  padding: "10px 20px",
                  background: "black",
                  color: "red",
                  border: "1px solid red",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
                  transition: "transform 0.2s ease",
                }}
              >
                No
              </button>
            </div>
          ) : (
            <p style={{ marginTop: "20px" }}>
              Looks like we’re binge-watching forever together in Hawkins.
            </p>
          )}

          {/* Snow CSS */}
          <style>{`
            .snow {
              position: absolute;
              width: 100%;
              height: 100%;
              pointer-events: none;
              background-image:
                radial-gradient(2px 2px at 20px 30px, #ffffff, transparent),
                radial-gradient(2px 2px at 40px 70px, #ffffff, transparent),
                radial-gradient(2px 2px at 90px 40px, #ffffff, transparent),
                radial-gradient(2px 2px at 160px 120px, #ffffff, transparent),
                radial-gradient(2px 2px at 200px 200px, #ffffff, transparent);
              background-repeat: repeat;
              background-size: 250px 250px;
              animation: snowMove 15s linear infinite;
              opacity: 0.2;
            }

            @keyframes snowMove {
              from { transform: translateY(-250px); }
              to { transform: translateY(250px); }
            }
          `}</style>
        </div>
      )}
    </>
  );
}
