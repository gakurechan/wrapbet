function LoadingScreen(props) {
  return (
    <>
      <div className="loader-container">
        <div className="logo-container">
          <img src="/assets/logo/logo-long.png" height="100" />
        </div>

        <div className="background" />

        <style jsx>{`
          .loader-container {
            height: 100vh;
            width: 100vw;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 30px;
            position: relative;
            overflow: hidden;
          }

          .logo-container {
            opacity: 0.6; 
          }

          .background {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url("/assets/background.png");
            mix-blend-mode: luminosity;
            z-index: -1;
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
          }

          @keyframes pulse {
            0% {
              opacity: 0.6;
            }
            50% {
              opacity: 1; 
            }
            100% {
              opacity: 0.6;
            }
          }

          .logo-container img {
            animation: pulse 1.5s ease-in-out infinite;
          }
        `}</style>
      </div>
    </>
  );
}

export default LoadingScreen;
