import { useSearchParams } from "@solidjs/router";
import { createResource, createSignal, onCleanup, Show } from "solid-js";
import { authedAPI } from "../../util/api";
import RakebackTier from "./tier";
import Loader from "../Loader/loader";
import { useUser } from "../../contexts/usercontextprovider";

function Rakeback(props) {
  const [user, { mutateUser }] = useUser();
  const [rewards, { mutate }] = createResource(fetchRakeback);
  const [time, setTime] = createSignal(Date.now());

  const [searchParams, setSearchParams] = useSearchParams();

  async function fetchRakeback() {
    try {
      let data = await authedAPI("/user/rakeback", "GET", null, false);
      if (!data.serverTime) return;

      data.instant.claimAt = new Date(data.instant.canClaimAt).getTime();
      data.daily.claimAt = new Date(data.daily.canClaimAt).getTime();
      data.weekly.claimAt = new Date(data.weekly.canClaimAt).getTime();
      data.monthly.claimAt = new Date(data.monthly.canClaimAt).getTime();

      return data;
    } catch (e) {
      return null;
    }
  }

  function claimTier(tier) {
    tier = tier.toLowerCase();
    let newRewards = { ...rewards() };
    newRewards[tier].unclaimedRakeback = 0;
    newRewards[tier].canClaim = false;
    newRewards[tier].claimAt = Date.now() + newRewards[tier].cooldown;
    mutateUser({
      ...user(),
      rewards: Math.max(0, user().rewards - 1),
    });

    mutate(newRewards);
  }

  function close() {
    setSearchParams({ modal: null });
  }

  let timer = setInterval(() => setTime(Date.now()), 1000);
  onCleanup(() => clearInterval(timer));

  return (
    <>
      <div class="modal" onClick={() => close()}>
        <div class="rakeback-container" onClick={(e) => e.stopPropagation()}>
          <div class="content">
            <div className="banner">
              <p className="title">
                <span className="blue-gradient"> Earn like never before,</span>{" "}
               with our Rakeback system
              </p>
              <p>
              You can earn a variety of rewards and incentives through our rakeback program.  We offer our loyal users rewards to show our appreciation. View our rewards below to start earning.
              </p>
              <p>
              If you don’t have any available rewards, that usually means they were turned off due. This may be because you have been blacklisted. If this is the case, please contact support.
              </p>

              <img
                src="/assets/img/shark-bg.png"
                height="270"
                width="240"
                alt=""
                class="shark"
              />
            </div>

            <p class="rakeback-tier"><b>Rakeback</b> <span class="tier-name">TIER 1</span></p>

            <Show when={!rewards.loading} fallback={<Loader />}>
              <div className="tiers">
                <RakebackTier
                  reward={rewards()?.instant?.unclaimedRakeback}
                  active={rewards()?.instant?.canClaim}
                  tier="Instant"
                  period="0s"
                  onClaim={claimTier}
                  claimAt={rewards()?.instant?.claimAt}
                  time={time()}
                  min={rewards()?.instant.min}
                />

                <RakebackTier
                  reward={rewards()?.daily?.unclaimedRakeback}
                  active={rewards()?.daily?.canClaim}
                  tier="Daily"
                  period="24 H"
                  onClaim={claimTier}
                  claimAt={rewards()?.daily?.claimAt}
                  time={time()}
                  min={rewards()?.daily.min}
                />

                <RakebackTier
                  reward={rewards()?.weekly?.unclaimedRakeback}
                  active={rewards()?.weekly?.canClaim}
                  tier="Weekly"
                  period="7 D"
                  onClaim={claimTier}
                  claimAt={rewards()?.weekly?.claimAt}
                  time={time()}
                  min={rewards()?.weekly.min}
                />

                <RakebackTier
                  reward={rewards()?.monthly?.unclaimedRakeback}
                  active={rewards()?.monthly?.canClaim}
                  tier="Monthly"
                  period="30 D"
                  onClaim={claimTier}
                  claimAt={rewards()?.monthly?.claimAt}
                  time={time()}
                  min={rewards()?.monthly.min}
                />
              </div>
            </Show>
          </div>
        </div>
      </div>

      <style jsx>{`
        .modal {
          position: fixed;
          top: 0;
          left: 0;

          width: 100vw;
          height: 100vh;

          background: rgba(23, 29, 47, 0.55);

          display: flex;
          align-items: center;
          justify-content: center;

          z-index: 1000;
        }

        .rakeback-container {
          max-width: 880px;
          max-height: 550px;

          height: 100%;
          width: 100%;

          background: #191f3b;
          box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
          border-radius: 15px;

          display: flex;
          flex-direction: column;

          transition: max-height 0.3s;
          position: relative;

          overflow: hidden;
        }

        .header {
          display: flex;
          align-items: center;

          min-height: 50px;
          width: 100%;

          border-radius: 15px 15px 0px 0px;
          border: 1px solid rgba(173, 163, 239, 0.1);
          background: linear-gradient(
              270deg,
              rgba(56, 41, 155, 0.2) -10.22%,
              rgba(48, 43, 81, 0.2) 107.88%
            ),
            #2f2d5a;
          box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.05);

          padding: 0 12px 0 0;
        }

        .close {
          margin-left: auto;

          width: 30px;
          height: 30px;

          background: #4e4a8d;
          box-shadow: 0px -1px 0px #5f5aa7, 0px 1px 0px #272548;
          border-radius: 3px;

          display: flex;
          align-items: center;
          justify-content: center;

          font-weight: 700;
          color: #ada3ef;
          cursor: pointer;
        }

        .pages {
          height: 100%;
        }

        .page {
          height: 100%;
          padding: 0 16px;

          display: flex;
          align-items: center;
          gap: 8px;

          color: #fff;
          font-family: Montserrat, sans-serif;
          font-size: 16px;
          font-weight: 700;

          cursor: pointer;
        }

        .page.active {
          border-radius: 15px 0px 0px 0px;
          border: 1px solid #0077DB;
          background: linear-gradient(
              53deg,
              rgba(255, 153, 0, 0.25) 54.58%,
              rgba(249, 172, 57, 0.25) 69.11%
            ),
            #353265;
        }

        .content {
          display: flex;
          flex-direction: column;
          gap: 25px;

          padding: 35px;
        }

        .banner {
          width: 100%;
          min-height: 170px;
          height: auto;

          padding: 20px;

          border-radius: 10px;
          border: 1px solid #3b447a;
          background: radial-gradient(
              145% 100% at 100% 130%,
              rgba(38, 44, 82, 0.3) 0%,
              rgba(0, 0, 0, 0) 100%
            ),
            linear-gradient(201deg, #262c52 -33.09%, #262c52 102.17%);

          display: flex;
          justify-content: center;
          flex-direction: column;
          gap: 12px;

          color: #fff;
          font-size: 12px;
          font-weight: 500;

          position: relative;
        }

        .banner > p {
          max-width: 550px;

          text-overflow: ellipsis;
          overflow: hidden;
        }

        .blue-gradient {
          color: #0077db;
        }

        .banner .title {
          color: #fff;
          font-family: Montserrat, sans-serif;
          font-size: 20px;
          font-weight: 600;
        }

        .swiggle {
          position: absolute;
          transform: scaleX(-1);
          right: 0;
          margin: auto 0;
          top: 0;
          bottom: 0;
        }

        .shark {
          position: absolute;
          right: -80px;
          bottom: -50px;
          transform: rotate(355deg);   
          filter: drop-shadow(0px 4px 15px rgba(25, 109, 252, 0.1));
        }

        .tiers {
          display: flex;
          justify-content: space-between;
          gap: 25px;
        }

        .rakeback-tier {
          color: #fff;
          font-size: 20px;
          margin-left: 5px;
        }

        .tier-name {
          font-style: italic;
          color: #0077DB;
          font-size: 22px;
          font-weight: 600;
        }

        @media only screen and (max-width: 700px) {
          .shark,
          .swiggle {
            display: none;
          }

          .banner {
            align-items: center;
          }
        }
      `}</style>
    </>
  );
}

export default Rakeback;
