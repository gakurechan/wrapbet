import { createEffect, createSignal } from "solid-js";
import { useRain } from "../../contexts/raincontext";
import Captcha from "../Captcha/captcha";
import { authedAPI, createNotification } from "../../util/api";
import Countup from "../Countup/countup";
import Avatar from "../Level/avatar";

function SidebarRain(props) {
  const [rain, userRain, time, userTimer, joinedRain] = useRain();
  const [token, setToken] = createSignal(null);
  const [showCaptcha, setShowCaptcha] = createSignal(false);

  async function joinRain() {
    let res = await authedAPI(
      "/giveaway/join",
      "POST",
      JSON.stringify({
        captchaResponse: token(),
      }),
      true
    );

    if (res.success) {
      setToken(null);
      joinedRain();
      createNotification("success", `Successfully joined the giveaway.`);
    }

    if (res.error === "NOT_LINKED") {
      let discordRes = await authedAPI("/discord/link", "POST", null, true);
      if (discordRes.url) {
        attemptToLinkDiscord(discordRes.url);
      }
    }

    setShowCaptcha(false);
  }

  function attemptToLinkDiscord(url) {
    let popupWindow = window.open(
      url,
      "popUpWindow",
      "height=700,width=500,left=100,top=100,resizable=yes,scrollbar=yes"
    );
    window.addEventListener(
      "message",
      function (event) {
        if (event.data === "Authorized") {
          popupWindow.close();
          joinRain();
        }
      },
      false
    );
  }

  function handleRainJoin() {
    if (userRain()?.joined || rain()?.joined)
      return createNotification("error", "You have already joined this giveaway.");

    setShowCaptcha(true);
    hcaptcha.render("captcha-div", {
      sitekey: "e987e6e9-37cb-4784-93bc-a0032e2c9b00",
      theme: "dark",
      callback: function (token) {
        setToken(token);
        joinRain();
      },
    });
  }

  function formatTimeLeft(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }

  return (
    <>
      <Captcha active={showCaptcha()} close={() => setShowCaptcha(false)} />

      <div className="rain-container fadein">
        <p className="giveaway-host">
          {userRain()?.host?.username || "RBXTide"}{" "}
          {/*<span>HOSTED A GIVEAWAY</span>*/}
        </p>
        <div className="item-wrapper">
          <img src={userRain()?.items.image_url} height="48"/>
          <div className="item-details">
            <p>{userRain()?.items.name}</p>
            <p>
              {" "}
              <img
                  src="/assets/icons/coin.svg"
                  height="18"
                  class="coin-value"
              />
              {userRain()?.items.value}
            </p>
          </div>
        </div>
        <div class="timer">
          <img src="/assets/icons/timer.svg" height="20"/>
          <p>{formatTimeLeft(userRain() ? userTimer() : time())}</p>
        </div>
        <button
            className="button-blue claim"
            onClick={() => handleRainJoin()}
            disabled={userRain()?.joined}
        >
          {userRain()?.joined
              ? "ALREADY JOINED"
              : "JOIN GIVEAWAY"}
        </button>
      </div>

      <style jsx>{`
        .rain-container {
          width: 100%;

          top: 0;
          left: 0;
          display: flex;
          flex-direction: column;
          z-index: 1;

          align-items: center;
          justify-content: center;
          gap: 6px;

          padding: 12px 20px;

          background: #151a33;
          border-bottom: 1px solid #262c52;
          border-right: 1px solid #262c52;

          color: #fff;
          font-family: Montserrat, sans-serif;
          font-size: 12px;
          font-weight: 700;
        }

        .giveaway-host {
          text-align: right;
          width: 100%;
        }

        .amount-backing {
          width: 100%;
          height: 45px;

          background: transparent;

          display: flex;
          align-items: center;
          justify-content: flex-end;
        }

        .coin {
          position: absolute !important;
          left: -15px;
          z-index: 1;
        }

        .rain-container > * {
          position: relative;
          z-index: 1;
        }

        .timer {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-bottom: 5px;

          font-variant-numeric: tabular-nums;
        }

        .claim {
          width: 100%;
          height: 35px;

          font-family: Montserrat, sans-serif;
          font-size: 11px;
          font-weight: 700;
        }

        .fadein {
          animation: fadein 1s forwards ease;
        }

        .item-wrapper {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          position: relative;
        }

        .item-details {
          padding: 0px 8px;
          font-size: 14px;
          margin-left: 8px;
        }

        .item-details p {
          margin: 4px 0;
          font-size: 14px;
          font-weight: 700;
          color: #fff;
        }

        .coin-value {
          vertical-align: middle;
          margin-right: 5px;
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
            box-shadow: 0 0 31px #262c52;
            border: 1px solid transparent;
            border-radius: 5px;
            transition: background-color .3s;
             }

        @keyframes fadein {
          from {
            opacity: 0%;
          }
          to {
            opacity: 100%;
          }
        }
      `}</style>
    </>
  );
}

export default SidebarRain;