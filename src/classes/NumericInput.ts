//This class created for possible future common math functions
export class NumericInput {
  constructor() {}

  protected isNumber = (char: string) => {
    return /[0-9\.]/.test(char);
  };

  protected getNumberBeforeSign(numberBeforeSign: number, currentChar: any) {
    numberBeforeSign = numberBeforeSign * 10 + parseInt(currentChar);
    return numberBeforeSign;
  }

  protected calcSum(totalArr: any[]) {
    return totalArr.reduce((sum, t) => sum + t, 0);
  }

  generateNonSpacedExpression = (expression: string) => {
    // Remove the white spaces from expression
    return Array.from(expression.replace(/\s/g, ''));
  };

  protected calculate(
    currentSign: string,
    totalArr: any[],
    numberBeforeSign: number,
  ) {
    let precedence: number = 0;
    switch (currentSign) {
      case '+':
        totalArr.push(numberBeforeSign);
        break;
      case '-':
        totalArr.push(numberBeforeSign * -1);
        break;
      case '*':
        precedence = totalArr.pop();
        totalArr.push(precedence * numberBeforeSign);
        break;
      case '/':
        precedence = totalArr.pop();
        totalArr.push(precedence / numberBeforeSign);
        break;
    }
  }
}
