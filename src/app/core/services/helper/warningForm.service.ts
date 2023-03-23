import { AbstractControl } from '@angular/forms';
import { getControlCommon } from './formControl.service';

export const requireWarning = (
  form: AbstractControl | null,
  component: any,
  type: string,
  label: string
): void => {
  if (getControlCommon(form, type)?.errors?.['required']) {
    component.warning[
      type as keyof typeof component.warning
    ] = `${label} không được để trống`;
  }
};

export const emojiWarning = (
  form: AbstractControl | null,
  component: any,
  type: string,
  label: string
): void => {
  if (getControlCommon(form, type)?.errors?.['emoji']) {
    component.warning[
      type as keyof typeof component.warning
    ] = `${label} không được chứa emoji`;
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
    component.warning[
      type as keyof typeof component.warning
    ] = `${label} không được dài quá ${length} ký tự`;
  }
};

export const maxSizeFileWarning = (
  size: number,
  component: any,
  type: string,
  label: string,
  mb: number
) => {
  if (Number((size / (1024*1024)).toFixed(2)) > mb) {
    component.warning[
      type as keyof typeof component.warning
    ] = `Dung lượng của ${label} không được quá ${mb} mb`;
  }
}
