const o = require('ospec')
const {Strings} = require("./strings.js")
const fs = require('fs')

// big list of naughty strings converted with MsgKit
const inStrings = JSON.parse(fs.readFileSync('test/blns.json'))
const outStrings = JSON.parse(fs.readFileSync('test/blns.out.json'))

const suite = inStrings.map((s, i) => ({label: i.toString(), pre: s, post: outStrings[i]}))

const tests = [
    {
        label: "ansi",
        pre: "Hello World",
        post: "{\\rtf1\\ansi\\ansicpg1252\\fromhtml1 {\\*\\htmltag1 Hello World }}"
    },
    {
        label: "ascii",
        pre: "°^â",
        post: "{\\rtf1\\ansi\\ansicpg1252\\fromhtml1 {\\*\\htmltag1 \\'b0^\\'e2 }}",
    },
    {
        label: "escaped rtf chars",
        pre: "{}\\",
        post: "{\\rtf1\\ansi\\ansicpg1252\\fromhtml1 {\\*\\htmltag1 \\{\\}\\\\ }}"
    },
    {
        label: "unicode",
        // contains unicode vegetable
        pre: "TEST 🍆 € ￥ TEST",
        post: "{\\rtf1\\ansi\\ansicpg1252\\fromhtml1 {\\*\\htmltag1 TEST \\u55356?\\u57158? \\u8364? \\u65509? TEST }}"
    }
]

o.spec("Strings", function () {

    tests.concat(suite).forEach(t => {
        o(t.label, function () {
            o(Strings.escapeRtf(t.pre)).equals(t.post)
        })
    })


})