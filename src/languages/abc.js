/*
  Language: Abc
  Description: Abc Music Notation Language
  Author: NriotHrreion <nriot233@gmail.com>
  Website: https://abcnotation.com
  Category: common
*/
export default function(hljs) {
  return {
    name: "Abc Notation",
    aliases: ["abc"],
    contains: [
      // fields
      {
        scope: "keyword",
        match: /^[XTCOAMLQPZNGHKRBDFSImrsUVWw+]:/
      },
      // chord symbols
      hljs.QUOTE_STRING_MODE,
      // numbers
      hljs.NUMBER_MODE,
      // decorations
      {
        scope: "string",
        begin: "!", end: "!"
      },
      // repeat symbols, bar symbols
      {
        scope: "operator",
        match: /[\[\]]?:?\|+:?[\[\]]?(?!")\d*[-\.,]?\d*:?|::/
      },
      {
        scope: "operator",
        match: /\[".+?"/
      },
      // ties, slurs, grace notes, chords, unisons
      {
        scope: "punctuation",
        match: /(-|\(|\)|{|}|\[|\])/
      },
      // macro expressions
      {
        scope: "operator",
        match: "="
      },
      // comments
      hljs.COMMENT("%", "$"),
      // directives
      {
        begin: "%%",
        beginScope: "keyword"
      }
    ]
  };
}
