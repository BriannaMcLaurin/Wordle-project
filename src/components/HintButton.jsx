

const HintButton = ({ word, remainingTries, getHint }) => {
    if (remainingTries <= 3) {
        return (
            <button onClick={() => getHint(word)}> Get A Hint!</button>
        );
    } else {
        return null;
    }
};
export default HintButton;