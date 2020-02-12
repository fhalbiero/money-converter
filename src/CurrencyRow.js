import React from 'react';


export default function CurrencyRow({ 
    currencyOptions, 
    selectedCurrency, 
    onChangeCurrency, 
    amount,
    onChangeAmount }) {

    return (
        <div className="input-div">

            <select 
                value={selectedCurrency} 
                onChange={onChangeCurrency}
            >
                {
                    currencyOptions.map( option => (
                        <option 
                            key={option} 
                            value={option}
                        >{option}
                        </option>
                    ))
                }
            </select>

            <input 
                type="text" 
                className="input" 
                value={amount}
                onChange={onChangeAmount}
            />

        </div>
    )
}
