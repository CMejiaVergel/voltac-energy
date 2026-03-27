"use server";

import { getDB } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import sharp from "sharp";

// ── Compresión automática de imágenes ──
async function compressAndSave(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const inputBuffer = Buffer.from(bytes);
  const uploadDir = join(process.cwd(), "uploads", "projects");
  await mkdir(uploadDir, { recursive: true });

  const uniqueName = Date.now() + "-" + file.name.replace(/[^a-zA-Z0-9.-]/g, "_").replace(/\.(png|bmp|tiff?)$/i, ".jpg");
  const finalName = uniqueName.endsWith(".jpg") || uniqueName.endsWith(".jpeg") ? uniqueName : uniqueName.replace(/\.[^.]+$/, ".jpg");

  // Reescalar a max 1920px de ancho, calidad 80%, formato JPEG progresivo
  const compressed = await sharp(inputBuffer)
    .resize({ width: 1920, withoutEnlargement: true })
    .jpeg({ quality: 80, progressive: true })
    .toBuffer();

  await writeFile(join(uploadDir, finalName), compressed);
  return "/api/uploads/projects/" + finalName;
}

export async function togglePublishProject(id: number, currentPublished: boolean) {
  const db = await getDB();
  
  if (!currentPublished) {
    const pub = await db.all("SELECT id FROM projects WHERE isPublished = 1");
    if (pub.length >= 6) {
      return { success: false, error: "Ya tienes el máximo de 6 proyectos publicados. Oculta uno primero para mostrar este." };
    }
  }

  await db.run("UPDATE projects SET isPublished = ? WHERE id = ?", [currentPublished ? 0 : 1, id]);
  revalidatePath("/admin/proyectos");
  revalidatePath("/proyectos");
  revalidatePath("/");
  return { success: true };
}

export async function deleteProject(id: number, pass: string) {
  if (pass !== "voltacenergy2026") return { success: false, error: "Contraseña incorrecta." };
  const db = await getDB();
  await db.run("DELETE FROM projects WHERE id = ?", [id]);
  revalidatePath("/admin/proyectos");
  revalidatePath("/proyectos");
  revalidatePath("/");
  return { success: true };
}

export async function createProject(formData: FormData) {
  try {
    const db = await getDB();
    const name = formData.get("name") as string;
    const power = parseFloat(formData.get("power") as string);
    const powerUnit = formData.get("powerUnit") as string;
    const connectionType = formData.get("connectionType") as string;
    const status = formData.get("status") as string;
    const dateExecuted = formData.get("dateExecuted") as string;
    const projectType = formData.get("projectType") as string;
    const city = formData.get("city") as string;
    const department = formData.get("department") as string;
    const kwValue = parseFloat(formData.get("kwValue") as string);

    // Procesar todas las imágenes subidas
    const files = formData.getAll("files") as File[];
    const imageUrls: string[] = [];

    for (const file of files) {
      if (file && file.size > 0) {
        const url = await compressAndSave(file);
        imageUrls.push(url);
      }
    }

    // La primera imagen es la portada principal
    const imageUrl = imageUrls[0] || null;
    // Todas las imágenes como JSON array
    const galleryJson = JSON.stringify(imageUrls);

    // Calcular formulas automáticas
    const capacityKw = powerUnit === "W" ? power / 1000 : powerUnit === "MW" ? power * 1000 : power;
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

    revalidatePath("/admin/proyectos");
    revalidatePath("/proyectos");
    revalidatePath("/");
    
    return { success: true };
  } catch (err: any) {
    console.error(err);
    return { success: false, error: err.message };
  }
}

export async function getPublishedProjects() {
  const db = await getDB();
  const projects = await db.all("SELECT * FROM projects WHERE isPublished = 1 ORDER BY id DESC LIMIT 6");
  return projects;
}
