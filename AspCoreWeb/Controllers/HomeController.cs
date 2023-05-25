using AspCoreWeb.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Text;

namespace AspCoreWeb.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        public ActionResult RunAllTests()
        {

            StringBuilder sb = new StringBuilder();

            string plainText = "Syllabic kana – hiragana(平仮名) and katakana(片仮名)";
            string outBase64Encoded = string.Empty;
            int dataLength = plainText.Length;

            bool result = AesGCMWrapper._base64Encode(plainText, ref outBase64Encoded, ref dataLength);

            sb.AppendLine(string.Format("<p>{0}</p>", "Test _base64Encode:"));

            if (result)
            {
                sb.AppendLine(string.Format("<p>{0}</p><p>{1}</p>", plainText, outBase64Encoded));
            }
            else
            {
                sb.AppendLine("_base64Encode failed");
            }

            string outBase64Decoded = string.Empty;
            dataLength = outBase64Encoded.Length;

            sb.AppendLine(string.Format("<br/><p>{0}</p>", "Test _base64Decode:"));
            result = AesGCMWrapper._base64Decode(outBase64Encoded, ref outBase64Decoded, ref dataLength);

            if (result)
            {
                sb.AppendLine(string.Format("<p>{0}</p><p>{1}</p>", outBase64Encoded, outBase64Decoded));
            }
            else
            {
                sb.AppendLine("_base64Decode failed");
            }


            string outHexEncoded = string.Empty;

            sb.AppendLine(string.Format("<br/><p>{0}</p>", "Test _hexEncode:"));
            result = AesGCMWrapper._hexEncode(plainText, ref outHexEncoded);

            if (result)
            {
                sb.AppendLine(string.Format("<p>{0}</p><p>{1}</p>", plainText, outHexEncoded));
            }
            else
            {
                sb.AppendLine("_hexEncode failed");
            }



            string outHexDecoded = string.Empty;

            sb.AppendLine(string.Format("<br/><p>{0}</p>", "Test _hexDecode:"));
            result = AesGCMWrapper._hexDecode(outHexEncoded, ref outHexDecoded);

            if (result)
            {
                sb.AppendLine(string.Format("<p>{0}</p><p>{1}</p>", outHexEncoded, outHexDecoded));
            }
            else
            {
                sb.AppendLine("_hexDecode failed");
            }



            string outHexKey = string.Empty;
            string outHexIv = string.Empty;
            int KeyLen = 0;
            int IVLen = 0;

            sb.AppendLine(string.Format("<br/><p>{0}</p>", "Test _getNewAESKeyAndIv:"));
            result = AesGCMWrapper._getNewAESKeyAndIv(ref outHexKey, ref outHexIv, ref KeyLen, ref IVLen);

            if (result)
            {
                sb.AppendLine(string.Format("<p>{0}</p><p>{1}</p>", outHexKey, outHexIv));
            }
            else
            {
                sb.AppendLine("_getNewAESKeyAndIv failed");
            }



            string outEncryptedBase64 = string.Empty;
            dataLength=0;

            sb.AppendLine(string.Format("<br/><p>{0}</p>", "Test _encrypt_GcmAes256:"));
            result = AesGCMWrapper._encrypt_GcmAes256(outHexKey, outHexIv, plainText, ref outEncryptedBase64, ref dataLength);

            if (result)
            {
                sb.AppendLine(string.Format("<p>{0}</p><p>{1}</p>", plainText, outEncryptedBase64));
            }
            else
            {
                sb.AppendLine("_encrypt_GcmAes256 failed");
            }


            string outDecrypted = string.Empty;
            dataLength = 0;

            sb.AppendLine(string.Format("<br/><p>{0}</p>", "Test _decrypt_GcmAes256:"));
            result = AesGCMWrapper._decrypt_GcmAes256(outHexKey, outHexIv, outEncryptedBase64, ref outDecrypted, ref dataLength);

            if (result)
            {
                sb.AppendLine(string.Format("<p>{0}</p><p>{1}</p>", outEncryptedBase64, outDecrypted));
            }
            else
            {
                sb.AppendLine("_decrypt_GcmAes256 failed");
            }


            return Content(sb.ToString(), "text/html; charset=utf-8");


        }
    }
}