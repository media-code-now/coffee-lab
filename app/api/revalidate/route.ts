import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { path, secret } = await request.json();
    const expectedSecret = process.env.REVALIDATE_SECRET;

    if (!expectedSecret || secret !== expectedSecret) {
      return NextResponse.json({ revalidated: false, message: "Invalid token" }, { status: 401 });
    }

    if (!path || typeof path !== "string") {
      return NextResponse.json({ revalidated: false, message: "Path required" }, { status: 400 });
    }

    revalidatePath(path);
    return NextResponse.json({ revalidated: true, path });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ revalidated: false, message: "Error revalidating" }, { status: 500 });
  }
}
