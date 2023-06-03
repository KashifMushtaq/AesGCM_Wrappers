# Repository projects demonstrate how AES 256 GCM Linux library (libGcmAes.so) could be used with C#, Java and NodeJS wrappers in a docker container.

![C# Wrapper](/Run.png)

### Introduction
This article will help you implement very strong, cross platform, AES 256 GCM encryption / decryption in your multi-platform projects. The samples here will demonstrate how you could wrap library and use it in a docker container:


![C# Test](/Test.png)

### Deploying libGcmAes.so

Clone Git repository and use Microsoft Visual Studio 2022 to open **AspCoreWeb** project.
It's a Linux docker container application. If you are using the C# Wrapper Class and libGcmAes.so in your own project, please don't forget **Copy Always** with docker. 
If deploying image in docker it must be in the bin folder where other .Net core binaries are as shown in pictures below:

![C# Deployment](/lib.png)

![C# Deployment](/lib2.png)


# C# Wrapper Class

```

using System.Runtime.InteropServices;

namespace AspCoreWeb
{
    public class AesGCMWrapper
    {
        private AesGCMWrapper() { }

        /*
        * Function returns base64 encoded string and true on success.
        * On failure function returns false.
        */
        //bool _base64Encode(/*[in]*/ const char *inPlainText, /*[out]*/ char **outBase64Encoded, /*[in, out]*/ int &dataLength);
        [DllImport("./libGcmAes.so", EntryPoint = "_base64Encode", SetLastError = true, CharSet = CharSet.Ansi, ExactSpelling = true, CallingConvention = CallingConvention.StdCall)]
        public static extern bool _base64Encode(
            /*[in]*/ [MarshalAs(UnmanagedType.LPStr)] string inPlainText,
            /*[out]*/ [MarshalAs(UnmanagedType.LPStr)] ref string outBase64Encoded,
            /*[in, out]*/ ref int dataLength
            );

        /*
        * Function returns base64 decoded string and true on success.
        * On failure function returns false.
        */
        //bool _base64Encode(/*[in]*/ const char *inPlainText, /*[out]*/ char **outBase64Encoded, /*[in, out]*/ int &dataLength);
        [DllImport("./libGcmAes.so", EntryPoint = "_base64Decode", SetLastError = true, CharSet = CharSet.Ansi, ExactSpelling = true, CallingConvention = CallingConvention.StdCall)]
        public static extern bool _base64Decode(
            /*[in]*/ [MarshalAs(UnmanagedType.LPStr)] string inBase64Text,
            /*[out]*/ [MarshalAs(UnmanagedType.LPStr)] ref string outPlainText,
            /*[in, out]*/ ref int dataLength
            );


        /*
        * Function returns Hex decoded string and true on success.
        * On failure function returns false.
        */
        //bool _hexEncode(/*[in]*/ const char *inData, /*[out]*/char **outHexEncoded);
        [DllImport("./libGcmAes.so", EntryPoint = "_hexEncode", SetLastError = true, CharSet = CharSet.Ansi, ExactSpelling = true, CallingConvention = CallingConvention.StdCall)]
        public static extern bool _hexEncode(
            /*[in]*/ [MarshalAs(UnmanagedType.LPStr)] string inData,
            /*[out]*/ [MarshalAs(UnmanagedType.LPStr)] ref string outHexEncoded
            );

        /*
        * Function returns Hex decoded string and true on success.
        * On failure function returns false.
        */
        //bool _hexDecode(/*[in]*/ const char* inHexEncodedText, /*[out]*/char** outHexDecoded);
        [DllImport("./libGcmAes.so", EntryPoint = "_hexDecode", SetLastError = true, CharSet = CharSet.Ansi, ExactSpelling = true, CallingConvention = CallingConvention.StdCall)]
        public static extern bool _hexDecode(
            /*[in]*/ [MarshalAs(UnmanagedType.LPStr)] string inHexEncodedText,
            /*[out]*/ [MarshalAs(UnmanagedType.LPStr)] ref string outHexDecoded
            );


        /*
        * Function returns encrypted base64 encoded string and true on success.
        * On failure function returns false.
        */
        //bool _encrypt_GcmAes256(/*[in]*/ const char *inHexKey, /*[in]*/ const char *inHexIv, /*[in]*/ const char *inPlainText, /*[out]*/ char **outEncryptedBase64, /*[in, out]*/ int &dataLength);
        [DllImport("./libGcmAes.so", EntryPoint = "_encrypt_GcmAes256", SetLastError = true, CharSet = CharSet.Ansi, ExactSpelling = true, CallingConvention = CallingConvention.StdCall)]
        public static extern bool _encrypt_GcmAes256(
            /*[in]*/ [MarshalAs(UnmanagedType.LPStr)] string inHexKey,
            /*[in]*/ [MarshalAs(UnmanagedType.LPStr)] string inHexIv,
            /*[in]*/ [MarshalAs(UnmanagedType.LPStr)] string inPlainText,
            /*[out]*/ [MarshalAs(UnmanagedType.LPStr)] ref string outEncryptedBase64,
            /*[in, out]*/ ref int dataLength
            );



        /*
        * Function returns decrypted string and true on success.
        * On failure function returns false.
        */
        //bool _decrypt_GcmAes256(/*[in]*/ const char *inHexKey, /*[in]*/ const char *inHexIv, /*[in]*/ const char *inBase64Text, /*[out]*/ char **outDecrypted, /*[in, out]*/ int &dataLength);
        [DllImport("./libGcmAes.so", EntryPoint = "_decrypt_GcmAes256", SetLastError = true, CharSet = CharSet.Ansi, ExactSpelling = true, CallingConvention = CallingConvention.StdCall)]
        public static extern bool _decrypt_GcmAes256(
            /*[in]*/ [MarshalAs(UnmanagedType.LPStr)] string inHexKey,
            /*[in]*/ [MarshalAs(UnmanagedType.LPStr)] string inHexIv,
            /*[in]*/ [MarshalAs(UnmanagedType.LPStr)] string inBase64Text,
            /*[out]*/ [MarshalAs(UnmanagedType.LPStr)] ref string outDecrypted,
            /*[in, out]*/ ref int dataLength
            );


        /*
        * Function returns new hex encoded AES 256 Key and IV and true on success.
        * On failure function returns false.
        */
        //bool _getNewAESKeyAndIv(/*[out]*/ char **outHexKey, /*[out]*/ char **outHexIv, /*[out]*/ int &outKeyLength, /*[out]*/ int &outIvLength);
        [DllImport("./libGcmAes.so", EntryPoint = "_getNewAESKeyAndIv", SetLastError = true, CharSet = CharSet.Ansi, ExactSpelling = true, CallingConvention = CallingConvention.StdCall)]
        public static extern bool _getNewAESKeyAndIv(
            /*[out]*/ [MarshalAs(UnmanagedType.LPStr)] ref string outHexKey,
            /*[out]*/ [MarshalAs(UnmanagedType.LPStr)] ref string outHexIv,
            /*[out]*/ ref int outKeyLength,
            /*[out]*/ ref int outIvLength
            );
    }
}

```

# NodeJS Wrapper (Linux)

Clone Git repository on Linux or Linux like systems. You can also use **libGcmAes** on **Apple's Mac Systems** (have to compile it for Mac).
**NodeJS** folder in the repository contains **Netbeans** based **NodeJS** sample project, Wrapper class and libGcmAes.so x64 binary.
To use in your own **NodeJS** project, just have to include library and **AesGcmHelper.js**. The **main.js** sample code shows the usage.


### Prerequisites:
Use **yum**, **dnf** or **apt-get** to install **nodejs** and **npm** packages. Then use **npm** to install:

    - sudo npm install --save -g ref-napi
    - sudo npm install --save -g ffi-napi

![NodeJS Project](/node1.png)

# AesGcmHelper.js NodeJS Class

```

/*
 Copyright (�) 2023 Kashif Mushtaq
 
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


```

### [Linux Lib](https://github.com/KashifMushtaq/AesGcm_Linux)
### [Windows DLL](https://github.com/KashifMushtaq/AesGcm_Windows)

The samples are coded using Microsoft Visual Studio 2022.
