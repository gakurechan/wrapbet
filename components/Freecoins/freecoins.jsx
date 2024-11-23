import {useSearchParams} from "@solidjs/router";
import {createResource, createSignal, Show} from "solid-js";
import {authedAPI, createNotification} from "../../util/api";

function Freecoins(props) {

  const [searchParams, setSearchParams] = useSearchParams()
  const [affCode, setAffCode] = createSignal('')
  const [affRes, { mutate: setAffRes }] = createResource(fetchCode)
  const [promo, setPromo] = createSignal('')

  async function fetchCode(paramsCode) {
    try {
      let res = await authedAPI('/user/affiliate/usedCode', 'GET', null)

      if (res.code) {
        setAffRes(true)
        return res.code
      }
      setAffRes(false)
      return ''
    } catch (e) {
      setAffRes(false)
      console.error(e)
      return ''
    }
  }

  function close() {
    setSearchParams({ modal: null })
  }

  return (
    <>
      <div class='modal' onClick={() => close()}>
        <div class='freecoins-container' onClick={(e) => e.stopPropagation()}>

          <p className='close bevel-light' onClick={() => close()}>X</p>

          <div class='input-wrapper'>
            <p class='title-text'>REDEEM AFFILIATE CODE</p>
            <div class='input'>
              <input type='text' placeholder='Enter the code you want to redeem...' value={affCode()} onInput={(e) => setAffCode(e.target.value)}/>

              <Show when={!affRes.loading}>
                {!affRes() && (
                  <button className='redeem button-blue' onClick={async () => {
                    if (affCode().length < 1) return

                    let res = await authedAPI('/user/affiliate', 'POST', JSON.stringify({
                      code: affCode()
                    }), true)

                    if (res.success) {
                      createNotification('success', `Successfully redeemed affiliate code ${affCode()}.`)
                    }
                  }}>REDEEM</button>
                )}
              </Show>
            </div>
          </div>

          <p class='claim-more'> To find affiliate codes you can simply look within our Discord server or social medias, or you can be referred by a friend or content creator.</p>
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
          cubic-bezier(0,1,0,1);

          display: flex;
          align-items: center;
          justify-content: center;

          z-index: 1000;
        }

        .freecoins-container {
          max-width: 700px;
          max-height: 200px;

          height: 100%;
          width: 100%;

          border-radius: 15px;
          border: 1px solid #3F4880;
          background: #282F58;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 30px;
          
          transition: max-height .3s;
          position: relative;
        }

        @media (max-width: 768px) {
          .freecoins-container {
            padding: 18px;
            max-height: 100%;
            height: auto;
          }
        }

        .fancy-title {
          width: 300px;
          height: 50px;
          
          position: absolute;
          top: -25px;

          background: conic-gradient(from 180deg at 50% 50%, #FFDC18 -0.3deg, #B17818 72.1deg, rgba(156, 99, 15, 0.611382) 139.9deg, rgba(126, 80, 12, 0.492874) 180.52deg, rgba(102, 65, 10, 0.61) 215.31deg, #B17818 288.37deg, #FFDC18 359.62deg, #FFDC18 359.7deg, #B17818 432.1deg);
          border-radius: 8px;

          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 0 0 0 10px;

          color: #FFF;
          font-size: 28px;
          font-weight: 700;
          
          z-index: 1;
        }

        .fancy-title:after {
          position: absolute;
          content: '';
          width: calc(100% - 2px);
          height: calc(100% - 2px);

          top: 1px;
          left: 1px;
          z-index: -1;
          border-radius: 8px;

          background: linear-gradient(0deg, rgba(255, 190, 24, 0.25), rgba(255, 190, 24, 0.25)), linear-gradient(252.77deg, #1A0E33 -27.53%, #423C7A 175.86%);
        }
        
        .input-wrapper {
          display: flex;
          flex-direction: column;
          gap: 12px;

          color: #FFF;
          font-size: 14px;
          font-weight: 700;

          width: 100%;
          max-width: 600px;
        }
        
        .input {
          border-radius: 3px;
          border: 1px solid #3F4880;
          background: #191F3B;

          width: 100%;
          height: 50px;
          
          display: flex;
          align-items: center;
          gap: 12px;
          
          padding: 0 8px 0px 16px;
        }
        
        input {
          width: 100%;
          height: 100%;
          
          border: unset;
          outline: unset;
          background: unset;
          
          font-family: "Montserrat", sans-serif;
          color: white;
          font-weight: 400;
        }
        
        input::placeholder {
          color: #8E86A6;
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
              
              .redeem {
                width: 85px;
                height: 30px;
                
                position: relative;
                
                font-size: 14px;
      }
      
        .claim-more {
          max-width: 600px;
          color: white;
          font-size: 16px;
          text-align: center;
        }
        
        .socials {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        a {
          display: flex;
          align-items: center;
          
          height: 30px;
          padding: 0 12px;
          line-height: 30px;
          color: white;
          fill: white;
          font-weight: 600;
          font-family: "Montserrat", sans-serif;
          
          gap: 8px;
          
        }
        
        a svg {
          fill: white;
        }
        
        .bar {
          width: 190px;
          height: 1px;
          background: linear-gradient(53deg, #F90 54.58%, #F9AC39 69.11%);
        }
        
        .discord {
          border-radius: 4px;
          background: #5865F2;
          box-shadow: 0px 1.5px 0px 0px #454FB7, 0px -1.5px 0px 0px #717DFE;
        }
        
        .twitch {
          border-radius: 4px;
          background: #673AB7;
          box-shadow: 0px 1.5px 0px 0px #503286, 0px -1.5px 0px 0px #7443CB;
        }
        
        .youtube {
          border-radius: 4px;
          background: #F61C0D;
          box-shadow: 0px 1.5px 0px 0px #BE2015, 0px -1.5px 0px 0px #FF4B3F;
        }
        
        .twitter {
          border-radius: 4px;
          background: #03A9F4;
          box-shadow: 0px 1.5px 0px 0px #0788C2, 0px -1.5px 0px 0px #2DBAFA;
        }

        .close {
          width: 26px;
          height: 26px;

          background: #191F3B;
          box-shadow: border 1px solid #454D73;
          border-radius: 3px;

          display: flex;
          align-items: center;
          justify-content: center;
          
          position: absolute;
          top: 16px;
          right: 16px;

          font-weight: 700;
          color: #FFF;
          cursor: pointer;
        }

        .title-text {
          color: #0077DB;
          font-weight: 700;
        }
      `}</style>
    </>
  )
}

export default Freecoins