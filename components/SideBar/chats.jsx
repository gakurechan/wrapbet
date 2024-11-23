import { addDropdown } from "../../util/api";
import { useRain } from "../../contexts/raincontext";
import { createEffect, createSignal, For } from "solid-js";

const rooms = {
  EN: {
    icon: "/assets/icons/english.png",
    name: "English",
  },
  // BEG: {
  //  icon: "/assets/icons/begging.png",
  // name: "BEGGING",
  // },
  // VIP: {
  // icon: "/assets/icons/whale.png",
  // name: "WHALE LOUNGE",
  // },
};

function Chats(props) {
  const [rain, userRain] = useRain();
  const [active, setActive] = createSignal(false);
  addDropdown(setActive);

  function tryToSwitchRooms(roomKey) {
    if (props.ws) {
      props.ws.emit("chat:join", roomKey);
    }
  }

  return (
    <>
      {!rain()?.active && !userRain() ? (
        <div class="Chats__Container_View">
          <div
            class="Chats Chats__Button__View "
            onClick={(e) => {
              //  setActive(!active());
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <img src={rooms[props.room].icon} />

            <p class="chat-name">{rooms[props.room].name}</p>
            <div class="online">
              <div class="Online__Icon" />
              {props?.online?.channels["EN"]}
            </div>
            <svg
              class={active() ? "active" : ""}
              width="7"
              height="5"
              viewBox="0 0 7 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.50001 0.994671C3.62547 0.994671 3.7509 1.04269 3.84655 1.13852L6.8564 4.15579C7.04787 4.34773 7.04787 4.65892 6.8564 4.85078C6.66501 5.04263 6.5 4.99467 6.16316 4.99467L3.50001 4.99467L1 4.99467C0.5 4.99467 0.335042 5.04254 0.14367 4.85068C-0.0478893 4.65883 -0.0478893 4.34764 0.14367 4.1557L3.15347 1.13843C3.24916 1.04258 3.3746 0.994671 3.50001 0.994671Z"
                fill="#9AA0C1"
              />
            </svg>
          </div>
        </div>
      ) : (
        <> </>
      )}

      <style jsx>{`
        .Chats__Container_View {
          width: 100%;
          height: 35px;

          font-family: "Monserrat", sans-serif;
          font-weight: 700;
          font-size: 14px;
          color: #fff;

          position: relative;
          z-index: 3;
        }

        .Chats__Button__View {
          outline: unset;
          border: unset;

          font-family: "Montserrat", sans-serif;
          color: #fff;
          cursor: pointer;

          background: #262c52;
          border: solid 0.5px #41479b;
          border-radius: 3px;
          transition: background-color 0.3s;
        }

        .Chats {
          width: 100%;
          height: 100%;

          display: flex;
          align-items: center;
          justify-content: space-between;

          padding: 0 15px;
          cursor: pointer;
          position: relative;
        }

        .chat-name {
          width: 100%;
          left: 0;
          position: absolute;
          text-align: center;

          user-select: none;
        }

        svg.active {
          transform: rotate(180deg);
        }

        .decoration-arrow {
          width: 13px;
          height: 9px;

          top: 1px;
          background: #201b3d;
          position: absolute;
          right: 0;

          border-left: 1px solid #2d2654;
          border-right: 1px solid #2d2654;
          border-top: 1px solid #2d2654;

          clip-path: polygon(0% 100%, 100% 0%, 100% 100%);
        }

        .rooms {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 10px;

          border: 1px solid #2d2654;
          background: #201b3d;

          margin-top: 9px;
        }

        .room {
          display: flex;
          align-items: center;
          text-align: left;

          height: 30px;

          background: #312a5e;
          box-shadow: 0px -1px 0px #3c3472, 0px 1px 0px #1b1734;
          border-radius: 3px;

          gap: 10px;
          padding: 0 7px;
          transition: background-color 0.3s;

          cursor: pointer;
        }

        .room:hover {
          background: #332f61;
        }

        .online {
          padding: 3px 5px;
          background: transparent;
          border-radius: 3px;

          font-family: "Montserrat";
          font-weight: 700;
          font-size: 11px;
          color: #59e878;

          margin-left: auto;
          position: relative;
          z-index: 0;

          display: flex;
          align-items: center;
          gap: 10px;
          margin-right: 10px;
        }

        .online:before {
          position: absolute;
          top: 1px;
          left: 1px;

          content: "";

          width: calc(100% - 2px);
          height: calc(100% - 2px);
          border-radius: 3px;
          margin-right: 10px;

          z-index: -1;
          background: transparent;
        }

        .Online__Icon {
          width: 10px;
          height: 10px;

          background: transparent;
          border-radius: 2px;

          display: flex;
          align-items: center;
          justify-content: center;

          position: relative;
        }

        .Online__Icon:after {
          height: 5px;
          width: 5px;

          content: "";

          background: #59e878;
          box-shadow: 0px 0px 4px #59e878;
          border-radius: 2px;
        }
      `}</style>
    </>
  );
}

export default Chats;
