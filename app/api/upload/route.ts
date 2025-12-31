import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No image file provided' },
        { status: 400 }
      );
    }
    
    // Validasi tipe file
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      );
    }
    
    // Konversi file ke buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Generate nama file unik
    const uniqueFilename = `${uuidv4()}${path.extname(file.name)}`;
    
    // Tentukan path penyimpanan
    // Untuk Vercel, gunakan /tmp directory (temporary storage)
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    
    // Buat direktori jika belum ada (untuk development)
    const fs = await import('fs');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    const filepath = path.join(uploadDir, uniqueFilename);
    
    // Simpan file
    await writeFile(filepath, buffer);
    
    // Return URL yang dapat diakses publik
    const imageUrl = `/uploads/${uniqueFilename}`;
    
    return NextResponse.json({
      success: true,
      url: imageUrl,
      filename: uniqueFilename
    });
    
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}