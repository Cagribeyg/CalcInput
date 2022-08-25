import { NumericInputController } from './NumericInputController';
export class NumericInputUI {
  containerId: string;
  container: HTMLElement;
  constructor(id: string, containerEl: HTMLElement) {
    this.containerId = id;
    this.container = containerEl;
  }

  private createMainRender = () => {
    let htmlOutput: string = `
              <div id="input">
                  <input type="text" id="inputText" value="" />
              </div>
                  <div id="resultArea">
              </div>
          `;
    this.container.innerHTML += htmlOutput;

    var inputTextElement = <HTMLInputElement>(
      document.getElementById('inputText')!
    );

    var resultElement = <HTMLTextAreaElement>(
      document.getElementById('resultArea')!
    );

    let numericInputController = new NumericInputController();

    const inputHandler = (e: any) => {
      let expression = numericInputController.generateNonSpacedExpression(
        e.target.value,
      );

      let result = numericInputController.calcInputControler(expression, 0);
      resultElement.innerHTML = result;

      this.setFocusCssChange(numericInputController);
    };

    const focusHandler = () => {
      this.setFocusCssChange(numericInputController);
    };

    const blurHandler = () => {
      if (!numericInputController.getValidStatus()) {
        this.container.style.border = '3px solid #fe8585';
      } else {
        this.container.style.border = '3px solid #BBB';
      }
    };

    // Listen the changes on input
    inputTextElement.addEventListener('input', inputHandler);
    inputTextElement.addEventListener('focus', focusHandler);
    inputTextElement.addEventListener('blur', blurHandler);
  };

  init = () => {
    this.createMainRender();
  };

  private setFocusCssChange(numericInputController: NumericInputController) {
    if (!numericInputController.getValidStatus()) {
      this.container.style.border = '3px solid #f00';
    } else {
      this.container.style.border = '3px solid #8c00ff';
    }
  }
}
