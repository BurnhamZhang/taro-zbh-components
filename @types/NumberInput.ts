import { ComponentClass } from "react";

export interface NumberInputProps {
  value?: string;
  onChange?: (value: string) => any;
  show?: false;
  extClass?: string ;
}

declare const NumberInput: ComponentClass<NumberInputProps>;

export default NumberInput;
