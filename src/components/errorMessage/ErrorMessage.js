import gif from './giphy.gif';

const ErrorMessage = () => {
    return (
        <img src={gif} alt="Error" style={{display: 'block', objectFit: 'contain', width: '250px', height: '250px', margin: '0 auto'}}/>
    )
}

export default ErrorMessage;