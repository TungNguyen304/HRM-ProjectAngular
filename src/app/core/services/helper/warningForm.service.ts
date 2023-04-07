import { AbstractControl } from '@angular/forms';
import { getControlCommon } from './formControl.service';

export const requireWarning = (
  form: AbstractControl | null,
  component: any,
  type: string | Array<string>
): void => {
  if (type instanceof Array) {
    if (getControlCommon(form, ...type)?.errors?.['required']) {
      component.warning[
        type[type.length - 1] as keyof typeof component.warning
      ] = {
        type: 'required',
      };
    }
  } else {
    
    if (getControlCommon(form, type)?.errors?.['required']) {
      component.warning[type as keyof typeof component.warning] = {
        type: 'required',
      };
    }
  }
};

export const emojiWarning = (
  form: AbstractControl | null,
  component: any,
  type: string,
): void => {
  if (getControlCommon(form, type)?.errors?.['emoji']) {
    component.warning[type as keyof typeof component.warning] = {
      type: 'emoji',
    };
  }
};

export const maxLengthWarning = (
  form: AbstractControl | null,
  component: any,
  type: string,
  length: number
): void => {
  if (getControlCommon(form, type)?.errors?.['maxlength']) {
    component.warning[type as keyof typeof component.warning] = {
      type: 'maxLength',
      length: length,
    };
  }
};
