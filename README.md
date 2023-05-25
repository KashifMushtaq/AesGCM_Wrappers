# Repository projects demonstrate how AES 256 GCM Windows / Linux libraries could be used with docker containers using C#, Java and NodeJS)

![C# Wrapper](/Run.png)

### Introduction
This article will help you implement very strong, cross platform, AES 256 GCM encryption / decryption in your multi-platform projects. The samples here will demonstrate how you could wrap library and use it in a docker container:


![C# Test](/Test.png)

### Deploy libGcmAes.so

Don't forget **Copy Always** with docker. If deploying image in docker it must be in bin folder where other .Net core binaries are.

![C# Deployment](/lib.png)

![C# Deployment](/lib2.png)


### C# Wrapper Class

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

### [Linux Lib](https://github.com/KashifMushtaq/AesGcm_Linux)
### [Windows DLL](https://github.com/KashifMushtaq/AesGcm_Windows)

The samples are coded using Microsoft Visual Studio 2022.
