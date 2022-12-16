import React, { useState } from 'react';
import './App.css'
import Loading from './components/Loading';
import { generate } from './utils/words';
import useKeyPress from './hooks/useKeyPress';
import Spline from '@splinetool/react-spline';



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

  /* Detecto KEY y agrego logica */

  useKeyPress(key => {

    let updatedOutgoingChars = outgoingChars;
    let updatedIncomingChars = incomingChars;


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
