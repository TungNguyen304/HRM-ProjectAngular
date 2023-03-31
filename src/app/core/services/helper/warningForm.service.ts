import { AbstractControl } from '@angular/forms';
import { getControlCommon } from './formControl.service';

export const requireWarning = (
  form: AbstractControl | null,
  component: any,
  type: string | Array<string>,
  label: string
): void => {
  if (type instanceof Array) {
    if (getControlCommon(form, ...type)?.errors?.['required']) {
      component.warning[
        type[type.length - 1] as keyof typeof component.warning
      ] = {
        name: label,
        type: 'required',
      };
    }
  } else {
    if (getControlCommon(form, type)?.errors?.['required']) {
      component.warning[type as keyof typeof component.warning] = {
        name: label,
        type: 'required',
      };
    }
  }
};

export const emojiWarning = (
  form: AbstractControl | null,
  component: any,
  type: string,
  label: string
): void => {
  if (getControlCommon(form, type)?.errors?.['emoji']) {
    component.warning[type as keyof typeof component.warning] = {
      name: label,
      type: 'emoji',
    };
  }
};

export const maxLengthWarning = (
  form: AbstractControl | null,
  component: any,
  type: string,
  label: string,
  length: number
): void => {
  if (getControlCommon(form, type)?.errors?.['maxlength']) {
    component.warning[type as keyof typeof component.warning] = {
      name: label,
      type: 'maxLength',
      length: length,
    };
  }
};
