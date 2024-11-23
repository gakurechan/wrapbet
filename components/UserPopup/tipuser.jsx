import { createResource, createSignal, createEffect, For, Show } from "solid-js";
import { getCents } from "../../util/balance";
import { useUser } from "../../contexts/usercontextprovider";
import { authedAPI, createNotification } from "../../util/api";
import LimitedItem from "../Items/limiteditem";

function TipUser(props) {
  let robuxInput;

  const [selectedGame, setSelectedGame] = createSignal("all");
  const [searchQuery, setSearchQuery] = createSignal("");
  const [items, { mutate }] = createResource(
    () => props?.refetch?.toString(),
    fetchInventory
  );
  const [selectedItems, setSelectedItems] = createSignal([]);
  const [user] = useUser();

  createEffect(() => {
    selectedItems();
  });

  function toggleItemSelection(item) {
    setSelectedItems((prevSelectedItems) => {
      const isItemAlreadySelected = prevSelectedItems.some(
        (selectedItem) => selectedItem.itemId === item.itemId
      );
  
      if (isItemAlreadySelected) {
        const updatedItems = prevSelectedItems.filter(
          (selectedItem) => selectedItem.itemId !== item.itemId
        );
        return updatedItems;
      } else {
        const updatedItems = [item]; 
        return updatedItems;
      }
    });
  }
  function isActive(item) {
    const currentSelectedItems = selectedItems();
    return currentSelectedItems.some((selectedItem) => selectedItem.itemId === item.itemId);
  }

  function selectedCount(items) {
    if (!items) {
      return 0;
    }
    return items.length;
  }

  function calculateTotalValue(items) {
    return items().reduce((total, item) => total + item.value, 0);
  }

  function resizeInput() {
    let length = (robuxInput.value + "").length;
    let width = Math.max(12, Math.min(70, length * 10));
    robuxInput.style.width = width + "px";
  }

  async function fetchInventory() {
    try {
      let res = await authedAPI("/user/inventory", "GET", null);
      if (!res || !Array.isArray(res)) return mutate(null);
      return mutate(res);
    } catch (e) {
      console.log(e);
      return mutate([]);
    }
  }
  
  function toggleSelectedGame() {
    const currentGame = selectedGame();

    if (currentGame === "all") {
      setSelectedGame("dahood");
    } else if (currentGame === "dahood") {
      setSelectedGame("mm2");
    } else if (currentGame === "dahod") {
      setSelectedGame("mm2");
    } else {
      setSelectedGame("all");
    }
  }

  const filteredItems = () => {
    const query = searchQuery().toLowerCase();
    return items()
      ?.filter((item) => item.name.toLowerCase().includes(query))
      .filter((item) => {
        if (selectedGame() === "all") {
          return true;
        } else {
          return item.game.toLowerCase() === selectedGame();
        }
      })
      .sort((a, b) => b.value - a.value);
  };


  fetchInventory();

  console.log(props?.total)
  return (
    <>
      <div class="modal fadein" onClick={() => props.close()}>
        <div class="coinflip-create" onClick={(e) => e.stopPropagation()}>
          <div class="header">
            <button class="exit Button__Secondary" onClick={() => props.close()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="8"
                viewBox="0 0 10 8"
                fill="none"
              >
                <path
                  d="M3.9497 0.447999L5.21006 1.936L6.45216 0.447999C6.68353 0.149333 6.95752 0 7.27413 0H9.6122C9.79486 0 9.90445 0.0533333 9.94099 0.16C9.9897 0.256 9.95925 0.362666 9.84966 0.48L6.79921 3.968L9.88619 7.52C9.99578 7.63733 10.0262 7.74933 9.97752 7.856C9.94099 7.952 9.83139 8 9.64873 8H6.96361C6.68353 8 6.40954 7.85067 6.14163 7.552L4.863 6.048L3.58438 7.552C3.31647 7.85067 3.04857 8 2.78067 8H0.351272C0.180788 8 0.071191 7.952 0.0224814 7.856C-0.0262283 7.74933 0.00421525 7.63733 0.113812 7.52L3.27385 3.936L0.296473 0.48C0.186876 0.362666 0.150344 0.256 0.186876 0.16C0.235586 0.0533333 0.351272 0 0.533933 0H3.10946C3.42607 0 3.70615 0.149333 3.9497 0.447999Z"
                  fill="#FFF"
                />
              </svg>
            </button>

            <p class="title">
              <img src="/assets/icons/createcoin.svg" height="20" alt="" />
             Tip {props?.user.username}
            </p>


          </div>

          <div class="body">
          <div class={"body__search"}>
              <input
                type="text"
                placeholder="Search items..."
                value={searchQuery()}
                onInput={(e) => setSearchQuery(e.target.value)}
                className="search-bar"
              />
              <button onClick={toggleSelectedGame} className="sort-by-game">
                {selectedGame() === "all"
                  ? "All Games"
                  : selectedGame().toUpperCase()}
              </button>
            </div>
              <div class="items">
              <Show when={!items.loading} fallback={<Loader />}>
            <For each={filteredItems()?.sort((a, b) => b.value - a.value)}>
              {(item, index) => (
                <LimitedItem
                value={item?.value}
                isOnHold={item?.isOnHold}
                img={item?.image_url}
                name={item?.name}
                game={item?.game}
                active={isActive(item)}
                click={() => toggleItemSelection(item)}
                />
              )}
            </For>
          </Show>
            </div>
            {/*<For each={[]}>{(i, index) => null}</For>*/}
          </div>

          <div class="footer">
            <div class='selected info'>
               <p style="white-space: nowrap;">SELECTED {selectedCount(selectedItems())}/1</p>
            </div>

            <div class="cost">
              <img src="/assets/icons/coin.svg" height="16" alt="" />
              <p>
                {Math.floor(calculateTotalValue(selectedItems))?.toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
                <span class="gray">.{getCents(calculateTotalValue(selectedItems))}</span>
              </p>
            </div>


            <button
              class="button-blue tip"
              onClick={async () => {
                let res = await authedAPI(
                  "/user/tip",
                  "POST",
                  JSON.stringify({
                    userToSend: props?.user.id,
                    items: selectedItems(),
                  }),
                  true
                );

                if (res.success) {
                  props?.close();
                  createNotification(
                    "success",
                    `Successfully tipped ${selectedItems()[0].name} to ${props?.user.username}`
                  )
                }
              }}
            >
             Tip User
            </button>
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

                    background: rgba(24, 23, 47, 0.55);
                cubic-bezier(0, 1, 0, 1);

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    z-index: 1000;
                }

                .coinflip-create {
                    max-width: 900px;
                    width: 100%;
                    height: fit-content;
                    min-height: 340px;
                    max-height: 650px;
                    background: #191F3B;

                    display: flex;
                    flex-direction: column;
                    border-radius: 16px;
                    overflow: hidden;
                }

                .header, .footer {
                    width: 100%;
                    min-height: 70px;

                    display: flex;
                    align-items: center;
                    gap: 15px;

                    padding: 0 20px;

                    background: #262C52;
                }

                .header {
                    background: #262C52;
                }

                .footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    min-height: 60px;
                }

                @media (max-width: 575px) {
                    .footer {
                        flex-direction: column;
                        padding: 12px;
                        min-height: auto;
                    }
                }

                .footer__block {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                }
				
				@media (max-width: 575px) {
					.footer__block {
                        flex-direction: column;
					}
                }

                .info {
                    height: 30px;
                    padding: 0 20px;
                    margin-left: 0;

                    border-radius: 3px;
                    background: #1B213E;
                    line-height: 30px;

                    color: #FFFF;
                    font-size: 12px;
                    font-weight: 600;
                }

                .cost {
                    height: 30px;
					min-width: 110px;
                    padding: 0 12px;
                }

                .selected-robux {
                    width: 100%;
                    height: 25px;
                }

                .robux-input {
                    background: unset;
                    border: unset;
                    outline: unset;
                    width: 30px;

                    font-family: "Montserrat", sans-serif;
                    color: #FFF;
                    font-size: 12px;
                    font-weight: 700;
                }

                .done {
                    height: 30px;
                    width: 95px;
                }

                .bar {
                    height: 13px;
                    width: 1px;
                    background: #534F96;
                    margin: 0 10px;
                }

                .exit {
                    width: 25px;
                    height: 25px;
                    background: #191F3B;
                    color: #FFF;

                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .title {
                    color: #FFF;
                    font-size: 20px;
                    font-weight: 600;

                    display: flex;
                    align-items: center;
                    gap: 6px;
                }

               
                .body {
                    display: flex;
                    flex-direction: column;
                    flex: 1;
                    overflow: auto;
                }

                .items {
                    display: flex;
                    flex-wrap: wrap;
					justify-content: center;
                    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
                    grid-gap: 25px;
                    flex: 1;
                    overflow-y: scroll;
                    overflow-x: auto;
                    padding: 5px;
                    scrollbar-color: transparent transparent;
                    margin-top: 15px;
                    margin-bottom: 10px;
                    margin-left: 10px;
                }


                .items::-webkit-scrollbar {
                    width: 0; /* Hide scrollbar in WebKit browsers (e.g., Chrome, Safari) */
                }

                .min {
                    margin-left: auto;
                    display: flex;
                    gap: 8px;
                    align-items: center;
                    font-weight: 700;
                    font-size: 10px;
                    color: #ADA3EF;

                    border-radius: 3px;
                    background: rgba(90, 84, 153, 0.35);
                    padding: 10px 12px;
                }

                .price {
                    font-size: 12px;
                    margin-top: -2px;
                }

                .color {
                    display: flex;
                    background: unset;
                    outline: unset;
                    border: unset;
                    align-items: center;
                    cursor: pointer;
                    padding: unset;
                }

                .coin {
                    z-index: 1;
                }

                .coinname {
                    padding: 0 0 0 25px;
                    line-height: 30px;

                    font-size: 14px;
                    font-weight: 600;

                    color: rgba(255, 255, 255, 0.35);
                    position: relative;
                    z-index: 0;

                    width: 85px;
                    height: 30px;
                    margin-left: -35px;

                    transition: all .3s;
                }

                .coinname:before {
                    position: absolute;
                    top: 1px;
                    left: 1px;
                    content: '';
                    height: calc(100% - 2px);
                    width: calc(100% - 2px);
                    z-index: -1;
                }

                .blue.active .coinname {
                    color: #0077DB;
                }

                .blue.active img {
                    opacity: 0.25;
                }

                .red.active .coinname {
                    color: #FF4343;
                }

                .red.active img {
                    opacity: 0.25;
                }

                .coin {
                    background: unset;
                }

                .robux-slider-container {
                    margin-top: auto;
                    border-radius: 3px;
                    background: linear-gradient(0deg, rgba(255, 190, 24, 0.25) 0%, rgba(255, 190, 24, 0.25) 100%), linear-gradient(230deg, #1A0E33 0%, #423C7A 100%);
                    width: 100%;
                    height: 25px;
                    padding: 0 6px;

                    display: flex;
                    align-items: center;
                }

                .robux-container {
                    height: 170px;

                    border-radius: 7px;
                    border: 1px solid rgba(82, 76, 147, 0.35);
                    background: linear-gradient(230deg, rgba(26, 14, 51, 0.26) 0%, rgba(66, 60, 122, 0.26) 100%);

                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 6px;

                    padding: 15px;
                }

                .coin-container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .spiral {
                    position: absolute;
                }

                .range {
                    -webkit-appearance: none;
                    appearance: none;
                    outline: unset;

                    border-radius: 25px;
                    background: #191f3b;
                    max-width: 190px;
                    height: 6px;

                    width: 100%;
                }

                .range::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 11px;
                    height: 11px;
                    background: #2C79EE;
                    cursor: pointer;
                    border-radius: 50%;
                }

                .range::-moz-range-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 15px;
                    height: 15px;
                    background: #2C79EE;
                    cursor: pointer;
                    border-radius: 50%;
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
              
              .tip {
                width: 150px;
                height: 40px;
                
                position: relative;
                
                font-size: 14px;
      }

      .body__search {
					display: flex;
					justify-content: space-between;
					padding: 12px;
					gap: 12px;
				}

                .search-bar {
                    font-size: 16px;
                    border: none;
                    border-radius: 8px;
                    padding-left: 10px;
                    height: 40px;
                    width: 600px;
                    max-width: 300px;
                    font-size: 14px;
                    color: #FFF;
                    background: #262c52;
                    font-family: Montserrat, sans-serif;
                    display: flex;
                }

                .sort-by-game {
                    min-height: 35px;
                    min-width: 130px;
                    max-width: 300px;
                    border: none;
                    border-radius: 4px;
                    background-color: #262c52;
                    color: #fff;
                    font-size: 14px;
                    cursor: pointer;
                    font-family: Montserrat, sans-serif;
                    text-align: center;
                }

      `}</style>
    </>
  );
}

export default TipUser;
