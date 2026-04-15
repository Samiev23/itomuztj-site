import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get("courseId");

  const rows = await prisma.lessonProgress.findMany({
    where: { userId: session.user.id },
    select: { lessonId: true, courseId: true },
  });

  if (courseId === "kotlin" || courseId === "web") {
    const lessonIds = rows.filter((r) => r.courseId === courseId).map((r) => r.lessonId);
    return NextResponse.json({ lessonIds });
  }

  const kotlin = rows.filter((r) => r.courseId === "kotlin").map((r) => r.lessonId);
  const web = rows.filter((r) => r.courseId === "web").map((r) => r.lessonId);
  return NextResponse.json({ kotlin, web });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const courseId = typeof body === "object" && body !== null && "courseId" in body ? String((body as { courseId: unknown }).courseId) : "";
  const lessonId = typeof body === "object" && body !== null && "lessonId" in body ? String((body as { lessonId: unknown }).lessonId) : "";

  if (courseId !== "kotlin" && courseId !== "web") {
    return NextResponse.json({ error: "Invalid course" }, { status: 400 });
  }
  if (!lessonId) {
    return NextResponse.json({ error: "Invalid lesson" }, { status: 400 });
  }

  await prisma.lessonProgress.upsert({
    where: {
      userId_lessonId_courseId: {
        userId: session.user.id,
        lessonId,
        courseId,
      },
    },
    create: { userId: session.user.id, lessonId, courseId },
    update: { completedAt: new Date() },
  });

  return NextResponse.json({ ok: true });
}
