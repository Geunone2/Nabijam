import path from "node:path";
import {readFile} from "node:fs/promises";

export type Counselor = {
    name: string;
    department: string;
    phoneNumber: string;
    description: string;
    path: string;
}


export async function getAllCounselors(): Promise<Counselor[]> {
    const filePath = path.join(process.cwd(), 'data', 'Counselors.json');
    return readFile(filePath, 'utf-8')
        .then<Counselor[]>(JSON.parse)
    // 날짜 순으로 정렬
    // .then(consoles => consoles.sort((a, b) => (a.date  > b.date ? -1 : 1)))
}

