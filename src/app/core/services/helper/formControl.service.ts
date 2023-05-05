import { AbstractControl } from '@angular/forms';

export const getControlCommon = (
  form: AbstractControl | null,
  ...controlList: string[]
): AbstractControl | null => {
  let control: AbstractControl | null | undefined = form;
  controlList.forEach((item) => {
    control = control?.get(item);
  });
  return control;
};
