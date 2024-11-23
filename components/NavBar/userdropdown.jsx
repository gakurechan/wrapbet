import {A, useSearchParams} from "@solidjs/router";
import {ADMIN_ROLES} from "../../resources/users";
import {createNotification, logout} from "../../util/api";

function UserDropdown(props) {

	const [searchParams, setSearchParams] = useSearchParams()

	return (
		<>
			<div class={'dropdown' + (props?.mobile ? ' mobile ' : ' ') + (props.active ? 'active' : '')}
				 onClick={(e) => e.stopPropagation()}>

				<div class='links'>
					{props?.mobile && (
						<A href='/withdraw' class='Dropdown__Links' onClick={() => props.setActive(false)}>
							<img src='/assets/icons/cart.svg' height='12' alt=''/>
							Withdraw
						</A>
					)}

					<A href='/profile/history' class='Dropdown__Links' onClick={() => props.setActive(false)}>
						<img src='/assets/icons/user.svg' height='12' alt=''/>
						Profile
					</A>

					<A href='/profile/transactions' class='Dropdown__Links' onClick={() => props.setActive(false)}>
						<img src='/assets/icons/transactions.svg' height='12' alt=''/>
						Transactions
					</A>

					<A href='/profile/settings' class='Dropdown__Links' onClick={() => props.setActive(false)}>
						<img src='/assets/icons/settings.svg' height='12' alt=''/>
						Settings
					</A>

					{/*<A href='/profile/history' class='Dropdown__Links' onClick={() => props.setActive(false)}>*/}
					{/*	<img src='/assets/icons/history.svg' height='12' alt=''/>*/}
					{/*	History*/}
					{/*</A>*/}

					{/*<div class='Dropdown__Links' onClick={() => {*/}
					{/*	setSearchParams({modal: 'redeemcode'})*/}
					{/*	props.setActive(false)*/}
					{/*}}>*/}
					{/*	<svg width="16" height="16" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
					{/*		<path*/}
					{/*			d="M6.66667 3C5.7474 3 5 3.76875 5 4.71429V13.2857C5 14.2313 5.7474 15 6.66667 15H16.6667C17.5859 15 18.3333 14.2313 18.3333 13.2857V7.28571C18.3333 6.34018 17.5859 5.57143 16.6667 5.57143H7.08333C6.85417 5.57143 6.66667 5.37857 6.66667 5.14286C6.66667 4.90714 6.85417 4.71429 7.08333 4.71429H16.6667C17.1276 4.71429 17.5 4.33125 17.5 3.85714C17.5 3.38304 17.1276 3 16.6667 3H6.66667ZM15.8333 9.42857C16.0543 9.42857 16.2663 9.51888 16.4226 9.67962C16.5789 9.84037 16.6667 10.0584 16.6667 10.2857C16.6667 10.513 16.5789 10.7311 16.4226 10.8918C16.2663 11.0526 16.0543 11.1429 15.8333 11.1429C15.6123 11.1429 15.4004 11.0526 15.2441 10.8918C15.0878 10.7311 15 10.513 15 10.2857C15 10.0584 15.0878 9.84037 15.2441 9.67962C15.4004 9.51888 15.6123 9.42857 15.8333 9.42857Z"*/}
					{/*			fill="#E8E5FF"/>*/}
					{/*	</svg>*/}
					{/*	Redeem Code*/}
					{/*</div>*/}

					<div class='Dropdown__Links' onClick={() => logout()}>
						<img src='/assets/icons/signout.svg' height='12' alt=''/>
						Sign out
					</div>

					{ADMIN_ROLES?.includes(props?.user?.role) && (
						<A href='/admin' className='Dropdown__Links' onClick={() => props?.setActive(false)}>
							<img src='/assets/icons/user.svg' height='12' alt=''/>
							Admin
						</A>
					)}
				</div>
			</div>

			<style jsx>{`
                .dropdown {
                    position: absolute;
                    min-width: 180px;
                    max-height: 0;

                    top: 40px;
                    right: 0;
                    z-index: 1;

                    border-radius: 5px;
                    transition: max-height .3s;
                    overflow: hidden;

                    cursor: default;
                }

                .mobile {
                    top: unset;
                    min-width: 200px;
                    left: 0;
                    bottom: 60px;
                    position: fixed;
                    height: calc(100% - 86px - 60px);
                    max-height: 100%;
                    transform: translateY(120%);
                    transition: transform 0.3s;
                    z-index: 0;
                }
                
                .mobile .links {
                    width: 100%;
                    height: 100%;
                    margin-top: 0;
                    justify-content: center;
                    border: 0;
                    border-radius: 0;
                }
                
                .mobile.dropdown.active {
                    max-height: 100%!important;
                    transform: translateY(0);
                }

                .dropdown.active {
                    max-height: 240px;
                }

                svg.active {
                    transform: rotate(180deg);
                }


                .mobile .decoration-arrow {
                    display: none;
                }

                .links {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                    padding: 10px;

                    border: 1px solid #282F58;
                    border-radius: 5px;
                    background: #1B213E;

                    margin-top: 9px;
                }
			`}</style>
		</>
	);
}

export default UserDropdown;
