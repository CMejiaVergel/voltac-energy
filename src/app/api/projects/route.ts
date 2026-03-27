import { NextResponse } from 'next/server';
import { getDB } from '@/lib/db';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import sharp from 'sharp';
import { revalidatePath } from 'next/cache';

async function compressAndSave(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const inputBuffer = Buffer.from(bytes);
  const uploadDir = join(process.cwd(), 'uploads', 'projects');
  await mkdir(uploadDir, { recursive: true });

  const uniqueName = Date.now() + '-' + file.name.replace(/[^a-zA-Z0-9.-]/g, '_').replace(/\.(png|bmp|tiff?)$/i, '.jpg');
  const finalName = uniqueName.endsWith('.jpg') || uniqueName.endsWith('.jpeg') ? uniqueName : uniqueName.replace(/\.[^.]+$/, '.jpg');

  const compressed = await sharp(inputBuffer)
    .resize({ width: 1920, withoutEnlargement: true })
    .jpeg({ quality: 80, progressive: true })
    .toBuffer();

  await writeFile(join(uploadDir, finalName), compressed);
  return '/api/uploads/projects/' + finalName;
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const db = await getDB();
    
    const name = formData.get('name') as string;
    const power = parseFloat(formData.get('power') as string);
    const powerUnit = formData.get('powerUnit') as string;
    const connectionType = formData.get('connectionType') as string;
    const status = formData.get('status') as string;
    const dateExecuted = formData.get('dateExecuted') as string;
    const projectType = formData.get('projectType') as string;
    const city = formData.get('city') as string;
    const department = formData.get('department') as string;
    const kwValue = parseFloat(formData.get('kwValue') as string);

    // Procesar imágenes
    const files = formData.getAll('files') as File[];
    const imageUrls: string[] = [];

    for (const file of files) {
      if (file && file.size > 0) {
        const url = await compressAndSave(file);
        imageUrls.push(url);
      }
    }

    const imageUrl = imageUrls[0] || null;
    const galleryJson = JSON.stringify(imageUrls);

    const capacityKw = powerUnit === 'W' ? power / 1000 : powerUnit === 'MW' ? power * 1000 : power;
    const annualGenerationKWh = capacityKw * 1642.5;
    const co2calc = annualGenerationKWh * 0.000164;
    const savingsCalc = annualGenerationKWh * kwValue;

    await db.run(
      `INSERT INTO projects (
        name, power, powerUnit, connectionType, status, dateExecuted, 
        projectType, city, department, kwValue, co2calc, savingsCalc, imageUrl, gallery
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, power, powerUnit, connectionType, status, dateExecuted, projectType, city, department, kwValue, co2calc, savingsCalc, imageUrl, galleryJson]
    );

    // No se puede usar revalidatePath directamente en un Route Handler si no funciona igual, 
    // pero desde Next.js 13+ revalidatePath está disponible.
    revalidatePath('/admin/proyectos');
    revalidatePath('/proyectos');
    revalidatePath('/');
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('API Error Project Insert:', error);
    return NextResponse.json({ success: false, error: error.message || 'Error processing request' }, { status: 500 });
  }
}
