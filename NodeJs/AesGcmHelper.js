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



var LD_LIBRARY_PATH = './libGcmAes.so'; // Good for all Linux like x64 systems

//Currently possible values are:
//'aix'
//'darwin'
//'freebsd'
//'linux'
//'openbsd'
//'sunos'
//'win32'

if (process.arch !== 'x64')
    throw "Only x64 architecture is supported";

// At his moment only Linux, MacOS, Android and Apple OS are supported
if (process.platform === "linux") {
    LD_LIBRARY_PATH = './libGcmAes.so';
} else if (process.platform === "darwin") {
    LD_LIBRARY_PATH = './libGcmAes.dylib';
}

module.exports = {

    getDataFromPointer: function getDataFromPointer(ref, pointer) {
        try {
            if (pointer) {
                var _buf = ref.readPointer(pointer, 0);
                return ref.readCString(_buf, 0);
            } else {
                return "";
            }
        } catch (error) {
            return "";
        }
    }
    ,
    unloadFFI: function unloadFFI() {
        var name = require.resolve('ffi-napi');
        delete require.cache[name];
    }
    ,
    unloadREF: function unloadREF() {
        var name = require.resolve('ref-napi');
        delete require.cache[name];
    }
    ,
    //bool _getNewAESKeyAndIv(/*[out]*/ char **outHexKey, /*[out]*/ char **outHexIv, /*[out]*/ int &outKeyLength, /*[out]*/ int &outIvLength);
    _getNewAESKeyAndIv: function _getNewAESKeyAndIv(HexKey, HexIv, KeyLength, IvLength) {

        /**
         *
         * @type Module ref|Module ref
         */
        var ref = require('ref-napi');
        var ffi = require('ffi-napi');


        // typedefs
        var intPtr = ref.refType(ref.types.int);
        var charPtr = ref.refType(ref.types.char);
        var charPtrPtr = ref.refType(charPtr);


        var outHexKey = Buffer.alloc(512);
        outHexKey.type = charPtrPtr;

        var outHexIv = Buffer.alloc(128);
        outHexIv.type = charPtrPtr;

        var outKeyLength = ref.alloc('int');
        var outIvLength = ref.alloc('int');


        var libHelper = ffi.Library(LD_LIBRARY_PATH, {
            "_getNewAESKeyAndIv": ['bool', [charPtrPtr, charPtrPtr, intPtr, intPtr]]
        });


        var boolReturn = libHelper._getNewAESKeyAndIv(outHexKey, outHexIv, outKeyLength, outIvLength);

        this.unloadFFI();

        if (boolReturn) {

            console.log("\n _getNewAESKeyAndIv ==> OK \n");

            HexKey.v = this.getDataFromPointer(ref, outHexKey);

            HexIv.v = this.getDataFromPointer(ref, outHexIv);

            KeyLength = outKeyLength.deref();

            IvLength = outIvLength.deref();

            return true;

        } else {
            console.log("\n _getNewAESKeyAndIv ==> FAILED \n");
        }

        return false;
    }
};
