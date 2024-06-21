import path from "path";
// 这里使用 import  fs from "fs" 会报错
import { promises as fs } from "fs";
export async function GET() {
    const filePath = path.join(process.cwd(), `./history`);

    try {
        const files = await fs.readdir(filePath);
        console.log(filePath + ":" + files)
        const history = await Promise.all(files.map(async (file) => {
            const content = await fs.readFile(path.join(filePath, file), 'utf8');
            return { id: file.split('.')[0], history: JSON.parse(content) };
        }));
        return Response.json({ history })
    } catch (err) {
        return Response.json({ res: err })
    }
}
