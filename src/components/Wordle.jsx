import { useEffect, useRef, useState } from "react";
import "../styles/Wordle.scss";
import Keyboard from "./Keyboard";
import Row from "./Row";
import { LETTERS, potentialWords } from "../data/lettersWords";
import HintButton from "./HintButton";
import wordDefinitions from "../data/wordDefinitions";

const SOLUTION= potentialWords[Math.floor(Math.random() * potentialWords.length)];

console.log(SOLUTION)

function Wordle() {
    const [guesses, setGuesses] = useState([
        "     ",
        "     ",
        "     ",
        "     ",
        "     ",
        "     ",
    ]);
    const [solutionFound, setSolutionFound] = useState(false);
    const [activeLetterIndex, setActiveLettersIndex] = useState(0);
    const [notification, setNotification] = useState("");
    const [activeRowIndex, setActiveRowIndex] = useState(0);
    const [failedGuesses, setFailedGuesses] = useState([]);
    const [correctLetters, setCorrectLetters] = useState([]);
    const [presentLetters, setPresentLetters]= useState([]);
    const [absentLetters, setAbsentLetters] = useState([]);
    
    const [word, setWord] = useState(LETTERS);
    const [triesLeft, setTriesLeft] = useState(6);
    const [showHint, setShowHint] = useState(false);


    const wordleRef = useRef();

    useEffect(() => {
        wordleRef.current.focus();
    }, []);

    const typeLetter = (letter) => {
        if (activeLetterIndex < 5) {
            setNotification("");

            let newGuesses = [...guesses];
            newGuesses[activeRowIndex] = replaceCharacter(
                newGuesses[activeRowIndex],
                activeLetterIndex,
                letter
            );

            setGuesses(newGuesses);
            setActiveLettersIndex((index) => index + 1);
        }
    };
    const replaceCharacter = (string, index, replacement) => {
        return (
            string.slice(0, index) + replacement + string.slice(index + replacement.length)
        );
    };

    const hitEnter = () =>{
        if (activeLetterIndex === 5) {
            const currentGuess = guesses[activeRowIndex];

            if (!potentialWords.includes(currentGuess)) {
                setNotification("NOT IN THE WORD LIST");
            } else if (failedGuesses.includes(currentGuess)) {
                setNotification("WORD TRIED ALREADY");
            } else if (currentGuess === SOLUTION) {
                setSolutionFound(true);
                setNotification("WELL DONE");
                setCorrectLetters([...SOLUTION]);
            } else {
                setTriesLeft(triesLeft - 1);

                let correctLetters = [];

                [...currentGuess].forEach((letter, index) => {
                    if (SOLUTION[index] === letter) correctLetters.push(letter);
                });

                setCorrectLetters([...new Set(correctLetters)]);

                setPresentLetters([
                    ...new Set([
                        ...presentLetters,
                        ...[...currentGuess].filter((letter) => SOLUTION.includes(letter)),
                    ]),
                ]);

                setAbsentLetters([
                    ...new Set([
                        ...absentLetters,
                        ...[...currentGuess].filter((letter) => !SOLUTION.includes(letter)),
                    ]),
                ]);
                setFailedGuesses([...failedGuesses, currentGuess]);
                setActiveRowIndex((index) => index + 1);
                setActiveLettersIndex(0);
            }
        }else{
            setNotification("FIVE LETTER WORDS ONLY");
        }
    };

    const hitBackspace = () => {
        setNotification("");

        if (guesses[activeRowIndex][0] !== " ") {
            const newGuesses = [...guesses];

            newGuesses[activeRowIndex] = replaceCharacter(
                newGuesses[activeRowIndex],
                activeLetterIndex - 1,
                " "
            );
            setGuesses(newGuesses);
            setActiveLettersIndex((index) => index - 1);
        }
    };
    const handleKeyDown = (event) => {
        if (solutionFound) return;

        if (LETTERS.includes(event.key)) {
            typeLetter(event.key);
            return;
        }
        if (event.key === "ENTER") {
            hitEnter();
            return;
        }
        if (event.key === "Backspace") {
            hitBackspace();
        }
    };

  //  const wordDefinitions = {
    //    which: "(pronoun) used to specify one or more people or things from a definite set.",
      //  there: "(adverb) in, at, or to that place or position.",
        //their: "(pronoun) belonging to or associated with the people or things previously mentioned.",
  //      about: "(preposition) on the subject of; concerning.",
    //    would: "(modal verb) expressing the conditional tense or indicating a hypothetical situation.",
      //  these: "(demonstrative pronoun) used to identify one or more people or things close at hand.",
//        other: "(adjective) different or distinct from the one already mentioned or known.",
  //      words: "(noun) a single distinct meaningful element of speech or writing.",
 //       could: "(modal verb) used to indicate possibility or ability in the past, present, or future.",
   //     write: "(verb) mark (letters, words, or other symbols) on a surface, typically paper, with a pen, pencil, or similar implement.",
     //   first: "(adjective) coming before all others in time, order, or importance.",
       // water: "(noun) a colorless, transparent, odorless liquid that forms the seas, lakes, rivers, and rain and is the basis of the fluids of living organisms.",
        //after: "(preposition) following in time or place; subsequent to.",
        //where: "(adverb) in or to what place or position.",
    //    right: "(adjective) morally good, justified, or acceptable.",
  //      think: "(verb) have a particular opinion, belief, or idea about someone or something.",
//        three: "(noun) equivalent to the sum of one and two; one more than two; 3.",
        //years: "(noun) a period of 365 or 366 days, in the Gregorian calendar divided into 12 months.",
      //  place: "(noun) a particular position or point in space.",
    //    sound: "(noun) vibrations that travel through the air or another medium and can be heard when they reach a person's or animal's ear.",
  //      great: "(adjective) of an extent, amount, or intensity considerably above average.",
//        again: "(adverb) once more; another time.",
        //still: "(adverb) up to and including the present or the time mentioned.",
      //  every: "(determiner) used to refer to all the individual members of a set without exception.",
    //    small: "(adjective) of a size that is less than normal or usual.",
  //      found: "(verb) past tense and past participle of find; discover or perceive by chance or unexpectedly.",
//        those: "(demonstrative pronoun) used to refer to the person or thing mentioned or easily identified.",
      //  never: "(adverb) at no time in the past or future; not ever.",
    //    under: "(preposition) extending or directly below.",
  //      might: "(modal verb) used to express possibility or permission.",
//        while: "(conjunction) during the time that; at the same time as.",
        //house: "(noun) a building for human habitation, especially one that is lived in by a family or small group of people.",
      //  world: "(noun) the earth, together with all of its countries and peoples.",
    //    below: "(preposition) at a lower level or position than something.",
  //      asked: "(verb) past tense and past participle of ask; inquire about something from someone.",
//        going: "(verb) present participle of go; move from one place to another; travel.",
        //large: "(adjective) of considerable or relatively great size, extent, or capacity.",
      //  until: "(conjunction) up to (the point in time or the event mentioned).",
    //    along: "(preposition) moving in a constant direction on (a path or any more or less horizontal surface).",
  //      shall: "(modal verb) expressing an instruction or command.",
//        being: "(noun) existence; the state or fact of existing.",
//        often: "(adverb) frequently; many times.",
      //  earth: "(noun) the planet on which we live; the world.",
    //    began: "(verb) past tense of begin; start; commence.",
  //      since: "(preposition) in the intervening period between (the time mentioned) and the time under consideration.",
//        study: "(noun) the devotion of time and attention to acquiring knowledge on an academic subject.",
        //night: "(noun) the period of darkness in each twenty-four hours; the time from sunset to sunrise.",
      //  light: "(noun) the natural agent that stimulates sight and makes things visible.",
    //    above: "(preposition) at a higher level or layer than.",
  //      paper: "(noun) material manufactured in thin sheets from the pulp of wood or other fibrous substances.",
//        }
        

    return (
        <div className="wordle"
        ref={wordleRef}
        tabIndex="0"
        onBlur={(e) => {
                e.target.focus();
            }}
            onKeyDown={handleKeyDown}>
                <div className={`notification ${solutionFound && "noification--green"}`}>
                    {notification}
                </div>
                {guesses.map((guess, index) => {
                    return (
                        <Row
                        key={index}
                        word={guess}
                        applyRotation={
                            activeRowIndex > index || 
                            (solutionFound && activeRowIndex === index)
                        }
                        solution={SOLUTION}
                        bounceOnError={
                            notification !== "WELL DONE" &&
                            notification !== " " &&
                            activeRowIndex === index
                        }
                        />
                    );
                })}
                <div>
                    <p>Remaining Tries:{triesLeft} </p>
                    {triesLeft === 3 && (
                    <button onClick={() => setShowHint(true)}>Get A Hint!</button>
                    )}
                    {showHint && (
                        <div> <p>Hint: {wordDefinitions[SOLUTION]} </p>
                        </div>
                    )}
                </div>
                <Keyboard
                 presentLetters={presentLetters}
                 correctLetters={correctLetters}
                 absentLetters={absentLetters}
                 typeLetter={typeLetter}
                 hitEnter={hitEnter}
                 hitBackspace={hitBackspace}
                    />
            </div>
    )
}

export default Wordle;
