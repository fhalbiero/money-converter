import React, { useEffect, useState } from 'react';
import { FaExchangeAlt } from 'react-icons/fa';
import './App.css';

import CurrencyRow from './CurrencyRow';

const BASE_URL = 'https://api.exchangeratesapi.io/latest';

function App() {

  const [ currencyOptions, setCurrencyOptions ] = useState([]);
  const [ fromCurrency, setFromCurrency ] = useState();
  const [ toCurrency, setToCurrency ] = useState();
  const [ exchangeRate, setExchangeRate ] = useState();
  const [ amount, setAmount ] = useState(1);
  const [ isAmountInFromCurrency, setIsAmountInFromCurrency ] = useState(true);
  
  let toAmount, fromAmount;

  if (isAmountInFromCurrency) {
    fromAmount = amount;
    toAmount = fromAmount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = toAmount / exchangeRate;
  }

  function handleFromAmountChange(e) {
     setAmount(e.target.value);
     setIsAmountInFromCurrency(true);
  }

  function handleToAmountChange(e) {
     setAmount(e.target.value);
     setIsAmountInFromCurrency(false);
  }

  useEffect(() => {
    if (fromCurrency && toCurrency) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
          .then(res => res.json())
          .then(data => {
            setExchangeRate(data.rates[toCurrency]);
          })
    }

  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    fetch(BASE_URL)
        .then(res => res.json())
        .then(data => {
            const firstCurrency = Object.keys(data.rates)[0];
            setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
            setFromCurrency(data.base);
            setToCurrency(firstCurrency);
            setExchangeRate(data.rates[firstCurrency]);
        });
  }, []);

  return (
    <div className="main-div">
      <h1><e>$$$</e> Converter</h1>
      <div className="secondary-div">
        <CurrencyRow 
          currencyOptions={currencyOptions}
          selectedCurrency={fromCurrency}
          onChangeCurrency={e => setFromCurrency(e.target.value)}
          amount={fromAmount}
          onChangeAmount={handleFromAmountChange}
        />
        <div className="iquals"><FaExchangeAlt className="icon"/></div>
        <CurrencyRow 
          currencyOptions={currencyOptions}
          selectedCurrency={toCurrency}
          onChangeCurrency={e => setToCurrency(e.target.value)}
          amount={toAmount}
          onChangeAmount={handleToAmountChange}
        />
      </div>
    </div>
   );
}

export default App;
