import * as dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs";
import { v2 as cloudinary } from "cloudinary";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const IMAGES_DIR = path.resolve(process.cwd(), "public/images");
const SUPPORTED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg", ".JPG", ".JPEG", ".PNG"];

interface UploadResult {
  localPath: string;
  cloudinaryUrl: string;
  publicId: string;
}

function getAllImageFiles(dir: string): string[] {
  const files: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getAllImageFiles(fullPath));
    } else if (SUPPORTED_EXTENSIONS.includes(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }
  return files;
}

async function main() {
  const imageFiles = getAllImageFiles(IMAGES_DIR);
  console.log(`\nFound ${imageFiles.length} images to upload...\n`);

  const results: UploadResult[] = [];
  let uploaded = 0;
  let failed = 0;

  for (const filePath of imageFiles) {
    const relativePath = path.relative(path.resolve(process.cwd(), "public"), filePath);
    // e.g. images/hero/Portrait.png
    const folder = path.dirname(relativePath); // e.g. images/hero
    const ext = path.extname(filePath);
    const publicId = path.basename(filePath, ext); // filename without extension

    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder,
        public_id: publicId,
        overwrite: true,
        resource_type: "auto",
      });

      const cloudinaryUrl = result.secure_url;
      console.log(`✅ ${path.basename(filePath)} → ${cloudinaryUrl}`);
      results.push({
        localPath: `/${relativePath}`,
        cloudinaryUrl,
        publicId: result.public_id,
      });
      uploaded++;
    } catch (err) {
      console.error(`❌ Failed: ${filePath}`, err);
      failed++;
    }
  }

  console.log(`\n--- Summary ---`);
  console.log(`✅ Uploaded: ${uploaded}`);
  console.log(`❌ Failed:   ${failed}`);

  const outputPath = path.resolve(process.cwd(), "scripts/upload-results.json");
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`\n📄 Results saved to scripts/upload-results.json`);
}

main();
