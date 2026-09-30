import { saveRequest } from "@/lib/server/db";
import { handleRequest } from "@/lib/server/request-handler.mjs";

export const runtime = "nodejs";

export async function POST(request) {
  return handleRequest(request, saveRequest);
}
