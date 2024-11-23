import Avatar from "../Level/avatar";
import Level from "../Level/level";
import TipUser from "./tipuser";
import {api, authedAPI, createNotification} from "../../util/api";
import {createResource, createSignal, Show} from "solid-js";
import Loader from "../Loader/loader";
import {useSearchParams} from "@solidjs/router";
import {useWebsocket} from "../../contexts/socketprovider";

function UserModal(props) {
	const [params, setParams] = useSearchParams();
	const [user] = createResource(() => params.user, getUser);
	const [tip, setTip] = createSignal(0);
	const [open, setOpen] = createSignal(false);
	const [ws] = useWebsocket();

	async function getUser(userid) {
		try {
			let res = await api(`/user/${userid}/profile`, "GET", null, true);

			return res;
		} catch (e) {
			console.error(e);

			return;
		}
	}

	function closeModal() {
		setOpen(false);
		setParams({user: null});
	}

	return (
		<>
			{open() && (
				<div className="coinflip-overlay">
					<TipUser
						close={() => closeModal()}
						setViewing={false}
						total={0}
						user={user()}
					/>
				</div>
			)}

			<div className="modal" onClick={() => setParams({user: null})}>
				<div class="user-container" onClick={(e) => e.stopPropagation()}>
					<Show when={!user.loading} fallback={<Loader/>}>
						<>
							<div className="user-header">
								<div class={"user-header__block"}>
									<p
										className="close bevel-light"
										onClick={() => setParams({user: null})}
									>
										X
									</p>
									<h1>
										<img
											src="/assets/icons/user.svg"
											style={{margin: "0 8px 0 0"}}
										/>
										USER PROFILE
									</h1>
								</div>

								<div className="user-info">
									<button onClick={() => setOpen(true)} class="button-blue tip">
										Tip User
									</button>
									<Avatar
										id={user()?.id || 0}
										xp={user()?.xp || 0}
										height="35"
									/>
									<p>{user()?.username || "Unknown"}</p>
									<Level xp={user()?.xp || 0}/>
								</div>
							</div>

							<div className="user-content">
								<div className="stats">
									<div className="stat">
										<p className="white align">
											<img
												src="/assets/icons/coin.svg"
												height="21"
												width="21"
												alt=""
											/>
											{(user()?.wagered || 0)?.toLocaleString(undefined, {
												minimumFractionDigits: 2,
												maximumFractionDigits: 2,
											})}
										</p>
										<p>TOTAL WAGERED</p>
									</div>

									<div className="stat">
										<p className="white align">
											<img
												src="/assets/icons/coin.svg"
												height="21"
												width="21"
												alt=""
											/>
											{(user()?.withdraws || 0)?.toLocaleString(undefined, {
												minimumFractionDigits: 2,
												maximumFractionDigits: 2,
											})}
										</p>
										<p>WITHDRAWN</p>
									</div>

									<div className="stat">
										<p className="white align">
											<img
												src="/assets/icons/coin.svg"
												height="21"
												width="21"
												alt=""
											/>
											{(user()?.deposits || 0)?.toLocaleString(undefined, {
												minimumFractionDigits: 2,
												maximumFractionDigits: 2,
											})}
										</p>
										<p>DEPOSITED</p>
									</div>

									<div className="stat green">
										<p className="white align">
											<img
												src="/assets/icons/greencoin.svg"
												height="21"
												width="21"
												alt=""
											/>
											{(
												user()?.withdraws - user()?.deposits || 0
											)?.toLocaleString(undefined, {
												minimumFractionDigits: 2,
												maximumFractionDigits: 2,
											})}
										</p>
										<p className="green">TOTAL PROFIT</p>
									</div>
								</div>
							</div>
						</>
					</Show>
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

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    z-index: 1000;
                }

                .coinflip-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 9999;
                }

                .user-container {
                    max-width: 880px;
                    color: white;

                    width: 100%;
                    max-height: 80%;

                    background: #262C52;
                    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
                    border-radius: 15px;

                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    font-weight: 700;

                    position: relative;
                    overflow: scroll;
                }

                .user-container::-webkit-scrollbar {
                    display: none;
                }

                .user-header {
                    width: 100%;
                    min-height: 60px;
                    background: #191F3B;

                    display: flex;
                    align-items: center;
					justify-content: space-between;
                    padding: 0 20px;
                    gap: 15px;
                }
				
				.user-header__block {
					display: flex;
					align-items: center;
					gap: 12px;
				}
				
				@media (max-width: 575px) {
                    .user-header {
						flex-direction: column;
						align-items: flex-start;
						padding: 12px;
					}
                    .user-info {
						width: 100%;
					}
				}

                h1 {
                    color: #FFF;
                    font-family: Montserrat, sans-serif;
                    font-size: 16px;
                    font-weight: 700;
                }

                .close {
                    width: 26px;
                    height: 26px;

                    background: #262C52;
                    border: 1px solid #2B315A;
                    border-radius: 3px;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    font-weight: 700;
                    color: #FFF;
                    cursor: pointer;
                }

                .id {
                    color: #9F9AC8;
                    font-family: Montserrat, sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                }

                .user-info {
                    display: flex;
                    gap: 10px;
                    align-items: center;
					justify-content: center;
                }

                .user-content {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 25px;
                    text-align: center;

                    color: #9AA0C1;
                    font-size: 14px;
                    font-weight: 400;

                    padding: 30px 20px;
                    width: 100%;
                }

                .stats {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;

                    width: 100%;
                }

                .stat {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    gap: 10px;

                    flex: 1 1 0;
                    height: 90px;

                    border-radius: 5px;
                    background: #1D2346;

                    color: #FFF;
                    font-family: Montserrat, sans-serif;
                    font-size: 20px;
                    font-weight: 600;

                    padding: 10px 20px;
                }

                .stat.green {
                    background: rgba(89, 232, 120, 0.15);
                }

                .stat p:last-child {
                    color: #9AA0C1;
                    font-size: 13px;
                    font-weight: 600;
                }

                .align {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .green {
                    color: #59E878 !important;
                }

                .tip-wrapper {
                    width: 100%;
                    max-width: 570px;
                    min-height: 50px;

                    display: flex;
                    align-items: center;
                    gap: 12px;

                    border-radius: 5px;
                    border: 1px dashed #464075;
                    background: rgba(0, 0, 0, 0.12);

                    padding: 12px;
                }

                .input-wrapper {
                    display: flex;
                    align-items: center;
                    gap: 8px;

                    flex: 1;
                }

                .input-label {
                    padding: 0 10px;
                    height: 26px;

                    color: #ADA3EF;
                    font-size: 12px;
                    font-weight: 600;
                    line-height: 26px;

                    border-radius: 2px;
                    background: rgba(90, 84, 153, 0.35);
                }

                .tip-wrapper input {
                    height: 100%;
                    flex: 1;

                    color: #FFF;
                    font-family: Montserrat, sans-serif;
                    font-size: 15px;
                    font-weight: 600;

                    background: unset;
                    outline: unset;
                    border: unset;
                }

                .tip-wrapper button {
                    padding: 0 16px;
                    height: 28px;
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
                    width: 80px;
                    height: 30px;

                    position: relative;

                    font-size: 14px;
                    margin-right: 15px;
                }


                @media only screen and (max-width: 600px) {
                    .tip-wrapper {
                        flex-direction: column;
                    }

                    .tip-wrapper input {
                        text-align: center;
                    }

                    .coin {
                        display: none;
                    }

                    .stats {
                        flex-direction: column;
                    }
                }
			`}</style>
		</>
	);
}

export default UserModal;
