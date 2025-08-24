/*
  Language: Abc
  Description: Abc Music Notation Language
  Author: NriotHrreion <nriot233@gmail.com>
  Website: https://abcnotation.com
  Category: common
*/

export default function(hljs) {
  const untilCommentOrEndOfLine = /(?=[%\n])/

  const inlineHeader = {
    scope: "inline-header",
    begin: /\[[KMLQPRIV]:/,
    end: /]/,
    contains: [
      {
        scope: "header-content",
        match: /[^\]]*/,
        endsWithParent: true
      }
    ]
  }

  const note = {
    scope: "note",
    match: /[_^]?[_^=]?[A-Ga-gXZxyz][,']*\d*\/*\d*-?/
  }

  const barLine = {
    scope: "bar",
    match: /(\[\|]|\|]|\|\||\[\||\|:|:\||::|\|)\d*([,-]\d)*/,
  }

  const barLine2 = {
    scope: "bar",
    match: /(\[)\d+([,-]\d)*/,
  }

  const tuple = {
    scope: "tuple",
    match: /\([2-9](:[1-9])?(:[1-9])?/
  }

  const graceNotes = {
    scope: "grace",
    begin: /\{/, end: /\}/,
    contains: [
      {
        scope: "note",
        match: /[_^]?[_^=]?[A-Ga-gZz][,']*\d*\/*\d*-?/
      },
    ],
  }

  const chord = {
    scope: "chord",	// That is: [Ace]
    begin: /\[(?!\|)/, end: /\]\d*\/*\d*/,
    contains: [
      {
        scope: "note",
        match: /[_^]?[_^=]?[A-Ga-gZz][,']*\d*-?/
        // TODO-PER: this doesn't catch errors. Try `[absab]` the "s" doesn't get any span
      },
    ],
  }

  const chordSymbol = {
    scope: "chord-symbol", // That is: "Am"
    begin: '"', end: '"',
    contains: [{begin: '\\\\.'}],
  }

  const decoration = {
    scope: "decoration",
    match: /![A-Za-z0-9\<\>\+=\/\.\(\)]+!/
  }
  const decorationDeprecated = {
    scope: "decoration",
    match: /\+[A-Za-z0-9\<\>=\/\.\(\)]+\+/
  }
  const decorationShortcut = {
    scope: "decoration",
    match: /[.~HJLMOPRSTtuv]/
  }
  const overlay =	{
    scope: "overlay",
    match: /&/
  }

  const comment =	hljs.COMMENT("%", "$")

  const space = {
    scope: "space",
    match: / /
  }
  const tab = {
    scope: "space",
    match: /\t/
  }
  const error = {
    scope: "error",
    match: /./
  }

  const continuation = {
    scope: "continuation",
    match: /\\\s*$/,
  }

  const brokenRhythm1 = {
    scope: "broken-rhythm",
    match: /(?<=[_^]?[_^=]?[A-Ga-gZxyz\]][,']*\d*\/*\d*-? *)>>?>?/,
  }

  const brokenRhythm2 = {
    scope: "broken-rhythm",
    match: /(?<=[_^]?[_^=]?[A-Ga-gZxyz\]][,']*\d*\/*\d*-? *)<<?<?/,
  }

  return {
    name: "Abc Notation",
    aliases: ["abc"],
    contains: [
      //
      // header lines and directives (that is, everything except music lines
      //
      {
        scope: "header",
        match: /^[XTCOAMLQPZNGHKRBDFSImrsUVW+]:/
      },
      // content of header lines
      {
        scope: "title",
        match: /(?<=^T:)[^%\n]*/
      },
      {
        scope: "part",
        match: /(?<=^P:)[^%\n]*/
      },
      {
        scope: "tempo",
        match: /(?<=^Q:)[^%\n]*/
      },
      {
        scope: "key",
        match: /(?<=^K:)[^%\n]*/
      },
      {
        scope: "meter",
        match: /(?<=^M:)[^%\n]*/
      },
      {
        scope: "voice",
        match: /(?<=^V:)[^%\n]*/
      },
      {
        scope: "history",
        match: /(?<=^H:)[^%\n]*/
      },
      {
        scope: "notes",
        match: /(?<=^N:)[^%\n]*/
      },
      {
        scope: "words",
        match: /(?<=^W:)[^%\n]*/
      },
      {
        scope: "new-keyword",
        match: /(?<=^U:)([^=]+)*/
      },
      {
        scope: "definition",
        match: /(?<=^U:([^=]+))=[^\n]*/
      },
      // Everything not enumerated above - don't need separate styles for these.
      {
        scope: "header-content",
        match: /(?<=[XCOALZGRBDFSImrsU]:)[^%\n]*/
      },
      // directives
      {
        // For staves, we want to style the staff information uniquely
        scope: "staves",
        begin: /^%%staves/,
        end: untilCommentOrEndOfLine,
        contains: [
          {
            scope: "staves-content",
            match: /[^%\n]*/,
            endsWithParent: true
          }
        ]
      },
      {
        // For staves, we want to style the staff information uniquely
        scope: "text",
        begin: /^%%begintext/,
        end: /^%%endtext/,
      },
      {
        scope: "directive",
        match: /^%%\S+/
      },
      {
        // All other directives just get a simple style
        scope: "directive-body",
        match: /(?<=%%\S+)[^%\n]*/
      },
      // lyrics content
      {
        scope: "lyrics",
        begin: /^w:/,
        end: untilCommentOrEndOfLine,
        contains: [
          {
            scope: "lyrics-content",
            match: /[^%\n]*/,
            endsWithParent: true
          }
        ]
      },

      //
      // Music lines
      //
      tuple,

      // slur
      {
        scope: "slur",
        begin: /\.?\(/, end: /\)/,
        contains: [
          continuation,
          inlineHeader,
          note,
          barLine2,
          tuple,
          graceNotes,
          chord,
          barLine,
          chordSymbol,
          decoration,
          decorationDeprecated,
          decorationShortcut,
          overlay,
          comment,
          space,
          tab,
          brokenRhythm1,
          brokenRhythm2,
          'self',
          {
            scope: "error",
            match: /[^)]/
          }
        ]
      },
      continuation,
      inlineHeader,
      note,
      barLine2,
      graceNotes,
      chord,
      barLine,
      chordSymbol,
      decoration,
      decorationDeprecated,
      decorationShortcut,
      overlay,
      comment,
      space,
      tab,
      brokenRhythm1,
      brokenRhythm2,

      error,
    ]
  };
}
