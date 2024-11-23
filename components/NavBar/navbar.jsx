import { A, useSearchParams } from "@solidjs/router";
import { createSignal } from "solid-js";
import Circularprogress from "../Level/circularprogress";
import { progressToNextLevel } from "../../resources/levels";
import BottomNavBar from "./mobilenav";
import UserDropdown from "./userdropdown";
import { addDropdown, logout } from "../../util/api";
import { useWebsocket } from "../../contexts/socketprovider";
import { openSupport } from "../../util/support";
import Countup from "../Countup/countup";
import Inventory from "../Inventory/inventory";
import Giveaway from "../Giveaway/giveaway";

function NavBar(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [userDropdown, setUserDropdown] = createSignal(false);
  const [balanceDropdown, setBalanceDropdown] = createSignal(false);
  const [show, setShow] = createSignal(false);
  const [showGiveaway, setShowGiveaway] = createSignal(false);

  const [currencyDropdown, setCurrencyDropdown] = createSignal(false);
  const [currency, setCurrency] = createSignal(
    localStorage.getItem("currency") || "robux"
  );

  addDropdown(setUserDropdown);

  return (
    <>
      {show() && (
        <Inventory
          close={() => setShow(false)}
          total={flips()?.reduce((val, flip) => val + flip?.amount, 0)}
        />
      )}

      {showGiveaway() && (
        <Giveaway
          close={() => setShowGiveaway(false)}
          total={flips()?.reduce((val, flip) => val + flip?.amount, 0)}
        />
      )}

      <div class="navbar-container">
        <div class="main-navbar">
          <div class="content between">
            <div class="logo-wrapper">
              <a href="/">
                <img src="/assets/logo/small.png" alt="" height="42" />
              </a>
            </div>

            <div class="links">
            <a href="/">
                <button class="Button__Primary home"></button>
            </a>
              <a href="/coinflip">
                <span class="Home__Link__Container">
                  <img
                    src="/assets/icons/coinflip-home.svg"
                    alt=""
                    height="16"
                  />
                  <p class="Home__Link">Coinflip</p>
                </span>
              </a>

              <a href="/jackpot">
                <span class="Home__Link__Container">
                  <img
                    src="/assets/icons/jackpot-home.svg"
                    alt=""
                    height="16"
                  />
                  <p class="Home__Link">Jackpot</p>
                </span>
              </a>

              {/*
            
            <a href="/jackpot">
                <span class="Home__Link__Container">
                  <img
                    src="/assets/icons/jackpot-home.svg"
                    alt=""
                    height="16"
                  />
                  <p class="Home__Link">Jackpot</p>
                </span>
              </a>
            
            
            
            */}

              <a href="/marketplace">
                <span class="Home__Link__Container">
                  <img
                    src="/assets/icons/marketplace-home.svg"
                    alt=""
                    height="14"
                  />
                  <p class="Home__Link">Marketplace</p>
                </span>
              </a>
            </div>

            <div class={"content-block"}>
              {props.user && (
                <div
                  className="balance-container"
                  onClick={() => {
                    setCurrencyDropdown(!currencyDropdown());
                  }}
                >
                  <div className="balance-hover">
                    {currency() == "robux" && (
                      <div className="robux">
                        <img
                          className="coin"
                          src="/assets/icons/coin.svg"
                          height="20"
                        />
                        <p>
                          <Countup end={props?.user?.balance} gray={true} />
                        </p>
                      </div>
                    )}
                    {currency() == "usd" && (
                      <p className="fiat">
                        <span className="blue">$ </span>
                        <Countup
                          end={(props?.user?.balance / 100000) * 3}
                          gray={true}
                        />
                      </p>
                    )}
                  </div>
                  {currencyDropdown() && (
                    <div className={"balance-dropdown"}>
                      <div
                        className="robux balance-dropdown__item"
                        onClick={(e) => {
                          setCurrency("robux");
                          localStorage.setItem("currency", "robux");
                        }}
                      >
                        <img
                          className="coin"
                          src="/assets/icons/coin.svg"
                          height="20"
                        />
                        <p>
                          <Countup end={props?.user?.balance} gray={true} />
                        </p>
                      </div>
                      <p
                        className="fiat balance-dropdown__item"
                        onClick={(e) => {
                          setCurrency("usd");
                          localStorage.setItem("currency", "usd");
                        }}
                      >
                        <span className="blue">$ </span>
                        <Countup
                          end={(props?.user?.balance / 100000) * 3}
                          gray={true}
                        />
                      </p>
                    </div>
                  )}
                </div>
              )}
              {props.user && (
                <div class="wallet-container">
                  <button
                    class="deposit-button"
                    onClick={() => setBalanceDropdown(!balanceDropdown())}
                  >
                    <img src="/assets/icons/wallet.svg" alt="Market" />{" "}
                    <span>Wallet</span>
                  </button>

                  <div
                    class={
                      "deposit-dropdown " + (balanceDropdown() ? "active" : "")
                    }
                  >
                    <div class="dropdown-links">
                      <A
                        href="/deposit"
                        class="Dropdown__Links"
                        onClick={() => setBalanceDropdown(false)}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 17 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                        >
                          <mask
                            id="mask0_283_561"
                            style="mask-type:alpha"
                            maskUnits="userSpaceOnUse"
                            x="0"
                            y="0"
                            width="17"
                            height="18"
                          >
                            <rect
                              width="16.1133"
                              height="18"
                              fill="url(#pattern0_283_561)"
                            />
                          </mask>
                          <g mask="url(#mask0_283_561)">
                            <path d="M0 -1H16V20H0V-1Z" fill="#E8E5FF" />
                          </g>
                          <defs>
                            <pattern
                              id="pattern0_283_561"
                              patternContentUnits="objectBoundingBox"
                              width="1"
                              height="1"
                            >
                              <use
                                xlink:href="#image0_283_561"
                                transform="matrix(0.0116363 0 0 0.0104167 -0.0585443 0)"
                              />
                            </pattern>
                            <image
                              id="image0_283_561"
                              width="96"
                              height="96"
                              xlink:href="data:image/png;base64,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"
                            />
                          </defs>
                        </svg>
                        Deposit
                      </A>
                      <A
                        href="/withdraw"
                        class="Dropdown__Links"
                        onClick={() => setBalanceDropdown(false)}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 10 11"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.75 6.33657C9.74985 6.78353 9.62985 7.22268 9.402 7.61039C9.17415 7.99812 8.84632 8.32085 8.45107 8.54666C8.0559 8.77248 7.60702 8.8934 7.14907 8.8975C6.69112 8.9016 6.24003 8.78873 5.84063 8.57001L6.35906 10.2572C6.3759 10.3119 6.37935 10.3696 6.36924 10.4258C6.35912 10.4819 6.33568 10.5351 6.3008 10.5808C6.26592 10.6267 6.22055 10.6638 6.16832 10.6895C6.1161 10.7151 6.05845 10.7284 6 10.7285H3.75C3.69155 10.7284 3.6339 10.7151 3.58168 10.6895C3.52945 10.6638 3.48408 10.6267 3.4492 10.5808C3.41431 10.5351 3.39088 10.4819 3.38076 10.4258C3.37065 10.3696 3.37413 10.3119 3.39094 10.2572L3.90938 8.57001C3.50997 8.78873 3.0589 8.9016 2.60095 8.8975C2.143 8.8934 1.69412 8.77248 1.29889 8.54666C0.903667 8.32085 0.575842 7.99812 0.347977 7.61039C0.12012 7.22268 0.0001575 6.78353 0 6.33657C0 4.87262 0.827348 3.46173 2.39062 2.25259C3.10835 1.70018 3.89396 1.23743 4.72922 0.8751C4.77491 0.856303 4.82401 0.846619 4.8736 0.846619C4.92318 0.846619 4.97227 0.856303 5.01797 0.8751C5.85422 1.23723 6.6408 1.69998 7.35938 2.25259C8.92268 3.46173 9.75 4.87262 9.75 6.33657Z"
                            fill="#E8E5FF"
                          />
                        </svg>
                        Withdraw
                      </A>
                      <a class="Dropdown__Links" onClick={() => setShow(true)}>
                        <svg
                          width="15"
                          height="17"
                          viewBox="0 0 16 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15 5.42308L8 1.25L1 5.42308M15 5.42308L8 9.59615M15 5.42308V12.5769L8 16.75M1 5.42308L8 9.59615M1 5.42308V12.5769L8 16.75M8 9.59615V16.75"
                            stroke="#E8E5FF"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        Inventory
                      </a>
                      <a
                        class="Dropdown__Links"
                        onClick={() => setShowGiveaway(true)}
                      >
                        <svg
                          width="18"
                          height="18"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                          />
                        </svg>
                        Giveaway
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div
              class={[
                "user-container",
                !props.user && "user-container_button",
              ].join(" ")}
            >
              {props.user ? (
                <>
                  <div class="Cashier__Dropdown__Links-minified">
                    <Circularprogress
                      progress={progressToNextLevel(props?.user?.xp || 0)}
                    >
                      <div class="avatar">
                        <img
                          src={`${import.meta.env.VITE_SERVER_URL}/user/${
                            props.user?.id
                          }/img`}
                          width="31"
                          height="31"
                        />
                      </div>
                    </Circularprogress>
                  </div>

                  <div
                    class={
                      "Cashier__Dropdown__Links-wrapper " +
                      (userDropdown() ? "active" : "")
                    }
                    onClick={(e) => {
                      setUserDropdown(!userDropdown());
                      e.stopPropagation();
                    }}
                  >
                    <div class="avatar-wrapper">
                      <Circularprogress
                        progress={progressToNextLevel(props?.user?.xp || 0)}
                      >
                        <div class="avatar">
                          <img
                            src={`${import.meta.env.VITE_SERVER_URL}/user/${
                              props.user?.id
                            }/img`}
                            width="31"
                            height="31"
                          />
                        </div>
                      </Circularprogress>
                    </div>

                    <svg
                      class="arrow"
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

                    <UserDropdown
                      user={props?.user}
                      active={userDropdown()}
                      setActive={setUserDropdown}
                    />
                  </div>
                </>
              ) : (
                <button
                  class="Button__Primary Signin__Button__User"
                  onClick={() => setSearchParams({ modal: "login" })}
                >
                  Log in
                </button>
              )}
            </div>
          </div>
        </div>

        <div class="bar" />

        <div class="Secondary__Navbar__View">
          <div class="content">
            <div className={props?.user ? "navlinks" : "navlinks"}>
              {props?.user ? (
                <>
                  <a href="/affiliates" className="link">
                    <p>AFFILIATES</p>
                  </a>
                  <a href="/leaderboard" className="link">
                    <p>LEADERBOARD</p>
                  </a>
                  <a
                    onClick={() => setSearchParams({ modal: "redeemcode" })}
                    className="link"
                  >
                    <p>REDEEM CODE</p>
                  </a>
                  <a onClick={() => openSupport()} className="link">
                    <p>FAQ</p>
                  </a>
                  <a href="/info/tos" className="link">
                    <p>TOS</p>
                  </a>
                  <a href="/info/privacy" className="link">
                    <p>PRIVACY</p>
                  </a>
                  <a onClick={() => openSupport()} className="link">
                    <p>FAIRNESS</p>
                  </a>
                  <a
                    href="https://discord.gg/rbxtide"
                    target="_blank"
                    className="link"
                  >
                    <p>DISCORD</p>
                  </a>
                  <a onClick={() => logout()} className="red-link">
                    <p>LOGOUT</p>
                  </a>
                </>
              ) : (
                <>
                  <a href="/affiliates" className="link">
                    <p>AFFILIATES</p>
                  </a>
                  <a href="/leaderboard" className="link">
                    <p>LEADERBOARD</p>
                  </a>
                  <a href="/info/faq" className="link">
                    <p>FAQ</p>
                  </a>
                  <a href="/info/tos" className="link">
                    <p>TOS</p>
                  </a>
                  <a href="/info/privacy" className="link">
                    <p>PRIVACY</p>
                  </a>
                  <a href="/info/fairness" className="link">
                    <p>FAIRNESS</p>
                  </a>
                  <a
                    href="https://discord.gg/rbxtide"
                    target="_blank"
                    className="link"
                  >
                    <p>DISCORD</p>
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
        <div class="mobile-bottom-nav">
        <BottomNavBar chat={props.chat} setChat={props.setChat} />
        </div>
      </div>

      <style jsx>{`
        .navbar-container {
          width: 100%;
          height: fit-content;
          position: sticky;
          top: 0;
          left: 0;
          z-index: 2;
        }

        .mobile-bottom-nav {
          z-index: 1000;
        }

        .Secondary__Navbar__View {
          width: 100%;
          height: 43px;

          background: #262c52;

          display: flex;
          align-items: center;

          padding: 0 25px;
        }

        .main-navbar {
          width: 100%;
          height: 85px;

          background: #0f1328;
          box-shadow: 0px 3px 4px rgba(27, 33, 69);

          display: flex;
          justify-content: center;

          padding: 0 25px;
          z-index: 1;
          position: relative;
        }

        .main-navbar .content {
          max-width: 100%;
        }

        .content {
          width: 100%;
          max-width: 1175px;
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .content.between {
          justify-content: space-between;
        }

        .content-nav {
          width: 100%;
          max-width: 1175px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .content-nav.between {
          justify-content: space-between;
        }

        .balance-container {
          height: 45px;
          min-width: 160px;
          margin-left: 50%;
          gap: 0px;
          font-variant-numeric: tabular-nums;

          align-items: center;
          display: flex;

          border-radius: 5px;
          border: 1px solid #454b72;
          background: #262c52;

          font-family: "Montserrat", sans-serif;
          color: white;
          font-weight: 700;
          font-size: 14px;
        }

        .balance-dropdown {
          position: absolute !important;
          top: 100%;
          left: 0;
          min-width: 160px;
          border-radius: 5px;
          border: 1px solid #454b72;
          background: #262c52;
          padding: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .balance-dropdown__item {
          cursor: pointer;
          &:hover {
            opacity: 0.7;
          }
        }

        .balance-container > * {
          position: relative;
        }

        .balance-hover {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;

          width: 100%;

          cursor: pointer;
        }

        .rewards-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .rewards {
          border-radius: 3px;
          border: 1px solid #b17818;
          background: linear-gradient(
              0deg,
              rgba(255, 190, 24, 0.25) 0%,
              rgba(255, 190, 24, 0.25) 100%
            ),
            linear-gradient(253deg, #1a0e33 -27.53%, #423c7a 175.86%);

          height: 25px;
          padding: 0 10px;
          cursor: pointer;

          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;

          font-family: Montserrat, sans-serif;
          font-size: 12px;
          font-weight: 700;
        }

        .rewards > p {
          background: linear-gradient(53deg, #f90 54.58%, #f9ac39 69.11%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .surveys {
          height: 24px;
          padding: 0 8px;

          color: #2d2852;
          font-size: 12px;
          font-weight: 700;

          display: flex;
          align-items: center;
          gap: 4px;

          position: relative;
        }

        .robux {
          display: flex;
          align: center;
          gap: 8px;
        }

        .fiat,
        .robux {
          transition: opacity 0.3s;
        }

        .cents {
          color: #a7a7a7;
        }

        .content-block {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
          position: absolute;
          left: calc(50% - 150px);
          transform: translateX(-50%);
        }

        @media (max-width: 1600px) {
          .content-block {
            position: relative;
            left: 0;
            transform: none;
          }
        }

        @media (max-width: 1000px) {
          .content-block {
            width: 100%;
          }
        }

        .wallet-container {
          height: 45px;
          gap: 20px;
          position: relative;

          align-items: center;
          justify-content: center;
          display: flex;

          font-family: "Montserrat", sans-serif;
          color: white;
          font-weight: 700;
          font-size: 14px;
        }

        .wallet-container .deposit-dropdown {
          min-width: 160px;
          overflow: auto;
        }

        .deposit-button {
          display: flex;
          justify-content: center;
          align-items: center;
          outline: unset;
          border: unset;
          height: 41px;
          width: 100px;
          min-width: 40px;
          border-radius: 4px;
          background: radial-gradient(
            60% 60% at 50% 50%,
            #5cac1d 0%,
            #7dd934 100%
          );
          box-shadow: 0px 4px 25px rgba(125, 217, 52, 0.25);
          font-family: "Montserrat", sans-serif;
          color: white;
          font-weight: 500;
          font-size: 14px;
          gap: 8px;
          cursor: pointer;
        }

        .deposit-dropdown {
          position: absolute !important;
          top: 40px;
          right: 0;

          width: 100%;
          max-width: 180px;

          max-height: 0px;
          overflow: hidden;
          transition: max-height 0.3s;
        }

        .deposit-dropdown.active {
          max-height: 300px;
        }

        .dropdown-links {
          width: 100%;
          background: #23284a;
          border: 1px solid #424979;
          margin-top: 10px;
          padding: 10px;
          border-radius: 5px;

          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .user-container {
          display: flex;
          gap: 8px;
          align-items: center;
          height: 100%;
        }

        .Cashier__Dropdown__Links-wrapper {
          display: flex;
          align-items: center;
          height: 43px;
          position: relative;

          gap: 8px;

          font-family: "Montserrat", sans-serif;
          font-weight: 700;
          font-size: 14px;

          color: #ada3ef;
          cursor: pointer;
        }

        .avatar-wrapper {
          background: #1b213e;
          border: 1px solid #282f58;
          border-radius: 3px;
          width: 50px;
          height: 90px;

          display: flex;
          align-items: center;
          justify-content: center;

          height: 100%;
          aspect-ratio: 1;
        }

        .Cashier__Dropdown__Links-wrapper.active svg {
          transform: rotate(180deg);
        }

        .avatar {
          position: relative;
          height: 35px;
          width: 35px;
          overflow: hidden;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 3px;
        }

        .avatar img {
          position: relative;
          z-index: 1;
          border-radius: 3px;
        }

        .avatar:before {
          width: 31px;
          height: 31px;

          content: "";

          position: absolute;
          top: 2px;
          left: 2px;

          background: #1b213e;
          z-index: 1;
          border-radius: 3px;
        }

        .home {
          border: unset;
          outline: unset;
          padding: unset;
          position: relative;

          height: 45px;
          width: 45px;
          margin-right: 40px;

          background-image: url("/assets/icons/house.svg");
          background-repeat: no-repeat;
          background-position: center;

          display: flex;
          align-items: center;
          justify-content: center;

          cursor: pointer;
        }

        .Signin__Button__User {
          border: unset;
          outline: unset;
          padding: unset;

          height: 43px;
          width: 115px;

          font-family: "Montserrat";
          font-weight: 500;
          font-size: 14px;
          color: white;

          cursor: pointer;

          border-radius: 5px;
        }

        .links {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .navlinks {
          display: flex;
          gap: 15px;
          align-items: center;
          font-family: "Montserrat";
          font-weight: 700;
          font-size: 13px;
          color: #9aa0c1;
        }

        .navlinks a {
          cursor: pointer;
        }

        .navlinks-noselect {
          display: flex;
          margin-right: 150px;
          gap: 10px;
          font-family: "Montserrat";
          font-weight: 700;
          font-size: 13px;
          color: #9aa0c1;
        }

        .extralinks {
          display: flex;
          margin-left: auto;
          gap: 10px;
        }

        .link {
          font-family: "Montserrat";
          font-style: normal;
          font-weight: 700;
          font-size: 13px;

          background: #9AA0C1;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
          opacity: 0.75;
          transition: opacity 0.3s;
          text-decoration: none;
        }

        .green-link {
          font-family: "Montserrat";
          font-style: normal;
          font-weight: 700;
          font-size: 13px;

          background: #4dff49;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
          transition: opacity 0.3s;
          text-decoration: none;
        }

        .red-link {
          font-family: "Montserrat";
          font-style: normal;
          font-weight: 700;
          font-size: 13px;

          background: #ff4b55;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
          transition: opacity 0.3s;
          text-decoration: none;
        }

        .affiliates {
          background: #59e878;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
          opacity: 1;
        }

        .link:hover {
          opacity: 1;
        }

        .green-link:hover {
          cursor: pointer;
          opacity: 0.75;
        }

        .red-link:hover {
          cursor: pointer;
          opacity: 0.75;
        }

        .logout {
          color: #e35555;
          cursor: pointer;
        }

        .logout:hover {
          opacity: 0.75;
        }

        .leaderboard {
          background: linear-gradient(53.13deg, #ff9900 54.58%, #f9ac39 69.11%);
          opacity: 1;

          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
        }

        .bar {
          width: 100%;
          height: 1px;
          background: linear-gradient(#262c52 0%, #444d78 100%);
        }

        .logo-wrapper {
          display: none;
          position: relative;
        }

        .Cashier__Dropdown__Links-minified {
          display: none;
        }

        @media only screen and (max-width: 1000px) {
          .Secondary__Navbar__View,
          .links,
          .withdraw {
            display: none;
          }

          .logo-wrapper {
            display: none;
          }

          .balance-container {
            height: 35px;
            font-size: 10px;
            text-align: center;
            min-width: 120px;
            left: unset;
            position: relative;
            transform: unset;
          }

          .deposit-button {
            height: 31px;
            font-size: 10px;
          }

          .coin {
            height: 15px;
          }
        }

        .Home__Link__Container {
          display: flex;
          align-items: center;
          cursor: pointer;
          margin-right: 20px;
        }

        .Home__Link__Container img {
          margin-right: 8px;
        }

        .Home__Link {
          color: #fff;
        }

        @media (max-width: 768px) {
          .deposit-button {
            width: 40px;
          }

          .deposit-button span {
            display: none;
          }
        }

        @media only screen and (max-width: 375px) {
          .logo-wrapper {
            display: none;
          }
        }
      `}</style>
    </>
  );
}

export default NavBar;
