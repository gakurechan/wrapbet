import Level from "../Level/level";
import Avatar from "../Level/avatar";
import Highroller from "./highroller.svg"
import Whale from "./whale.svg"
import { STAFF_ROLES } from "../../resources/users";
import { useSearchParams } from "@solidjs/router";
import { createSignal, For } from "solid-js";


function Message(props) {
  const [params, setParams] = useSearchParams();

  const tryToParseWord = (word) => {
    if (word[0] === "@" && word.length > 3) {
      return <span style={{ color: "#999999" }}>{word}&nbsp;</span>;
    }

    if (word[0] === ":" || word[word.length - 1] === ":") {
      let emojiName = word.replaceAll(":", "").trim();
      let emoji = props?.emojis.find((emoji) => emoji.name === emojiName);
      if (!emoji) return <>{word + " "}</>;

      return (
        <>
          <img
            style={{ "vertical-align": "bottom" }}
            src={emoji.url}
            height="24px"
            alt=""
          />
          &nbsp;
        </>
      );
    }

    return word + " ";
  };

  function wasMentioned() {
    return false
  }

  return (
    <>
      <div
        class={
          "Messages__Container__View " +
          props?.user?.role +
          (wasMentioned() ? " mentioned" : "")
        }
      >
        <div class="user" onClick={() => setParams({ user: props?.user?.id })}>
          {props?.user?.role === "USER" ? (
            <Avatar id={props?.user?.id} xp={props?.user?.xp} height={30} />
          ) : props?.user?.role === "MOD" ? (
          <>
            <svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.30969 4C1.51912 7.71471 -2.28941 14.0131 1.61507 18.4623C4.47329 20.9082 8.78165 20.3925 10.3858 17.227C13.2972 11.3741 4.8322 9.65138 6.3099 4.00003L6.30969 4Z" fill="url(#paint0_radial_142_12389)"/>
            <defs>
            <radialGradient id="paint0_radial_142_12389" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(4.13334 13.6519) rotate(1.85918) scale(6.02866 7.8542)">
            <stop stop-color="#00F1FF"/>
            <stop offset="0.0001" stop-color="#6FFFA0"/>
            <stop offset="0.5" stop-color="#29E56A"/>
            <stop offset="1" stop-color="#1AD75B"/>
            </radialGradient>
            </defs>
            </svg>
            <span class="role">{props?.user?.role} {props?.user?.username}</span>
          </>
          ) : props?.user?.role === "ADMIN" ? (
          <>
            <svg width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.30969 0C1.51912 3.71471 -2.28941 10.0131 1.61507 14.4623C4.47329 16.9082 8.78165 16.3925 10.3858 13.227C13.2972 7.37407 4.8322 5.65138 6.3099 3.48544e-05L6.30969 0Z" fill="url(#paint0_radial_142_12411)"/>
            <defs>
            <radialGradient id="paint0_radial_142_12411" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(4.13334 9.65192) rotate(1.85918) scale(6.02866 7.8542)">
            <stop stop-color="#FF6F6F"/>
            <stop offset="0.5" stop-color="#E52929"/>
            <stop offset="1" stop-color="#D71A1A"/>
            </radialGradient>
            </defs>
            </svg>
            <span class="role">{props?.user?.role} {props?.user?.username}</span>
          </>
          ) : props?.user?.role === "OWNER" ? ( 
          <>
            <svg width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.30969 3.05176e-05C1.51912 3.71474 -2.28941 10.0131 1.61507 14.4624C4.47329 16.9082 8.78165 16.3925 10.3858 13.227C13.2972 7.3741 4.8322 5.65141 6.3099 6.5372e-05L6.30969 3.05176e-05Z" fill="url(#paint0_radial_142_12434)"/>
            <defs>
            <radialGradient id="paint0_radial_142_12434" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(4.13334 9.65195) rotate(1.85918) scale(6.02866 7.8542)">
            <stop stop-color="#00F1FF"/>
            <stop offset="0.5" stop-color="#00BDFF"/>
            <stop offset="1" stop-color="#0066FF"/>
            </radialGradient>
            </defs>
            </svg>  
            
            <span class="role">{props?.user?.role} {props?.user?.username}</span>
          </>
         )  : props?.user?.role === "Highroller" ? (   
        <>
          <Avatar id={props?.user?.id} xp={props?.user?.xp} height={30} />      
          <p class="username">
          <span class="highroller-user">{props?.user?.username}</span>
          </p>
          <img src={Highroller} />
        </> 
       ) : props?.user?.role === "Whale" ? (   
        <>
          <Avatar id={props?.user?.id} xp={props?.user?.xp} height={30} />      
          <p class="username">
          <span class="whale-user">{props?.user?.username}</span>
          </p>
          <img src={Whale} />
        </> 
       ) : null}

<p className="username">
  {(props?.user?.role !== "USER" || props?.user?.role === "Highroller" || props?.user?.role === "Whale") && (
<></>
  )}
  &nbsp;
  {props?.user?.role === "USER" && (
    <span>{props?.user?.username}</span>
  )}
</p>


           &nbsp;
          {props?.user?.role === "USER" && <Level xp={props?.user?.xp} />}

          <p class="time" onClick={(e) => e.stopPropagation()}>
            {new Date(props?.createdAt)?.toLocaleTimeString()}
          </p>
        </div>

        <p class="message">
          <For each={props?.content?.split(" ")}>
            {(word) => tryToParseWord(word)}
          </For>

          <span class="floaters">
            {STAFF_ROLES?.includes(props?.actualUser?.role) && (
              <img
                class="trash"
                src="/assets/icons/trash.svg"
                height="16"
                width="16"
                onClick={() => {
                  if (!props?.ws?.connected) return;
                  props?.ws?.emit("chat:sendMessage", `/delete ${props?.id}`);
                }}
              />
            )}
          </span>
        </p>
      </div>

      <style jsx>{`
        .Messages__Container__View {
          width: 100%;
          height: fit-content;
        }

        .user {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
          white-space: nowrap;
          text-overflow: ellipsis;
          cursor: pointer;
        }

        .username {
          font-weight: 600;
          font-size: 14px;
          font-family: "Montserrat", sans-serif;
          font-style: normal;
          color: white;
          margin-top: -2px;

          text-overflow: ellipsis;
          max-width: 140px;
          overflow: hidden;
        }

        .level {
          font-family: "Montserrat", sans-serif;
          font-weight: 700;
          font-size: 10px;
          color: white;

          background: #8f8da1;
          padding: 3px 5px;
          border-radius: 3px;

          margin-top: -2px;

          display: flex;
          align-items: center;
          gap: 5px;
        }

        .level p {
          margin-top: -1px;
        }

        .message {
          font-weight: 500;
          font-size: 14px;
          color: #9aa0c1;
          background: #1a1f3d;
          border-radius: 3px;
          position: relative;

          word-break: break-word;
          white-space: pre-wrap;
          -moz-white-space: pre-wrap;

          padding: 12px;
        }

        .mentioned .message {
          background: rgba(72, 135, 255, 0.15) !important;
        }

        .floaters {
          position: absolute;
          cursor: pointer;

          display: flex;
          gap: 8px;

          top: auto;
          bottom: 12px;
          right: 12px;
        }

        .trash {
          cursor: pointer;
        }

        .time {
          font-family: "Montserrat";
          font-weight: 600;
          font-size: 11px;
          margin-left: auto;

          color: #9aa0c1;
          cursor: initial;
        }

        .OWNER .message {
          background: linear-gradient(
            37deg,
            rgba(0, 119, 219, 0.15) 30.03%,
            rgba(0, 119, 219, 0.15) 42.84%
          );
          color: #0077db;
        }

        .ADMIN .message {
          background: rgba(229, 41, 41, 0.05);
          color: #E52929;
        }

        .MOD .message {
          background: rgba(89, 232, 120, 0.05);
          color: #59e878;
        }

        .DEV .message {
          background: rgba(249, 115, 57, 0.15);
          color: #f97339;
        }

        .role {
          font-size: 14px;
          font-weight: 700;
        }

        .OWNER .role,
        .OWNER .sword {
          color: #0077db;
        }

        .ADMIN .role,
        .ADMIN .sword {
          color: #E52929;
        }

        .MOD .role,
        .MOD .role {
          color: #59e878;
          fill: #59e878;
        }

        .highroller-user {
          color: #fcd144
        }

        .whale-user {
          color: #b1b1b3
        }
      `}</style>
    </>
  );
}

export default Message;
