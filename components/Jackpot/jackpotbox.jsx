import Avatar from "../Level/avatar";
import { getCents } from "../../util/balance";

function JackpotBox(props) {
  const getColorName = (color) => {
    switch (color) {
      case "#FF3838":
        return {
          name: "red",
          gradient: "linear-gradient(90deg, rgba(255, 56, 56, 0.1) 0%, rgba(33, 0, 0, 0) 100%)",
          lineColor: "#FF3838",
        };
      case "#38FF4C":
        return {
          name: "green",
          gradient: "linear-gradient(90deg, rgba(56, 255, 76, 0.1) 0%, rgba(0, 33, 0, 0) 100%)",
          lineColor: "#38FF4C",
        };
      case "#FFAF38":
        return {
          name: "yellow",
          gradient: "linear-gradient(90deg, rgba(255, 175, 56, 0.1) 0%, rgba(33, 25, 0, 0) 100%)",
          lineColor: "#FFAF38",
        };
      case "#3858FF":
        return {
          name: "blue",
          gradient: "linear-gradient(90deg, rgba(56, 88, 255, 0.1) 0%, rgba(0, 0, 33, 0) 100%)",
          lineColor: "#3858FF",
        };
      case "#A738FF":
        return {
          name: "purple",
          gradient: "linear-gradient(90deg, rgba(167, 56, 255, 0.1) 0%, rgba(25, 0, 33, 0) 100%)",
          lineColor: "#A738FF",
        };
      case "#42DAF5":
        return {
          name: "cyan",
          gradient: "linear-gradient(90deg, rgba(66, 218, 245, 0.1) 0%, rgba(0, 33, 50, 0) 100%)",
          lineColor: "#42DAF5",
        };
      case "#FF6EE7":
        return {
          name: "pink",
          gradient: "linear-gradient(90deg, rgba(255, 110, 231, 0.1) 0%, rgba(50, 0, 50, 0) 100%)",
          lineColor: "#FF6EE7",
        };
      case "#FF8629":
        return {
          name: "orange",
          gradient: "linear-gradient(90deg, rgba(255, 134, 41, 0.1) 0%, rgba(50, 25, 0, 0) 100%)",
          lineColor: "#FF8629",
        };
      default:
        return {
          name: "default",
          gradient: "linear-gradient(90deg, rgba(0, 119, 219, 0.1) 0%, rgba(21, 26, 51, 0) 100%)",
          lineColor: "#0077db",
        };
    }  
  };

  const { name: boxColorName, gradient: boxGradient, lineColor: boxLineColor } = getColorName(props?.color);

  const chance = ((props?.bet.amount || 0) / (props?.total || 1) * 100).toFixed(2);

  const truncateUsername = (name) => {
    if (name.length > 12) {
      return name.slice(0, 12) + '...'; 
    }
    return name;
  };

  return (
    <div className={`infoBox ${boxColorName}`}>
      <div className="userAvatar">
        <img
          src={`${import.meta.env.VITE_SERVER_URL}/user/${props?.bet.user.id}/img`}
          height="30"
          width="30"
        />
      </div>
      <div className="infoBoxContent">
        <span className="userName">{truncateUsername(props?.bet.user.username)}</span>
        <span className="deposit-text">
          deposited {props?.bet.items.length}{" "}
          {props?.bet.items.length === 1 ? "item" : "items"} valued at
        </span>
        <span className="deposit-details">
          <img src="/assets/icons/coin.svg" height="13" width="13" />
          <span className="value-text">{props?.bet.amount.toLocaleString()}</span>
        </span>
        <span className="deposit-text">
           with a {chance}% chance
        </span>
      </div>

      <style jsx>{`
        .infoBox {
          position: relative;
          display: flex;
          align-items: center;
          background: ${boxGradient}, #151a33; 
          color: white;
          padding: 20px;
          border-radius: 10px;
          width: 100%;
          max-width: 615px;
          text-align: left;
          box-sizing: border-box;
          animation: fadeIn 0.5s;
          transition: transform 0.5s ease;
          margin-bottom: 20px; 
          font-size: 14px;
        }

        .infoBox::before {
          content: "";
          position: absolute;
          top: 20%;
          left: 0;
          width: 5px;
          height: 60%;
          background: ${boxLineColor}; /* Color for the line */
          border-radius: 0px 10px 10px 0px;
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .infoBox:hover {
          transform: translateY(-5px);
        }

        .userAvatar {
          flex-shrink: 0;
          margin-right: 10px;
        }

        .userAvatar img {
          width: 30px;
          height: 30px;
          border-radius: 10px;
          background: #142140;
        }

        .deposit-text {
          color: #8a8c99;
        }

        .infoBoxContent {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .value-text {
          margin-left: 3px;
        }

        @media screen and (max-width: 1880px) {
      }

      @media screen and (max-width: 1400px) { 
        .infoBox {
          font-size: 10px;
          max-width: 480px;
          left: 30%
        }
      }


        @media screen and (max-width: 513px) {
          .infoBox {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}

export default JackpotBox;
