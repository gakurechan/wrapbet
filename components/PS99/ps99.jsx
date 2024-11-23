import { useSearchParams } from "@solidjs/router";
import { createSignal, onMount } from "solid-js";
import { authedAPI } from "../../util/api";

function PS99(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [bots, setBots] = createSignal([]);

  async function fetchBots() {
    try {
      const res = await authedAPI(
        "/trading/items/bots?game=ps99",
        "GET",
        null,
        true
      );
      if (res.bots && res.bots.length > 0) {
        setBots(res.bots);

      } else {
        console.error("Invalid bots response:", res);
      }
    } catch (e) {
      console.error("Error fetching bots:", e);
    }
  }

  onMount(fetchBots);

  function close() {
    setSearchParams({ modal: null });
  }

  return (
    <>
      <div class="modal" onClick={() => close()}>
        <div class="ps99-container" onClick={(e) => e.stopPropagation()}>
            {(botGroup) => (
              <div class="bot-group" key={botGroup}>
                    <For each={bots()} fallback={<p class="white">No bots available.</p>}>
      {(bot) => (
        <div class="bot-card" key={bot.botId}>
          <img src={bot.image_url} alt="Bot Image" class="bot-image" />
          <div class="bot-details">
            <div class="bot-info">
              <p class="bot-name">{bot.name}</p>
              <img src="/assets/icons/online.svg" alt="Online" class="online-icon" />
            </div>
            <button class="button-blue join">
              <a href={bot.privateServerUrl} target="_blank">Join server</a>
            </button>
          </div>
        </div>
      )}
    </For>
              </div>
            )}

          <p class="desc-text">
            Don't fall for any fake bots, always check the name before trading.
            We are not responsible if you lose any items, if this happens please
            contact support and we will resolve this issue.
          </p>
        </div>
      </div>

      <style jsx>{`
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(24, 23, 47, 0.55);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .ps99-container {
          max-width: 870px;
          width: 100%;
          padding: 30px;
          border-radius: 15px;
          background: #282F58;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .close {
          position: absolute;
          top: 16px;
          right: 16px;
          font-weight: 700;
          color: #FFF;
          cursor: pointer;
        }

        .bot-group {   
          display: flex;
          flex-direction: column;
          align-items: center;     
        }

        .bot-card {
          display: flex;
          align-items: center;
          gap: 20px;
          width: 100%;
          max-width: 600px;
          margin-top: 10px;
        }

        .bot-image {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          border: 2px solid #0077DB;
        }

        .bot-details {
          flex: 1;
          color: #FFF;
        }

        .bot-info {
          display: flex;
          align-items: center;
        }

        .bot-name {
          margin-right: 10px;
          margin-bottom: 5px;
          font-weight: bold;
        }

        .online-icon {
          margin-left: 1px;
          margin-bottom: 5px;
        }

        a {
          color: #fff;
        }

        a:hover {
          color: #fff;
        }

        input {
          width: 100%;
          height: 40px;
          border-radius: 3px;
          border: 1px solid #B17818;
          background: rgba(44, 35, 72, 0.67);
          color: white;
          padding: 8px;
          font-family: "Montserrat", sans-serif;
        }

        input::placeholder {
          color: #8E86A6;
        }

        .desc-text {
          color: white;
          font-size: 16px;
          text-align: center;
          margin-top: 5px;
        }

        .button-blue {
            outline: unset;
            border: unset;

            font-family: "Montserrat", sans-serif;
            color: white;
            font-weight: 500;
            font-size: 13px
            cursor: pointer;

            background: linear-gradient(#1A60E7, #1A60E7) padding-box, linear-gradient(to bottom, #4098FF, #2C79EE) border-box;
            background-blend-mode: overlay, normal;
            box-shadow: 0 0 31px #8b75ff2e;
            border: 1px solid transparent;
            border-radius: 5px;
            transition: background-color .3s;
             }
              
              .join {
                width: 150px;
                height: 40px;
                
                position: relative;
                
                font-size: 14px;
      }

      `}</style>
    </>
  );
}

export default PS99;
