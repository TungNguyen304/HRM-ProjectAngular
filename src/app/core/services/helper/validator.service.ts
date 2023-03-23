import { AbstractControl } from "@angular/forms";
import { regexNoEmoji } from "src/app/shared/regex";

export function emojiValidator(c: AbstractControl) {
    if(!c.value) {
        return null;
    }
    return regexNoEmoji.test(c.value) ? null : {
        emoji: true
    };
  }
