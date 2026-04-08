import { getDB } from "@/lib/db";
import NewsClient from "./client";

export const dynamic = 'force-dynamic';

export default async function NewsAdminPage() {
  const db = await getDB();
  const entries = await db.all("SELECT * FROM news_entries ORDER BY id DESC");

  return <NewsClient initialEntries={entries} />;
}
