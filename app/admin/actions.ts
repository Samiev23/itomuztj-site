"use server";

import { revalidatePath } from "next/cache";
import { assertAdminSession } from "@/lib/adminAuth";
import { prisma } from "@/lib/prisma";

export async function activateSubscription(formData: FormData) {
  await assertAdminSession("/admin/users");
  const userId = String(formData.get("userId") ?? "");
  if (!userId) return;

  const end = new Date();
  end.setDate(end.getDate() + 30);

  await prisma.$transaction([
    prisma.user.update({
      where: { id: userId },
      data: { subscriptionActive: true, subscriptionEnd: end },
    }),
    prisma.payment.create({
      data: { userId, amount: 150, status: "Active" },
    }),
  ]);

  revalidatePath("/admin");
  revalidatePath("/admin/users");
  revalidatePath("/admin/payments");
  revalidatePath(`/admin/users/${userId}`);
}

export async function deactivateSubscription(formData: FormData) {
  await assertAdminSession("/admin/users");
  const userId = String(formData.get("userId") ?? "");
  if (!userId) return;

  await prisma.$transaction([
    prisma.user.update({
      where: { id: userId },
      data: { subscriptionActive: false },
    }),
    prisma.payment.create({
      data: { userId, amount: 0, status: "Expired" },
    }),
  ]);

  revalidatePath("/admin");
  revalidatePath("/admin/users");
  revalidatePath("/admin/payments");
  revalidatePath(`/admin/users/${userId}`);
}
