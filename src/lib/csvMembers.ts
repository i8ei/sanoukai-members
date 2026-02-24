import { readFile } from 'node:fs/promises';
import path from 'node:path';

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
