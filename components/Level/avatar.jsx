import { getUserLevel } from "../../resources/levels";

function Avatar(props) {
  function levelToColor(level) {
    if (typeof level === "string") return level;

    if (level < 2) return "blue";
    if (level < 26) {
      return "blue";
    }
    if (level < 51) {
      return "purple";
    }
    if (level < 76) {
      return "orange";
    }
    if (level < 100) {
      return "gem";
    }
    return "blue";
  }

  return (
    <>
      <div
        class={
          "avatar " +
          (props?.dark ? "dark " : "") +
            (props?.isWinner ? "winner " : "") +
          levelToColor(getUserLevel(props?.xp))
        }
        style={{
          width: props.height + "px",
          height: props.height + "px",
          "min-width": props.height + "px",
        }}
      >
        {props?.id === "?" ? (
          <img
            src={
              props?.id
                ? `${import.meta.env.VITE_SERVER_URL}/user/${props?.id}/img`
                : "/assets/icons/anon.svg"
            }
            alt=""
            style={{ height: props?.id ? props.height - 2 + "px" : "16px" }}
          />
        ) : (
          <img
            src={
              props?.id
                ? `${import.meta.env.VITE_SERVER_URL}/user/${props?.id}/img`
                : "/assets/icons/anon.svg"
            }
            alt=""
            style={{ height: props?.id ? props.height - 2 + "px" : "16px" }}
          />
        )}
      </div>

      <style jsx>{`
        .avatar img {
          border-radius: 500px;
          position: relative;
          z-index: 1;
          overflow: hidden;
        }

        .avatar {
          position: relative;
          padding: 1px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .avatar.winner::before {
          background: #0085ff;
          left: -2px;
          top: -2px;
          width: calc(100% + 4px);
          height: calc(100% + 4px);
        }

        .empty {
          position: relative;
          z-index: 1;
        }


        .avatar.blueteam:before {
          background: #0085ff;
        }

        .avatar.blueteam:after {
          background: linear-gradient(
              0deg,
              rgba(62, 197, 255, 0.25) 0%,
              rgba(62, 197, 255, 0.25) 100%
            ),
            linear-gradient(230deg, #1a0e33 0%, #423c7a 100%);
        }

        .avatar:before {
          width: 100%;
          height: 100%;

          border-radius: 999px;

          content: "";
          position: absolute;

          left: 0;
          top: 0;

          background: #8f8da1;
          z-index: 0;
        }

        .avatar.dark:after {
          background: linear-gradient(
              0deg,
              rgba(0, 0, 0, 0.2) 0%,
              rgba(0, 0, 0, 0.2) 100%
            ),
            #2f2b59;
        }

        .avatar:after {
          width: calc(100% - 2px);
          height: calc(100% - 2px);

          border-radius: 999px;

          content: "";
          position: absolute;

          background: var(--background);
          z-index: 0;
        }

        .avatar.blue:before {
          background: #0085ff;
          color: #d9d9d9;
        }

         .avatar.orange:before {
          background: #0085ff;
          color: #eb7a1e;
        }
      `}</style>
    </>
  );
}

export default Avatar;
