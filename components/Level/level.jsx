import {getUserLevel} from "../../resources/levels";
import {createEffect, createSignal} from "solid-js";

function Level(props) {

    const [level, setLevel] = createSignal(0)

    createEffect(() => {
        setLevel(getUserLevel(props?.xp))
    })

    function levelToColor(level) {
        if (level < 2) return ''
        if (level < 26) {
            return 'blue-o'
        }
        if (level < 51) {
            return 'purple'
        }
        if (level < 76) {
            return 'orange'
        }
        if (level < 100) {
            return 'drop'
        }
        return 'cooldrop'
    }

    return (
        <>
            <div class={'level ' + levelToColor(level()) + (props?.blend ? ' blend' : '')}>
                {levelToColor(level()) === 'drop' ? (
                    <img src='/assets/icons/cooldrop.svg' height='10' alt=''/>
                ) : levelToColor(level()) === 'cooldrop' ? (
                    <img src='/assets/icons/cooldrop.svg' height='10' alt=''/>
                ) : ''}
                <p>{level()}</p>
            </div>

            <style jsx>{`

                .level {
                    font-family: 'Montserrat', sans-serif;
                    font-weight: 700;
                    font-size: 10px;
                    color: white;

                    background: #8F8DA1;
                    padding: 0 5px;
                    height: 18px;
                    border-radius: 3px;

                    display: flex;
                    align-items: center;
                    gap: 5px;
                }

                .level p {
                    margin-top: -1px;
                }

                .level.green {
                    background: #56B66B;
                }

                .blue-o.level {
                    background: #0085FF;
                    color: #FFF;
                }

                .level.purple {
                    background: #BF50D1;
                    color: #D9D9D9;
                }

                .level.orange {
                    background: #FF6635;
                    color: #D9D9D9;
                }

                .level.drop {
                    border: 1px solid #20D7D7;
                    background: linear-gradient(90deg, rgba(156, 237, 255, 0.25) 0%, rgba(0, 181, 175, 0.25) 100%);
                    border-radius: 3px;
                }

                .level.drop p {
                    background: linear-gradient(90deg, #50F3FD 0%, #00B59C 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    text-fill-color: transparent;
                }

                .level.cooldrop {
                    border: 1px solid #20D7D7;
                    background: linear-gradient(90deg, rgba(156, 237, 255, 0.25) 0%, rgba(0, 181, 175, 0.25) 100%);
                    border-radius: 3px;
                }

                .level.cooldrop p {
                    background: linear-gradient(90deg, #50F3FD 0%, #00B59C 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    text-fill-color: transparent;
                }
            `}</style>
        </>
    );
}

export default Level;
