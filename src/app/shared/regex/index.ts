export const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const regexNoEmoji =
  /^[^\uE000-\uF8FF\uD83C\uDC00-\uDFFF\uD83D\uDC00-\uDFFF\u2694-\u2697\uD83E\uDD10-\uDD5D]+$/;

export const regexPhone = /[0-9]{4}-[0-9]{3}-[0-9]{3}/;

export const regexLinkUrl =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
