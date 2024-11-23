function Loader(props) {
  return (
      <>
          <div className={'loader-container ' + (props?.type === 'small' ? 'small' : '')}>
              <div className='loader' style={{ 'maxHeight': props?.max || 'unset' }} /> 
          </div>

          <style jsx>{`
            .loader-container {
              display: flex;
              height: 100%;
              width: 100%;
              align-items: center;
              justify-content: center;
              padding: 15px 0;
            }

            .loader {
              height: 8rem;
              aspect-ratio: 1;
              animation: spin 1s linear infinite;
              border-radius: 50%;
              border: 2px solid transparent;
              border-top-color: #0077db;
            }
            
            .small .loader {
              height: 4rem;
              width: 4rem;
            }

            @keyframes spin {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
          `}</style>
      </>
  );
}

export default Loader;
