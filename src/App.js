import React, { useState } from 'react';
import './App.css'
import Loading from './components/Loading';
import { generate } from './utils/words';
import useKeyPress from './hooks/useKeyPress';
import Spline from '@splinetool/react-spline';
import { currentTime } from './utils/time';



const initialWords = generate()

const App = () => {
  const [loading, setLoading] = useState(true);

  /* Agrego padding para que el texto siempre este centrado */

  const [leftPadding, setLeftPadding] = useState(
    new Array(20).fill(' ').join(''),
  );
  const [outgoingChars, setOutgoingChars] = useState('');
  const [currentChar, setCurrentChar] = useState(initialWords.charAt(0));
  const [incomingChars, setIncomingChars] = useState(initialWords.substr(1));


  /* WPM */
  const [startTime, setStartTime] = useState();
  const [wordCount, setWordCount] = useState(0);
  const [wpm, setWpm] = useState(0);


  /* Accuracy */

  const [accuracy, setAccuracy] = useState(0);
  const [typedChars, setTypedChars] = useState('');

  /* Detecto KEY y agrego logica */

  useKeyPress(key => {

    /* WPM */
    if (!startTime) {
      setStartTime(currentTime());
    }

    if (key === currentChar) {

      //2
      if (incomingChars.charAt(0) === ' ') {
        setWordCount(wordCount + 1);

        const durationInMinutes = (currentTime() - startTime) / 60000.0;

        setWpm(((wordCount + 1) / durationInMinutes).toFixed(1));
      }
    }

    let updatedOutgoingChars = outgoingChars;
    let updatedIncomingChars = incomingChars;

    /* Accuracy */

    const updatedTypedChars = typedChars + key;
    setTypedChars(updatedTypedChars);

    setAccuracy(
      ((updatedOutgoingChars.length * 100) / updatedTypedChars.length).toFixed(
        0,
      ))

    if (key === currentChar) {

      if (leftPadding.length > 0) {
        setLeftPadding(leftPadding.substring(1));
      }

      updatedOutgoingChars += currentChar;
      setOutgoingChars(updatedOutgoingChars);

      setCurrentChar(incomingChars.charAt(0));

      updatedIncomingChars = incomingChars.substring(1);
      if (updatedIncomingChars.split(' ').length < 10) {
        updatedIncomingChars += ' ' + generate();
      }
      setIncomingChars(updatedIncomingChars);
    }
  });

  console.log(loading)
  return (
    <div>

      <div className='container'>
        <div className='center'>
          <p className="Character">
            <span className="Character-out">
              {(leftPadding + outgoingChars).slice(-20)}
            </span>
            <span className="Character-current">{currentChar}</span>
            <span>{incomingChars.substr(0, 20)}</span>
          </p>
        </div>
        <div className='stats'>
          <div className='wpm'>
            <h3 title='Words Per Minute'>WPM: {wpm}</h3>
          </div>
          <div className='accuracy'>
            <h3>ACCURACY: {accuracy}</h3>
          </div>
        </div>
      </div>


      <div className='escena'>
        <div>
          <Spline scene="https://prod.spline.design/jgGPiQ7IJUDNBQSz/scene.splinecode" height={'700px'} onLoad={() => setLoading(false)} />
          {loading && (
            <Loading />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
