"use server";

import { getDB } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

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
    const file = formData.get("file") as File | null;

    let imageUrl = null;
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadDir = join(process.cwd(), "public", "uploads", "projects");
      await mkdir(uploadDir, { recursive: true });
      const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const uniqueName = Date.now() + "-" + safeName;
      await writeFile(join(uploadDir, uniqueName), buffer);
      imageUrl = "/uploads/projects/" + uniqueName;
    }

    // Calcular formulas automáticas
    // 1. Estandarizar potencia en kW
    const capacityKw = powerUnit === "W" ? power / 1000 : powerUnit === "MW" ? power * 1000 : power;
    
    // 2. Generación anual estimada (Base: 4.5 Horas Sol Pico Colombia * 365 días = 1642.5 kWh/año por kW)
    const annualGenerationKWh = capacityKw * 1642.5;

    // 3. Impacto de Huella CO2 Evitado al año (Factor Colombia grid: ~0.164 ton CO2e por MWh -> 0.000164 por kWh)
    const co2calc = annualGenerationKWh * 0.000164;

    // 4. Ahorro Económico (Multiplicando Kw x valorKw x Horas de generacion anual)
    const savingsCalc = annualGenerationKWh * kwValue;

    await db.run(
      `INSERT INTO projects (
        name, power, powerUnit, connectionType, status, dateExecuted, 
        projectType, city, department, kwValue, co2calc, savingsCalc, imageUrl
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, power, powerUnit, connectionType, status, dateExecuted, projectType, city, department, kwValue, co2calc, savingsCalc, imageUrl]
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
