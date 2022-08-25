import { operationKeys, paranthesisArr } from '../constants/constants';
import { NumericInput } from './NumericInput';
export class NumericInputController extends NumericInput {
  isValid: boolean;
  constructor() {
    super();
    this.isValid = true;
  }

  private checkNonvalidCharacter = (expression: string[]) => {
    for (let i = 0; i < expression.length; i++) {
      const char = expression[i];
      let isNumber = /[0-9\.]/.test(char);

      const isSpecialKeys = operationKeys.concat(paranthesisArr).includes(char);
      //If written char is invalid, can be considered as base condition
      if (!isSpecialKeys && !isNumber) {
        this.setValidStatus(false);
        return;
      }
    }
    this.setValidStatus(true);
  };

  validateExpression = (expression: string[], idx: number) => {
    let mathOperations: string[] = [];
    let paranthesis: string[] = [];
    let numbers: string[] = [];
    let numberBeforeSign: number = 0;

    //Check for proper characters
    this.checkNonvalidCharacter(expression);
    //If expression has no invalid char, then we can continue
    if (this.isValid) {
      for (let index = idx; index < expression.length; index++) {
        let char = expression[index];

        if (this.isNumber(char)) {
          numberBeforeSign = this.getNumberBeforeSign(numberBeforeSign, char);
          let nextChar = expression[index + 1];
          //If next char equal to ('+', '-', '/', '*','(', ')')
          if (
            operationKeys.concat(paranthesisArr).includes(nextChar) ||
            index === expression.length - 1
          ) {
            numbers.push(numberBeforeSign.toString());
            numberBeforeSign = 0;
          }
        } else if (operationKeys.includes(char)) {
          mathOperations.push(char);
        } else if (paranthesisArr.includes(char)) {
          paranthesis.push(char);
        }
      }
      //Case 1 -> if last character math operation or no math operation at all, return false
      if (operationKeys.includes(expression[expression.length - 1])) {
        this.setValidStatus(false);
        return;
      }

      //Case 2 -> count of numbers should be exatcly one more than count of math operations
      if (numbers.length - mathOperations.length !== 1) {
        this.setValidStatus(false);
        return;
      }

      // Case 3 -> Each paranthesis should have corresponding value
      let left: number = 0;
      let right: number = 0;
      for (let index = 0; index < paranthesis.length; index++) {
        let paranthesisChar = paranthesis[index];
        if (paranthesisChar === '(') left++;
        else right++;
      }
      if (left !== right) {
        this.setValidStatus(false);
        return;
      }
    }
  };

  calcInputControler = (expression: string[], index: number) => {
    var totalArr: any[] = new Array();
    let currentSign: string = '+';
    let numberBeforeSign: number = 0;

    //Recursively check is current expression is valid
    this.validateExpression(expression, index === 0 ? 0 : index - 1);

    if (this.isValid) {
      for (let idx = index; idx < expression.length; idx++) {
        let currentChar: any = expression[idx];

        //If it is a number
        if (this.isNumber(currentChar)) {
          numberBeforeSign = this.getNumberBeforeSign(
            numberBeforeSign,
            currentChar,
          );
        }

        //If it is not a number but an operation
        if (!this.isNumber(currentChar) || idx === expression.length - 1) {
          if (currentChar === '(') {
            //   Recursive function for paranthesis
            numberBeforeSign = this.calcInputControler(expression, idx + 1);

            let left = 1;
            let right = 0;

            for (let j = idx + 1; j < expression.length; j++) {
              if (expression[j] === ')') {
                right++;
                //When left and right paranthesis number are equal, we can move
                if (right === left) {
                  idx = j;
                  break;
                }
              } else if (expression[j] === '(') left++;
            }
          }
          this.calculate(currentSign, totalArr, numberBeforeSign);
          currentSign = currentChar;
          numberBeforeSign = 0;
          if (currentChar === ')') break;
        }
      }
    }
    return this.generateResult(totalArr);
  };

  private generateResult(totalArr: any[]) {
    if (this.isValid) return this.calcSum(totalArr);
    else return '?';
  }

  getValidStatus = () => {
    return this.isValid;
  };
  private setValidStatus = (valid: boolean) => {
    this.isValid = valid;
  };
}
