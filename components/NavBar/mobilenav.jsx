import {A} from "@solidjs/router";
import {createSignal} from "solid-js";
import {addDropdown, logout} from "../../util/api";
import UserDropdown from "./userdropdown";
import "./mobilenav.css"

const menu = [
	{href: "/leaderboard", text: "Leaderboard"},
	{href: "/marketplace", text: "Marketplace"},
	{href: "/affiliates", text: "Affiliates"},
	{href: "https://discord.gg/rbxtide", text: "Discord"},
	{href: "/info/tos", text: "TOS"}
]


function BottomNavBar(props) {

	const [menuDropdown, setMenuDropdown] = createSignal(false)
	const [active, setActive] = createSignal(false)
	addDropdown(setActive)

	return (<>
		<div class='bottom-navbar'>
			<button class={['button', menuDropdown() && 'active'].join(" ")} onClick={(e) => {
				e.stopPropagation()
				setMenuDropdown(!menuDropdown())
				setActive(false)
				props.setChat(false)
			}}>
				<svg width="21" height="17" viewBox="0 0 21 17" fill="#E8E5FF" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M3.21068 16.2549C3.21068 16.2549 3.19201 16.6601 3.64101 16.6601C4.19974 16.6601 8.81744 16.6546 8.81744 16.6546L8.82522 12.9118C8.82522 12.9118 8.75207 12.2952 9.42986 12.2952H11.5784C12.3807 12.2952 12.3317 12.9118 12.3317 12.9118L12.3223 16.6429C12.3223 16.6429 16.7019 16.6429 17.3898 16.6429C17.9594 16.6429 17.9338 16.1389 17.9338 16.1389V9.23694L10.7917 3.63202L3.21068 9.23763C3.21068 9.23763 3.21068 16.2549 3.21068 16.2549Z"
						fill="white"/>
					<path
						d="M0.418579 8.71575C0.418579 8.71575 1.06135 9.76217 2.46596 8.71575L10.8555 2.45304L18.7205 8.67661C20.3453 9.71067 20.9546 8.67661 20.9546 8.67661L10.8555 0.604645L0.418579 8.71575Z"
						fill="white"/>
					<path d="M18.5291 2.43869H16.5066L16.5152 4.60362L18.5291 6.11214V2.43869Z" fill="white"/>
				</svg>

				<p>Menu</p>

				{/*<UserDropdown user={props?.user} active={menuDropdown()} setActive={setMenuDropdown} mobile={true}/>*/}
				<div className={'dropdown ' + (menuDropdown() ? 'active' : '')} onClick={(e) => e.stopPropagation()}>
					<div className='dropdown-container'>
						<div class={"dropdown-container__logo"}>
							<A href={"/"} onClick={(e) => {
								e.stopPropagation()
								setMenuDropdown(false)
							}}>
								<img src='/assets/logo/nav-logo.png' height='53'/>
							</A>
						</div>
						{menu.map(i => <A href={i.href} activeClass={"active"} onClick={(e) => {
							e.stopPropagation()
							setMenuDropdown(false)
						}}>
                            <span className="Home__Link__Container">
                                <p className="Home__Link">{i.text}</p>
                            </span>
						</A>)}
					</div>
				</div>
			</button>

			<button class={'button ' + (active() ? 'active' : '')} onClick={(e) => {
				e.stopPropagation()
				setActive(!active())
				setMenuDropdown(false)
				props.setChat(false)
			}}>
				<svg width="21" height="17" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="#E8E5FF">
					<path
						d="M192 64C86 64 0 150 0 256S86 448 192 448H448c106 0 192-86 192-192s-86-192-192-192H192zM496 168a40 40 0 1 1 0 80 40 40 0 1 1 0-80zM392 304a40 40 0 1 1 80 0 40 40 0 1 1 -80 0zM168 200c0-13.3 10.7-24 24-24s24 10.7 24 24v32h32c13.3 0 24 10.7 24 24s-10.7 24-24 24H216v32c0 13.3-10.7 24-24 24s-24-10.7-24-24V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h32V200z"/>
				</svg>
				<p>Games</p>

				<div class={'dropdown ' + (active() ? 'active' : '')} onClick={(e) => e.stopPropagation()}>
					<div class='dropdown-container'>
						<div class={"dropdown-container__logo"}>
							<A href={"/coinflip"} activeClass={""} onClick={(e) => {
								e.stopPropagation()
								setActive(false)
							}}>
								<img src='/assets/logo/nav-logo.png' height='53'/>
							</A>
						</div>
						<A href="/coinflip" activeClass={"active"} onClick={(e) => {
							e.stopPropagation()
							setActive(false)
						}}>
                <span class="Home__Link__Container">
                  <img
					  src="/assets/icons/coinflip-home.svg"
					  alt=""
					  height="10"
				  />
                  <p class="Home__Link">Coinflip</p>
                </span>
						</A>

				{/*		<A href="/jackpot" activeClass={"active"} onClick={(e) => {*/}
				{/*			e.stopPropagation()*/}
				{/*			setActive(false)*/}
				{/*		}}>*/}
                {/*<span class="Home__Link__Container">*/}
                {/*  <img*/}
				{/*	  src="/assets/icons/jackpot-home.svg"*/}
				{/*	  alt=""*/}
				{/*	  height="10"*/}
				{/*  />*/}
                {/*  <p class="Home__Link">Jackpot</p>*/}
                {/*</span>*/}
				{/*		</A>*/}
					</div>
				</div>
			</button>

			<button class={['button', props.chat && 'active'].join(" ")} onClick={() => {
				props.setChat(!props.chat)
				setMenuDropdown(false)
				setActive(false)
			}}>
				<svg width="17" height="17" viewBox="0 0 17 17" fill="#E8E5FF" xmlns="http://www.w3.org/2000/svg">
					<g id="Group">
						<g id="Group_2">
							<path id="Vector"
								  d="M15.1785 0H1.82142C0.815477 0 0 0.815478 0 1.82142V11.5357C0 12.5416 0.815477 13.3571 1.82142 13.3571H3.97678L3.64651 16.326C3.60969 16.6593 3.85003 16.9593 4.18333 16.9961C4.35544 17.0151 4.52748 16.9597 4.65619 16.8439L8.53094 13.3571H15.1785C16.1845 13.3571 16.9999 12.5416 16.9999 11.5357V1.82142C16.9999 0.815478 16.1845 0 15.1785 0Z"/>
						</g>
					</g>
				</svg>
				<p>Chat</p>
			</button>
		</div>

		<style jsx>{`
            .bottom-navbar {
                display: none;
            }

            .button {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;

                position: relative;

                outline: unset;
                border: unset;
                background: unset;
                padding: unset;

                gap: 5px;
                height: 100%;
                flex: 1;

                color: #E8E5FF;
                font-size: 12px;
                font-weight: 700;
                font-family: "Montserrat";

                cursor: pointer;
                transition: color .3s;
            }

            svg {
                transition: fill .3s;
            }

            .button:hover svg {
                opacity: 0.6;
            }

            .button.active {
                color: white;
                border-bottom: 2px solid #0077DB;
            }

            .button.active svg {
                fill: #0077DB;
            }

            .dropdown {
                width: 100%;
                left: 0;
                bottom: 60px;
                position: fixed;
                height: calc(100% - 86px - 60px);
                max-height: 100%;
                transform: translateY(120%);
                transition: transform 0.3s;
            }

            .dropdown.active {
                max-height: 100% !important;
                transform: translateY(0);
            }

            .dropdown .dropdown-container {
                width: 100%;
                height: 100%;
                margin-top: 0;
                justify-content: center;
                border: 0;
                border-radius: 0;
            }

            .dropdown.active .decoration-arrow {
                z-index: 1;
            }

            .decoration-arrow {
                width: 13px;
                height: 9px;

                background: #26214A;
                position: absolute;
                left: 50%;
                bottom: 0;
                transform: translateX(-50%);
                z-index: -1;

                clip-path: polygon(0% 0%, 50% 100%, 100% 0%);
            }

            .dropdown-container {
                margin-bottom: 8px;
                padding: 9px;

                border: 1px solid #262C52;
                background: #191F3B;
                border-radius: 10px;

                font-family: 'Montserrat';
                font-weight: 600;
                font-size: 13px;
                color: #ADA3EF;

                display: flex;
                flex-direction: column;
                align-items: center;
            }

            .dropdown-container__logo {
                position: absolute;
                top: 24px;
                left: 50%;
                transform: translateX(-50%);
            }

            .dropdown-container__logo * {
				filter: none!important;
			}

            .gamemode {
                width: 100%;
                aspect-ratio: 218 / 98;
                border-radius: 6px;
                height: fit-content;

                display: flex;
                align-items: center;

                position: relative;
                background-size: 100% 100%;
                background-position: center;
                transition: background .3s;
            }

            .gamemode:hover {
                background-size: 110% 110%;
            }

            .gamemode img {
                width: 100%;
            }

            .name {
                width: 100%;
                height: 25px;
                border-radius: 0 0 6px 6px;

                background: rgba(0, 0, 0, 0.32);


                display: flex;
                align-items: center;
                justify-content: center;

                left: 0;
                bottom: 0;
                position: absolute;
                color: white;
            }

            .Home__Link__Container {
                display: flex;
                align-items: center;
                margin-left: 0;
                cursor: pointer;
                margin-right: 10px;
            }

            .Home__Link__Container img {
                margin-right: 8px;
            }

            .Home__Link {
                color: #fff;
                align: center;
            }

            @media only screen and (max-width: 1000px) {
                .bottom-navbar {
                    display: flex;
                    position: fixed;
                    bottom: 0;

                    height: 60px;
                    width: 100%;

                    background: #191F3B;
                    box-shadow: 0px -5px 15px 0px rgba(0, 0, 0, 0.25);

                    align-items: center;
                    justify-content: space-between;
                    padding: 0;
                }
            }
		`}</style>
	</>);
}

export default BottomNavBar;