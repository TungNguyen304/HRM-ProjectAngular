import { AbstractControl } from '@angular/forms';
import {
  regexEmail,
  regexLinkUrl,
  regexNoEmoji,
  regexPhone,
} from 'src/app/shared/regex';

export function emojiValidator(c: AbstractControl) {
  if (!c.value) {
    return null;
  }
  return regexNoEmoji.test(c.value)
    ? null
    : {
        emoji: true,
      };
}

export function urlValidator(c: AbstractControl) {
  if (!c.value) {
    return null;
  }
  return regexLinkUrl.test(c.value)
    ? null
    : {
        url: true,
      };
}

export function emailValidator(c: AbstractControl) {
  if (!c.value) {
    return null;
  }
  return regexEmail.test(c.value)
    ? null
    : {
        email: true,
      };
}

export function phoneValidator(c: AbstractControl) {
  if (!c.value) {
    return null;
  }
  return regexPhone.test(c.value)
    ? null
    : {
        phone: true,
      };
}
