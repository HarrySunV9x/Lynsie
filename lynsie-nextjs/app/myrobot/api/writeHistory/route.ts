import path from "path";
import { promises as fs } from "fs";

export async function POST(request) {
    try {
        const res = await request.json();

        if (!res) {
            console.error('Invalid request body');
            return new Response(JSON.stringify({ res: 500 }), { status: 500, headers: { 'Content-Type': 'application/json' } });
        }

        const dirPath = path.join(process.cwd(), './history');
        const filePath = path.join(process.cwd(), `./history/${res.id}.txt`);

        // 确保目录存在
        try {
            await fs.mkdir(dirPath, { recursive: true });
        } catch (err) {
            if (err.code !== 'EEXIST') {
                throw err;
            }
        }

        const historyString = JSON.stringify(res.history);
        try {
            await fs.writeFile(filePath, historyString, { flag: 'wx' });
        } catch (err) {
            if (err.code === 'EEXIST') {
                await fs.writeFile(filePath, historyString);
            } else {
                throw err;
            }
        }

        console.log('File written successfully');
        return new Response(JSON.stringify({ res: 200 }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (err) {
        console.error('Error writing file', err);
        return new Response(JSON.stringify({ res: 500 }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}
