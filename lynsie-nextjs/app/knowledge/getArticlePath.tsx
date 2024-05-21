import fs from 'fs';
import path from 'path';

// 获取目录中的所有 Markdown 文件
const getMarkdownFilePath = (directory: string, markerDownFiles: string[]) => {
    var articlePath = path.resolve(directory);
    if (!fs.existsSync(articlePath)) {
        return;
    }

    const files = fs.readdirSync(articlePath);
    files.forEach((fileName: string) => {
        const filePath: string = `${articlePath}/${fileName}`;
        const fileStats: fs.Stats = fs.statSync(filePath);

        if (fileStats.isDirectory()) {
            getMarkdownFilePath(filePath, markerDownFiles);
        } else {
            if (path.extname(fileName) === '.md') {
                markerDownFiles.push(filePath);
            }
        }
    });
};

const getMarkdownFilesPath = (directory: string) => {
    var markerDownFiles: string[] = [];
    getMarkdownFilePath(directory, markerDownFiles);
    return markerDownFiles;
}

export { getMarkdownFilesPath };
