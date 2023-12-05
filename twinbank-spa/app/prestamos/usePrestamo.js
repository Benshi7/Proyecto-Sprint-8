// Esto habría que hacerlo funcionar en React de manera 'reactiva'

/* export const usePrestamo = () => {
  document.addEventListener('DOMContentLoaded', function () {
    const calculateButton = document.getElementById('calculate')
    const loanAmountInput = document.getElementById('loan-amount')
    const interestRateInput = document.getElementById('interest-rate')
    const loanTermInput = document.getElementById('loan-term')
    const resultContainer = document.getElementById('result')

    calculateButton.addEventListener('click', function () {
      const loanAmount = parseFloat(loanAmountInput.value)
      const interestRate = parseFloat(interestRateInput.value) / 100
      const loanTerm = parseInt(loanTermInput.value)

      if (!isNaN(loanAmount) && loanAmount > 0 &&
            !isNaN(interestRate) && interestRate > 0 &&
            !isNaN(loanTerm) && loanTerm > 0) {
        const monthlyInterestRate = interestRate / 12
        const monthlyPayment = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -loanTerm))
        resultContainer.textContent = `Cuota mensual: $${monthlyPayment.toFixed(2)}`
      } else {
        resultContainer.textContent = 'Por favor, ingresa valores numéricos mayores que cero.'
      }
    })
  })
} */


// Versión react del script de arriba:

import { React, useState, useEffect } from 'react';

export const usePrestamo = () => {
  const [loanAmount, setLoanAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [loanTerm, setLoanTerm] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  useEffect(() => {
    const loanAmountInput = document.getElementById('loan-amount')
    const interestRateInput = document.getElementById('interest-rate')
    const loanTermInput = document.getElementById('loan-term')

    loanAmountInput.value = loanAmount
    interestRateInput.value = interestRate
    loanTermInput.value = loanTerm
  }, [loanAmount, interestRate, loanTerm])


  const calculateMonthlyPayment = () => {
    const parsedLoanAmount = parseFloat(loanAmount);
    const parsedInterestRate = parseFloat(interestRate) / 100;
    const parsedLoanTerm = parseInt(loanTerm);

    if (!isNaN(parsedLoanAmount) && parsedLoanAmount > 0 &&
        !isNaN(parsedInterestRate) && parsedInterestRate > 0 &&
        !isNaN(parsedLoanTerm) && parsedLoanTerm > 0) {
      const monthlyInterestRate = parsedInterestRate / 12;
      const calculatedMonthlyPayment = (parsedLoanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -parsedLoanTerm));
      setMonthlyPayment(calculatedMonthlyPayment.toFixed(2));
    } else {
      setMonthlyPayment('Por favor, ingresa valores numéricos mayores que cero.');
    }
  };

  const handleLoanAmountChange = (e) => {
    setLoanAmount(e.target.value);
  };

  const handleInterestRateChange = (e) => {
    setInterestRate(e.target.value);
  };

  const handleLoanTermChange = (e) => {
    setLoanTerm(e.target.value);
  };


  return {
    loanAmount,
    setLoanAmount,
    interestRate,
    setInterestRate,
    loanTerm,
    setLoanTerm,
    monthlyPayment,
    calculateMonthlyPayment,
    handleLoanAmountChange,
    handleInterestRateChange,
    handleLoanTermChange
  };
};