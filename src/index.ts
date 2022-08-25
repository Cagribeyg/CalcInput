const container: HTMLElement = document.getElementById('numInput')!;
import { NumericInputUI } from './classes/NumericInputUI';
let numericInput = new NumericInputUI('numInput', container);
numericInput.init();
