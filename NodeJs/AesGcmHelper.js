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

/***
 * Utility function to convert buffer to a CString
 */
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
    /***
     *  Unload library reference
     * @returns {undefined}
     */
    unloadFFI: function unloadFFI() {
        var name = require.resolve('ffi-napi');
        delete require.cache[name];
    }
    ,
    /***
     * Unload library reference
     * @returns {undefined}
     */
    unloadREF: function unloadREF() {
        var name = require.resolve('ref-napi');
        delete require.cache[name];
    }
    ,

    /***
     * Function to generate new Key and IV for AES 256 GCM. Returned Key and IV is Hex encoded.
     *  Returns true on success.
     * @param {type} HexKey
     * @param {type} HexIv
     * @param {type} KeyLength
     * @param {type} IvLength
     * @returns {Boolean}
     */
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

            KeyLength.v = outKeyLength.deref();

            IvLength.v = outIvLength.deref();

            return true;

        } else {
            console.log("\n _getNewAESKeyAndIv ==> FAILED \n");
        }

        return false;
    },

    /***
     *  Function to encryption based on AES 256 GCM algorithm. Returns true on success.
     * @param {type} inHexKey
     * @param {type} inHexIv
     * @param {type} inPlainText
     * @param {type} outEncryptedBase64
     * @param {type} outDataLength
     * @returns {Boolean}
     */
    //bool _encrypt_GcmAes256(/*[in]*/ const char *inHexKey, /*[in]*/ const char *inHexIv, /*[in]*/ const char *inPlainText, /*[out]*/ char **outEncryptedBase64, /*[in, out]*/ int &dataLength);
    _encrypt_GcmAes256: function _encrypt_GcmAes256(inHexKey, inHexIv, inPlainText, outEncryptedBase64, outDataLength) {
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


        var HexKey = Buffer.alloc(inHexKey.length + 1);
        HexKey.type = charPtr;
        HexKey.writeCString(inHexKey, 0, "UTF-8");

        var HexIv = Buffer.alloc(inHexIv.length + 1);
        HexIv.type = charPtr;
        HexIv.writeCString(inHexIv, 0);

        var PlainText = Buffer.alloc(inPlainText.length + 1);
        PlainText.type = charPtr;
        PlainText.writeCString(inPlainText, 0, "UTF-8");

        var EncryptedBase64 = Buffer.alloc(inPlainText.length * 2);
        PlainText.type = charPtrPtr;

        var DataLength = ref.alloc('int');

        var libHelper = ffi.Library(LD_LIBRARY_PATH, {
            "_encrypt_GcmAes256": ['bool', [charPtr, charPtr, charPtr, charPtrPtr, intPtr]]
        });


        var boolReturn = libHelper._encrypt_GcmAes256(HexKey, HexIv, PlainText, EncryptedBase64, DataLength);

        this.unloadFFI();

        if (boolReturn) {

            console.log("\n _encrypt_GcmAes256 ==> OK \n");

            outEncryptedBase64.v = this.getDataFromPointer(ref, EncryptedBase64);


            outDataLength.v = DataLength.deref();

            return true;

        } else {
            console.log("\n _encrypt_GcmAes256 ==> FAILED \n");
        }

        return false;
    },

    /***
     *  Function to decrypt AES 256 GCM encrypted string. Returns true on success.
     * @param {type} inHexKey
     * @param {type} inHexIv
     * @param {type} inBase64Text
     * @param {type} outDecryptedText
     * @param {type} outDataLength
     * @returns {Boolean}
     */
    //bool _decrypt_GcmAes256(/*[in]*/ const char *inHexKey, /*[in]*/ const char *inHexIv, /*[in]*/ const char *inBase64Text, /*[out]*/ char **outDecrypted, /*[in, out]*/ int &dataLength);
    _decrypt_GcmAes256: function _decrypt_GcmAes256(inHexKey, inHexIv, inBase64Text, outDecryptedText, outDataLength) {

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


        var HexKey = Buffer.alloc(inHexKey.length + 1);
        HexKey.type = charPtr;
        HexKey.writeCString(inHexKey, 0, "UTF-8");

        var HexIv = Buffer.alloc(inHexIv.length + 1);
        HexIv.type = charPtr;
        HexIv.writeCString(inHexIv, 0);

        var EncryptedBase64 = Buffer.alloc(inBase64Text.length + 1);
        EncryptedBase64.type = charPtr;
        EncryptedBase64.writeCString(inBase64Text, 0, "UTF-8");

        var DecryptedText = Buffer.alloc(inBase64Text.length * 4);
        DecryptedText.type = charPtrPtr;

        var DataLength = ref.alloc('int');

        var libHelper = ffi.Library(LD_LIBRARY_PATH, {
            "_decrypt_GcmAes256": ['bool', [charPtr, charPtr, charPtr, charPtrPtr, intPtr]]
        });


        var boolReturn = libHelper._decrypt_GcmAes256(HexKey, HexIv, EncryptedBase64, DecryptedText, DataLength);

        this.unloadFFI();

        if (boolReturn) {

            console.log("\n _decrypt_GcmAes256 ==> OK \n");

            outDecryptedText.v = this.getDataFromPointer(ref, DecryptedText);


            outDataLength.v = DataLength.deref();

            return true;

        } else {
            console.log("\n _decrypt_GcmAes256 ==> FAILED \n");
        }

        return false;
    }

};
