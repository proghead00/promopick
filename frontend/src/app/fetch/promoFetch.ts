import { PROMO_URL } from "@/lib/apiEndpoints";

export async function fetchPromos(token: string) {
  const res = await fetch(PROMO_URL, {
    headers: {
      Authorization: token,
    },
    next: {
      revalidate: 60 * 60,
      tags: ["dashboard"],
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  const response = await res.json();

  if (response?.data) {
    return response?.data;
  }

  return [];
}
