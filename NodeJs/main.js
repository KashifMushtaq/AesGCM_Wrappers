/*
Copyright (©) 2023 Kashif Mushtaq

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sub-license, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

var Api = require('./AesGcmHelper');


var HexKey = {v: ""};
var HexIv = {v: ""};
var KeyLength = {v: 0};
var IvLength = {v: 0};


var result = Api._getNewAESKeyAndIv(HexKey, HexIv, KeyLength, IvLength);

if (result) {

    console.log("------------------------- _getNewAESKeyAndIv -------------------------\n");

    console.log("Key:");
    console.log("%s", HexKey.v);
    console.log("Key Len: %s", KeyLength.v);

    console.log("\nIv:");
    console.log("%s", HexIv.v);
    console.log("IV Len: %s", IvLength.v);

    console.log("\n------------------------- _getNewAESKeyAndIv -------------------------\n");

} else {

    console.log("\n _getNewAESKeyAndIv FAILED \n");
}


/***
 *  If do not see Japanese characters, please change Netbeans -> Tools -> Options -> Fonts & Color -> Syntax -> Font to SansSerif (or any other which support Japanese Characters (Not all UTF-8 fonts do that)
 * @type String
 */
var PlainText = {v: "Syllabic kana – hiragana(平仮名) and katakana(片仮名)"};
var len = lengthInUtf8Bytes(PlainText.v);
console.log("UTF-8 Text Byte Len: %s", len);
console.log("ASII Text Len: %s. Not correct", PlainText.v.length);

var EncryptedBase64 = {v: ""};
var DataLength = {v: len};

var result = Api._encrypt_GcmAes256(HexKey.v, HexIv.v, PlainText.v, EncryptedBase64, DataLength);

if (result) {

    console.log("------------------------- _encrypt_GcmAes256 -------------------------\n");

    console.log("Plain Text:");
    console.log("%s", PlainText.v);
    console.log("Len %s", len);
    console.log("Encrypted: %s", EncryptedBase64.v);
    console.log("Len: %s", DataLength.v);

    console.log("\n------------------------- _encrypt_GcmAes256 -------------------------\n");

} else {

    console.log("\n _encrypt_GcmAes256 FAILED \n");
}



var DecryptedText = {v: ""};
DataLength = {v: EncryptedBase64.v.length};

var result = Api._decrypt_GcmAes256(HexKey.v, HexIv.v, EncryptedBase64.v, DecryptedText, DataLength);

if (result) {

    console.log("------------------------- _decrypt_GcmAes256 -------------------------\n");

    console.log("Encrypted Text:");
    console.log("%s", EncryptedBase64.v);
    console.log("Plain Text: %s", PlainText.v);
    console.log("Decrypted: %s", DecryptedText.v);
    console.log("Len: %s", DataLength.v);

    console.log("\n------------------------- _decrypt_GcmAes256 -------------------------\n");

} else {

    console.log("\n _decrypt_GcmAes256 FAILED \n");
}

if (DecryptedText.v === PlainText.v) {
    console.log("\n------------------------- Encryption / Decryption Test OK  -------------------------\n");
} else {
    console.log("\n------------------------- Encryption / Decryption Test FAILED  -------------------------\n");
}

function lengthInUtf8Bytes(str) {
    return Buffer.byteLength(str, "utf8");
}