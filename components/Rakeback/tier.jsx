import {authedAPI, createNotification} from "../../util/api";

function RakebackTier(props) {

  function formatTimeLeft() {
    let timeLeft = props?.claimAt - props?.time
    const totalSeconds = Math.floor(timeLeft / 1000)
    const days = Math.floor(totalSeconds / 86400)
    const hours = Math.floor((totalSeconds % 86400) / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    return `${days}d ${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`
  }

  async function claimRakeback() {
    if (!props?.active || props?.reward < props?.min) return

    let res = await authedAPI('/user/rakeback/claim', 'POST', JSON.stringify({
      type: props?.tier?.toLowerCase()
    }), true)

    if (res.success) {
      createNotification('success', `Successfully claimed your ${props?.tier} rakeback for a total of ${props?.reward}.`)
      props?.onClaim(props?.tier)
    }
  }

  return (
    <>
          
      <div className={'period-wrapper ' + (props?.active ? 'active' : '')}>
        <div className='period'>
          <div class="rakeback-gift">
          <img className='rakeback-gift' src='/assets/icons/rakeback-gift.svg' height='87' width='87'/>
          </div>
        </div>

        <div className='amount' onClick={async () => claimRakeback()}>
          <p>{props?.tier === 'INSTANT' ? 'Normal' : props?.tier} Rakeback</p>
          <p className='claimable'>
            <img src='/assets/icons/coin.svg' height='16' width='16' alt=''/>&nbsp;
            {props?.reward?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </p>
        </div>

        <div className='claim'>

          <div className='timer'>
            <div className='bar'/>
          </div>

          <button class='claim-button' onClick={async () => claimRakeback()}>
            {(props?.reward < props?.min) ?
              `You're not eligible to claim!` : props?.active ? 'CLAIM NOW' : `CLAIM IN ${formatTimeLeft()}`}
          </button>
        </div>
      </div>

      <style jsx>{`
        .period-wrapper {
          flex: 1;
          
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 25px;
          font-size: 12px;
          font-weight: 700;
        }
        
        
        .period {
          width: 80px;
          height: 80px;
          
          display: flex;
          align-items: center;
          justify-content: center;
          
          border-radius: 50%;
          
          background: transparent;
          position: relative;

          color: rgba(173, 163, 239, 1);
          font-size: 14px;
          font-weight: 700;
        }
        
        .arrows {
          position: absolute;
        }
        
        .amount {
          width: 100%;
          min-height: 45px;
          height: auto;
          
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          border-radius: 5px;
          color: #0077DB;
          font-weight: 600;
          font-size: 15px;
          
          cursor: pointer;
        }
        
        .active .amount {
          background: transparent;
          border: none;
          color: #0077DB;
        }
        
        .claimable {
          color: white;
          display: flex;
          align-items: center;
          margin-top: 1px;
          gap: 3px;
        }
        
        .active .amount .claimable {
          opacity: 1;
        }
        
        .claim {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        
        .timer {
          width: 100%;
          height: 6px;
          
          border-radius: 2525px;
          background: #121528;
          
          margin: 8px 0;
        }
        
        .active .timer {
          background: #3B447A;
        }
        
        .claim-button {
          background: unset;
          border: unset;
          outline: unset;
          
          font-family: "Montserrat", sans-serif;
          font-size: 12px;
          font-weight: 700;
          color: #757CA7;
        }
        
        .active .claim-button {
          cursor: pointer;
          color: #0077DB;
        }
      `}</style>
    </>
  )
}

export default RakebackTier