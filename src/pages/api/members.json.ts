import type { APIRoute } from 'astro';
import { getMembers } from '../../lib/members';

export const GET: APIRoute = async () => {
  const members = await getMembers();
  const data = members.map((m) => ({
    id: m.id,
    name: m.name,
    area: m.area?.label,
    website: m.web_presence?.website ?? null,
    products: (m.products ?? []).map((p) => p.name || p.category).filter(Boolean),
  }));

  return new Response(JSON.stringify({ count: data.length, members: data }, null, 2), {
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
};
