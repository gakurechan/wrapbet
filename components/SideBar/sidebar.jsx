import Chat from "../Chat/chat";
import Chats from "./chats";
import {createEffect, createSignal, onCleanup} from "solid-js";
import {useWebsocket} from "../../contexts/socketprovider";
import {createNotification} from "../../util/api";
import {useRain} from "../../contexts/raincontext";
import SidebarRain from "./rain";

function SideBar(props) {

  let previousState = false
  const [rain, userRain] = useRain()
  const [messages, setMessages] = createSignal([], {equals: false})
  const [room, setRoom] = createSignal('EN')
  const [online, setOnline] = createSignal({
    total: 0,
    channels: {
      VIP: 0,
      EN: 1,
      BEG: 0,
    }
  })
  const [emojis, setEmojis] = createSignal([])
  const [ws] = useWebsocket()

  createEffect(() => {
    if (ws() && !previousState) {
      ws().emit('chat:join', 'EN')
    }

    if (ws()) {
      ws().on('chat:pushMessage', (m) => {
        let newMessages = [...messages(), ...m].slice(-50)
        setMessages(newMessages)
      })

      ws().on('toast', (type, content, config = { duration: 3000 }) => {
        createNotification(type, content, config)
      });

      ws().on('chat:emojis', (emojis) => setEmojis(emojis))
      ws().on('chat:clear', () => setMessages([]))
      ws().on('misc:onlineUsers', (data) => setOnline(data))
      ws().on('chat:join', (response) => {
        if (!response.success) return
        setRoom(response.channel)
        setMessages([])
      })
      ws().on('chat:deleteMessage', (id) => {
        let index = messages().findIndex(message => message.id === +id)
        if (index < 0) return
        setMessages([
          ...messages().slice(0, index),
          ...messages().slice(index + 1)
        ])
      })
    }

    previousState = ws() && ws().connected
  })

  onCleanup(() => {
    if (!ws()) return

    ws().off('chat:pushMessage')
    ws().off('chat:clear')
    ws().off('misc:onlineUsers')
    ws().off('chat:join')
    ws().off('chat:deleteMessage')
  })

  return (
    <>
      <div class={'Side__Logo__View ' + (props.chat ? 'active' : '')}>
        <div class='Main__Logo__View'>
          {/*{!rain()?.active && !userRain() ? (*/}
          {/*    <div className='Header__Logo__View'>*/}
          {/*      <a href="/">*/}
          {/*      <img src='/assets/logo/nav-logo.png' height='53'/>*/}
          {/*      </a>*/}
          {/*    </div>*/}
          {/*  ) : (*/}
          {/*    <div className='Header__Rain'>*/}
          {/*    <SidebarRain/>*/}
          {/*    </div>*/}
          {/*  )}*/}
          <div className='Header__Logo__View'>
            <a href="/">
              <img src='/assets/logo/nav-logo.png' height='53'/>
            </a>
          </div>
        </div>

        {!(!rain()?.active && !userRain()) && (<div className='Header__Rain'>
          <SidebarRain/>
          </div>)}

        <div class='Chat__Info__View'>
          <Chats online={online()} ws={ws()} room={room()}/>
        </div>

        <Chat messages={messages()} ws={ws()} emojis={emojis()}/>
      </div>

      <style jsx>{`
        .Side__Logo__View {
          min-width: 350px;
          width: 350px;
          height: 100vh;
          max-height: 100vh;

          display: flex;
          flex-direction: column;

          background: var(--gradient-bg);

          overflow: hidden;
          transition: left .3s;
        }

        @media (max-width: 1440px) {
          .Side__Logo__View {
            min-width: 300px;
            width: 300px;
          }
        }

        .Chat__Info__View {
          padding: 15px 15px;

          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .Main__Logo__View {
          width: 100%;
          min-height: 129px;
          background: #191F3B;
          border-bottom: 2px solid #0079DF;
          position: relative;
        }

        .Header__Logo__View {
          width: 100%;
          min-height: 100%;

          display: flex;
          flex-direction: column;

          align-items: center;
          justify-content: center;
          gap: 20px;

          position: relative;

          background: linear-gradient(277.39deg,rgba(19,17,41,.65) -69.8%, rgba(37, 31, 78, .65) 144.89%);
        }

        .Header__Logo__View > * {
          position: relative;
          z-index: 1;
        }

        .Header__Logo__View:after {
          position: absolute;
          left: 0;
          top: 0;

          content: '';

          width: 100%;
          height: 100%;
          background: #191F3B;
          background-image: url("/assets/header-bg.png");
          background-size: cover;
          background-position: 50%;

          z-index: 0;
        }

        @media only screen and (max-width: 1250px) {
          .Side__Logo__View {
            position: fixed;
            top: 0;
            transform: translateX(-100%);
            height: calc(100% - 60px);
            transition: transform 0.3s;
            width: 100%;
            z-index: 4;
          }

          .Side__Logo__View.active {
            top: 0;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}

export default SideBar;