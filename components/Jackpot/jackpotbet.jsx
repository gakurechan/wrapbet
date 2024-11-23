import Avatar from "../Level/avatar";
import { getCents } from "../../util/balance";

function JackpotBet(props) {
  const getColorName = (color) => {
    switch (color) {
      case "#FF3838":
        return {
          name: "red",
          lineColor: "#FF3838",
        };
      case "#38FF4C":
        return {
          name: "green",
          lineColor: "#38FF4C",
        };
      case "#FFAF38":
        return {
          name: "yellow",
          lineColor: "#FFAF38",
        };
      case "#3858FF":
        return {
          name: "blue",
          lineColor: "#3858FF",
        };
      case "#A738FF":
        return {
          name: "purple",
          lineColor: "#A738FF",
        };
      case "#42DAF5":
        return {
          name: "cyan",
          lineColor: "#42DAF5",
        };
      case "#FF6EE7":
        return {
          name: "pink",
          lineColor: "#FF6EE7",
        };
      case "#FF8629":
        return {
          name: "orange",
          lineColor: "#FF8629",
        };
      default:
        return {
          name: "default",
          lineColor: "#0077db",
        };
    }
  };

  const { name: lineName } = getColorName(props?.color);

  return (
    <>
      <div className="jp-bet">
        <div className={"top-line " + lineName}></div>

        <img
          src={`${import.meta.env.VITE_SERVER_URL}/user/${props?.user}/img`}
          height="30"
          className="avatar"
        />

        <div className="content">
          {/* Item image and name */}
          <div className="item">
            <img
              src={props.item.image_url}
              height="60"
              width="60"
              alt="Jackpot Item"
              className="item-image"
            />
            <p className="item-name">{props?.item.name}</p>{" "}
          </div>
        </div>

        <div className="cost">
          <img src="/assets/icons/coin.svg" height="16" width="16" alt="" />
          <span>
            {props?.item.value.toLocaleString(undefined, {
              maximumFractionDigits: 0,
              minimumFractionDigits: 0,
            })}
            .<span className="cents">{getCents(props?.item.value)}</span>
          </span>
        </div>
      </div>

      <style jsx>{`
        .jp-bet {
          position: relative;
          height: 175px;
          min-height: 150px;
          max-width: 150px;
          background: #1a1f3d;
          display: flex;
          align-items: center;
          padding: 1px;
          border-radius: 10px;
          overflow: hidden;
          margin-top: 25px;
          flex: 1;
        }

        .avatar {
          position: absolute;
          top: 10px;
          left: 10px;
          border-radius: 50%;
          overflow: hidden;
          background: #0f1328;
        }

        .content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .cost {
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 100%;
          border-bottom-left-radius: 10px;
          border-bottom-right-radius: 10px;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          color: #ffffff;
          background: #0f1328;
          font-size: 14px;
          height: 25px;
        }

        .user {
          display: flex;
          align-items: center;
          gap: 12px;
          justify-content: flex-end;
          color: #ada3ef;
          font-size: 14px;
          font-weight: 700;
        }

        .item {
          display: flex;
          flex-direction: column; /* Stack image and text */
          align-items: center; /* Center items horizontally */
          gap: 12px;
          font-size: 13px;
          font-weight: 600;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .item-image {
          width: auto; 
          height: auto; 
          max-width: 100px; 
          max-height: 85px; 
        }

        .item-name {
          color: #ffffff;
          font-size: 12px;
          margin-top: 5px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 80%; /* Adjust as needed */
        }

        .cents {
          color: #a7a7a7;
        }

        .centered-image {
          display: flex;
          align-items: center;
          margin-top: 10px;
        }

        .centered-image img {
          max-width: 100px;
          height: auto;
        }

        .centered-image p {
          color: #ffffff;
          font-size: 12px;
          margin-top: 5px;
        }

        .top-line {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 2px;
          background-color: #ffffff;
        }

        .blue {
          background: #3858ff;
          border-radius: 15px;
          border: 2px solid #4176ff;
        }

        .purple {
          background: #a738ff;
          border-radius: 15px;
          border: 2px solid #a738ff;
        }

        .red {
          background: #ff3838;
          border-radius: 15px;
          border: 2px solid #ff3838;
        }

        .yellow {
          background: #ffaf38;
          border-radius: 15px;
          border: 2px solid #ffaf38;
        }

        .green {
          background: #38ff4c;
          border-radius: 15px;
          border: 2px solid #38ff4c;
        }

        .cyan {
          background: #42daf5;
          border-radius: 15px;
          border: 2px solid #42daf5;
        }

        .pink {
          background: #ff6ee7;
          border-radius: 15px;
          border: 2px solid #ff6ee7;
        }

        .orange {
          background: #ff8629;
          border-radius: 15px;
          border: 2px solid #ff8629;
        }

        .gold {
          background: #db5fdd;
          border-radius: 15px;
          border: 2px solid #fca31e;
        }
      `}</style>
    </>
  );
}

export default JackpotBet;
