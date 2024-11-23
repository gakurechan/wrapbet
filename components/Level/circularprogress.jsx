function CircularProgress(props) {
    const progressToDegrees = () => 360 - ((props?.progress || 1) / 100 * 360);

    return (
        <>
            <div class='progress-container' style={{
                background: `conic-gradient(from 0deg at 50% 50%, #336dff 0deg, #336dff ${progressToDegrees()}deg, #4e5a96 ${progressToDegrees() + 0.28}deg, #4e5a96 359.36deg, rgba(0, 0, 0, 0) 360deg);`
            }}>
                {...props.children}
            </div>

            <style jsx>{`
              .progress-container {
                height: 35px;
                width: 35px;
                border-radius: 3px;
                position: relative;
                
                display: flex;
                align-items: center;
                justify-content: center;
              }
            `}</style>
        </>
    );
}

export default CircularProgress;
