
const interestRateThreshold = 5000000; 
const defaultInterestRate1 = 0.11;     
const defaultInterestRate2 = 0.13;     


export class LoanCalculations {
  /**
   * Calculates the present value of a series of future payments.
   * @param {number} rate - Interest rate per period.
   * @param {number} periods - Total number of payment periods.
   * @param {number} payment - Payment amount per period.
   * @param {number} future - Future value (default 0).
   * @param {number} type - Payment type (0 for end of period, 1 for beginning, default 0).
   * @returns {number} Present value.
   */
  static presentValue(rate: number, periods: number, payment: number, future: number = 0, type: number = 0): number {
    if (rate === 0) {
      return -payment * periods - future;
    }
    return (
      (((1 - (1 + rate) ** periods) / rate) * payment * (1 + rate * type) - future) /
      (1 + rate) ** periods
    );
  }

  /**
   * Gets the interest rate based on income.
   * @param {number} income - Total income.
   * @returns {number} Interest rate.
   */
  static getInterestRate(income: number): number {
    return income > interestRateThreshold ? defaultInterestRate2 : defaultInterestRate1;
  }

  /**
   * Breaks down loan figures based on total income.
   * @param {number} totalIncome - Total monthly income.
   * @param {number} interest - Annual interest rate (default calculated from income).
   * @param {number} years - Loan term in years (default 20).
   * @returns {object} Loan breakdown data.
   */
  static incomeBreakDown(
    totalIncome: number,
    interest: number = this.getInterestRate(totalIncome),
    years: number = 20
  ) {
    console.log("Calculating income breakdown with totalIncome:", totalIncome, "interest:", interest, "years:", years);
    
    const periods = years * 12;
    const deductablePercentage = 50 / 100;
    const loanToValue = 90 / 100;
    const deductableIncome = Math.round(totalIncome * deductablePercentage);
    const pValue = Math.round(
      this.presentValue(interest / 12, periods, -deductableIncome, 0, 0)
    );
    const propertyValueLimit = Math.round(pValue / loanToValue);
    let propertyValueLimitEligibility = 0;

    if (propertyValueLimit >= 60_000_000 && interest === 0.13) {
      propertyValueLimitEligibility = 60_000_000;
    } else if (propertyValueLimit > 40_000_000 && interest === 0.11) {
      propertyValueLimitEligibility = 40_000_000;
    } else {
      propertyValueLimitEligibility = propertyValueLimit;
    }

   
    return {
      totalIncome,
      interest,
      years,
      deductableIncome,
      presentValue: pValue,
      propertyValueLimit,
      propertyValueLimit10PercentMeetDown: (propertyValueLimit / 100) * 10,
      propertyValueLimitEligibility,
      propertyValueLimitEligibility10PercentMeetDown:
        (propertyValueLimitEligibility / 100) * 10,
      maximumLoanAmount: (propertyValueLimitEligibility / 100) * 90,
    };
  }
}

export default LoanCalculations;