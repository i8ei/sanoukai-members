import { readFile } from 'node:fs/promises';
import path from 'node:path';

export type Member = {
  id: string;
  name?: string;
  name_short?: string;
  entity_type?: string;
  area?: {
    code?: string;
    label?: string;
    folder?: string;
  };
  location?: {
    postal_code?: string | null;
    address?: string | null;
    city?: string | null;
    lat?: number | null;
    lng?: number | null;
  };
  contact?: {
    representative?: string | null;
    phone?: string | null;
  };
  business?: {
    summary?: string | null;
    established?: string | null;
    employees?: string | null;
  };
  products?: Array<{
    category?: string | null;
    name?: string | null;
    description?: string | null;
  }>;
  sales_channels?: string[];
  certifications?: string[];
  awards?: Array<{
    title?: string | null;
    year?: string | null;
    description?: string | null;
  }>;
  web_presence?: {
    website?: string | null;
    sns?: string[];
    notes?: string | null;
  };
  images?: Array<{
    path: string;
    caption?: string | null;
  }>;
  shelf_potential?: string | null;
  unconfirmed_items?: string[];
  interview_questions?: string[];
  survey_responded?: boolean;
  source_file?: string;
  legacy_ids?: string[];
};

type MembersFile = {
  generated_at?: string;
  members: Member[];
};

let cache: MembersFile | null = null;

export async function loadMembersFile(): Promise<MembersFile> {
  // Disable memory cache during development so data changes are reflected
  const isProd = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.PROD;
  if (cache && isProd) return cache;

  const candidatePaths = [
    path.resolve(process.cwd(), 'members.generated.json'),
    path.resolve(process.cwd(), 'data/members.generated.json'),
    path.resolve(process.cwd(), '../members.generated.json'),
  ];

  let raw: string | null = null;
  let lastError: unknown = null;

  for (const dataPath of candidatePaths) {
    try {
      raw = await readFile(dataPath, 'utf-8');
      break;
    } catch (err) {
      lastError = err;
    }
  }

  if (raw === null) {
    throw new Error(`members.generated.json が見つかりません（探索先: ${candidatePaths.join(' , ')}）: ${String(lastError)}`);
  }
  const parsed = JSON.parse(raw) as Partial<MembersFile>;

  if (!Array.isArray(parsed.members)) {
    throw new Error('members.generated.json に members 配列がありません');
  }

  cache = {
    generated_at: parsed.generated_at,
    members: parsed.members,
  };

  return cache;
}

export async function getMembers(): Promise<Member[]> {
  const file = await loadMembersFile();
  return file.members;
}

export async function getMemberById(id: string): Promise<Member | undefined> {
  const members = await getMembers();
  return members.find((member) => member.id === id || (member.legacy_ids ?? []).includes(id));
}

export async function getGeneratedAt(): Promise<string | undefined> {
  const file = await loadMembersFile();
  return file.generated_at;
}

export function isPresent(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === 'object') return Object.keys(value as Record<string, unknown>).length > 0;
  return true;
}

export function fallback(value: string | null | undefined): string {
  return isPresent(value) ? String(value) : '情報準備中';
}

export function briefProducts(member: Member, max = 2): string {
  const products = member.products ?? [];
  if (products.length === 0) return '情報準備中';

  const names = products
    .map((p) => p.name || p.category)
    .filter((v): v is string => Boolean(v && v.trim()));

  if (names.length === 0) return '情報準備中';
  return names.slice(0, max).join(' / ');
}

export function briefSalesChannels(member: Member, max = 2): string {
  const channels = (member.sales_channels ?? []).filter((v) => v.trim().length > 0);
  if (channels.length === 0) return '情報準備中';
  return channels.slice(0, max).join(' / ');
}

export type CsvMember = {
  type: string;
  no: string;
  name: string;
  representative: string;
  postalCode: string;
  address: string;
  businessSummary: string;
  phone: string;
  email: string;
};

async function loadCsvMembers(): Promise<CsvMember[]> {
  const csvPath = path.resolve(process.cwd(), 'data/会員名簿_整形済み.csv');
  try {
    const raw = await readFile(csvPath, 'utf-8');
    const lines = raw.split('\n').filter((line: string) => line.trim().length > 0);
    // Skip header
    const dataLines = lines.slice(1);
    
    return dataLines.map((line: string) => {
      const cols = line.split(',');
      return {
        type: cols[0]?.trim() || '',
        no: cols[1]?.trim() || '',
        name: cols[2]?.trim() || '',
        representative: cols[3]?.trim() || '',
        postalCode: cols[5]?.trim() || '',
        address: cols[6]?.trim() || '',
        businessSummary: cols[7]?.trim() || '',
        phone: cols[8]?.trim() || '',
        email: cols[9]?.trim() || '',
      };
    });
  } catch (err) {
    console.error('Failed to load CSV:', err);
    return [];
  }
}

export async function getYouthMembers(): Promise<CsvMember[]> {
  const members = await loadCsvMembers();
  return members.filter((m) => m.type === '青年会員');
}

export async function getSupportingMembers(): Promise<CsvMember[]> {
  const members = await loadCsvMembers();
  return members.filter((m) => m.type === '賛助会員');
}
