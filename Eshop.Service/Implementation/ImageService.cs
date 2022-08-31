using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Advanced;
using SixLabors.ImageSharp.Formats.Jpeg;
using SixLabors.ImageSharp.Processing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Service.Implementation
{
    public static class ImageService
    {
        public static byte[] ScaleImage(byte[] originalImage)
        {
            using var image = Image.Load(originalImage);
            image.Mutate(x => x.Resize((int)(image.Width * 0.25), (int)(image.Height * 0.25)));

            using (var memoryStream = new MemoryStream())
            {
                var imageEncoder = image.GetConfiguration().ImageFormatsManager.FindEncoder(JpegFormat.Instance);
                image.Save(memoryStream, imageEncoder);
                return memoryStream.ToArray();
            }
        }
    }
}
