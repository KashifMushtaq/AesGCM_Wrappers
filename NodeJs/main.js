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

var HexKey;
var HexIv;
var KeyLength = 0;
var IvLength = 0;


var result = Api._getNewAESKeyAndIv(HexKey, HexIv, KeyLength, IvLength);

if (result) {

    console.log("------------------------- _getNewAESKeyAndIv -------------------------\n");

    console.log("Key:");
    console.log("%s", HexKey);

    console.log("Iv:");
    console.log("%s", HexIv);

    console.log("\n------------------------- _getNewAESKeyAndIv -------------------------\n");

} else {

    console.log("\n _getNewAESKeyAndIv FAILED \n");
}