import { createEffect, createSignal, For } from "solid-js";
import ChatMessage from "./message";
import SystemMessage from "./systemmessage";
import RainTip from "./raintip";
import RainEnd from "./rainend";
import { useUser } from "../../contexts/usercontextprovider";
import { addDropdown } from "../../util/api";

function Chat(props) {
  let sendRef
  let messagesRef
  let chatRef
  let hasLoaded = false

  const [user] = useUser()
  const [text, setText] = createSignal('')

  const [top, setTop] = createSignal(0)
  const [scroll, setScroll] = createSignal(true)

  const [replying, setReplying] = createSignal()

  const [emojisOpen, setEmojisOpen] = createSignal(false)
  addDropdown(setEmojisOpen)

  createEffect(() => {
      if (replying() || !replying()) // just to proc the effect
          sendRef.select()
  })

  createEffect(() => {
      if (!chatRef) return

      chatRef.onscroll = (e) => {
          let maxScroll = e.target.scrollHeight - e.target.clientHeight
          if (e.target.scrollTop >= maxScroll) {
              setScroll(true)
              return
          }

          if (!top()) return setTop(e.target.scrollTop)

          if (e.target.scrollTop < top() - 100) {
              setScroll(false)
              setTop(e.target.scrollTop)
              return
          }
      }
  })

  createEffect(() => {
      if (props.messages.length === 0 || !scroll()) return

      messagesRef.scrollIntoView({block: 'nearest', inline: 'end', behavior: hasLoaded ? 'smooth' : 'instant'})
      setTop(chatRef.scrollTop)
      hasLoaded = true
  })

  function resumeScrolling() {
      setScroll(true)
      messagesRef.scrollIntoView({block: 'nearest', inline: 'end', behavior: 'instant'})
      setTop(chatRef.scrollTop)
  }

  function sendMessage(message) {
      message = message.trim()
      if (message.length < 1) {
          return
      }

      if (replying() && !message.includes('@')) {
          message = `@${getReplyingTo().user.username} ${message}`
      }

      props.ws.emit('chat:sendMessage', message, replying())
      setTimeout(() => {
          setText('')
          setReplying(null)
      }, 1)
  }

  const handleKeyPress = (e, message) => {
      if (e.key === 'Backspace' && message.length === 0) {
          setReplying(null)
      }

      if (e.key === 'Enter' && props.ws) {
          sendMessage(message)
      }
  }

  function getReplyingTo() {
      return props?.messages?.find(msg => msg.id === replying())
  }

  function getRepliedMessage(id) {
      if (!id) return 'Unknown'
      let msg = props?.messages?.find(m => m.id === id)
      return msg?.content || 'Unknown'
  }

  return (
    <>
      <div class="chat-container">
        <div class="messages" ref={chatRef}>
          <div class="pusher" />
          <For each={props.messages}>
            {(message, index) =>
              message?.type === 'rain-end' ? (
                 <></>
              ) : message?.type === 'system' ? (
                <SystemMessage {...message} />
              ) : message?.type === "rain-tip" ? (
                <RainTip {...message} />
              ) : (
                <ChatMessage
                  {...message}
                  actualUser={user()}
                  ws={props?.ws}
                  emojis={props?.emojis}
                  replying={replying()}
                  setReplying={setReplying}
                  repliedMessage={getRepliedMessage(message.replyTo)}
                />
              )
            }
          </For>
          <div ref={messagesRef} />
        </div>

        <div class="Chat__Message_Send">
          <div class="message-wrapper">
            <input
              type="text"
              class="Chat__Message_Send-input"
              placeholder="Send a message..."
              value={text()}
              ref={sendRef}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => handleKeyPress(e, e.target.value)}
            />
          </div>

          <div
            class="Chat__Message__Emojis"
            onClick={(e) => {
              setEmojisOpen(!emojisOpen());
              e.stopPropagation();
            }}
          >
            <img src="/assets/icons/emoji-dwayne.png" height="20" alt="" />

            {emojisOpen() && (
              <div
                className="emojis-wrapper"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="emojis">
                  <For each={props?.emojis}>
                    {(emoji) => (
                      <img
                        src={emoji.url}
                        className="emoji"
                        alt={`:${emoji.name}:`}
                        height="24"
                        width="24"
                        onClick={() => setText(text() + ` :${emoji.name}:`)}
                      />
                    )}
                  </For>
                </div>
              </div>
            )}
          </div>
          <div
            class="Chat__Message__Sent__Button Button__Secondary"
            onClick={() => sendMessage(text())}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 22 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M21.2638 0.198604C21.3641 0.291544 21.4332 0.409515 21.4626 0.53817C21.4919 0.666824 21.4803 0.800618 21.4292 0.923277L14.1098 18.5651C14.058 18.69 13.9675 18.7978 13.8498 18.8751C13.7321 18.9525 13.5923 18.9958 13.4481 18.9997C13.3039 19.0036 13.1616 18.9679 13.0392 18.8971C12.9168 18.8263 12.8197 18.7236 12.7601 18.6018L9.69913 12.3593L14.202 8.18357C14.396 7.99063 14.5015 7.73544 14.4965 7.47176C14.4915 7.20808 14.3763 6.9565 14.1751 6.77002C13.974 6.58355 13.7026 6.47673 13.4181 6.47208C13.1337 6.46742 12.8584 6.5653 12.6503 6.74508L8.14596 10.9194L1.41212 8.08315C1.28032 8.02797 1.16911 7.93783 1.09252 7.82411C1.01593 7.71039 0.977397 7.57819 0.981782 7.44419C0.986167 7.31018 1.03327 7.18039 1.11716 7.07118C1.20104 6.96198 1.31794 6.87825 1.4531 6.83058L20.4835 0.0452562C20.6156 -0.00186852 20.7597 -0.0124639 20.8982 0.0147537C21.0366 0.0419713 21.1636 0.105834 21.2638 0.198604Z"
                fill="#9AA0C1"
              />
            </svg>
          </div>
        </div>
      </div>

      <style jsx>{`
        .chat-container {
          width: 100%;
          height: 85%;

          padding: 0px 0px 20px 0px;

          display: flex;
          flex-direction: column;
          box-sizing: border-box;

          gap: 5px;
          overflow: hidden;
          position: relative;
        }

        .messages {
          width: 100%;
          height: 100%;

          padding: 0 15px;

          display: flex;
          flex-direction: column;
          position: relative;

          gap: 15px;
          overflow-y: scroll;

          mask-image: linear-gradient(
            to top,
            black 80%,
            rgba(0, 0, 0, 0.25) 99%
          );
          scrollbar-color: transparent transparent;
        }

        .messages::-webkit-scrollbar {
          display: none;
        }

        .pusher {
          flex: 1 1 auto;
        }

        .paused {
          min-height: 50px;
          width: 100%;

          border-left: 2px solid var(--gold);
          background: rgba(28, 25, 53, 0.93);

          cursor: pointer;
          line-height: 50px;
          text-align: center;

          color: #8a81b4;
          font-family: Montserrat, sans-serif;
          font-size: 13px;
          font-weight: 600;
        }

        .Chat__Message_Send {
          background: #0f1328;
          border-radius: 3px;

          min-height: 50px;
          width: calc(100% - 30px);
          padding: 0 10px;
          margin: 0 auto;

          display: flex;
          align-items: center;
          gap: 10px;
        }

        .message-wrapper {
          display: flex;
          height: 100%;
          flex: 1;
          gap: 4px;
          align-items: center;
        }

        .Chat__Message_Send-input {
          width: 100%;
          height: 100%;

          background: unset;
          border: unset;
          outline: unset;

          font-family: "Montserrat", sans-serif;
          font-weight: 400;
          font-size: 13px;
          color: #9aa0c1;
        }

        .Chat__Message_Send-input::placeholder {
          font-family: "Montserrat", sans-serif;
          font-weight: 400;
          font-size: 13px;
          color: #9aa0c1;
          user-select: none;
        }

        .Chat__Message__Sent__Button {
          min-height: 32px;
          min-width: 32px;

          display: flex;
          align-items: center;
          justify-content: center;

          cursor: pointer;
        }

        .Chat__Message__Sent__Button svg {
          transition: fill 0.3s;
        }

        .Chat__Message__Sent__Button:hover svg {
          fill: #6862b0;
        }

        .replyto {
          display: flex;
          align-items: center;
          gap: 4px;

          color: #8f7fff;
          font-family: Rubik;
          font-size: 13px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }

        .Chat__Message__Emojis {
          min-width: 26px;
          height: 26px;

          border-radius: 3px;
          border: 1px solid #424979;
          background: #1a1f3d;

          display: flex;
          align-items: center;
          justify-content: center;

          cursor: pointer;
        }

        .emojis-wrapper {
          width: 270px;
          height: 170px;

          position: absolute;
          bottom: 80px; /* 20px padding, 50px message box, 10px from message box */

          border-radius: 3px;
          border: 1px solid #424979;
          background: #262C52;

          padding: 12px 6px 12px 12px;
          overflow-y: scroll;

          display: flex;

          left: 0;
          right: 0;
          margin: 0 auto;
          cursor: initial;
        }

        .emojis-wrapper::-webkit-scrollbar {
          width: 3px;
        }

        .emojis-wrapper::-webkit-scrollbar-track {
          background: #221f3d;
        }

        .emojis-wrapper::-webkit-scrollbar-thumb {
          background: #635c9c;
        }

        .emojis {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .emoji {
          cursor: pointer;
        }
      `}</style>
    </>
  );
}

export default Chat;
