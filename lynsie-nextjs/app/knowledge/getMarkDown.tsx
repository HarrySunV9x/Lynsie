import { remark } from 'remark';
import html from 'remark-html';
import fs from 'fs';
import matter from 'gray-matter';

export async function getPostData(postsDirectory: string) {
    const fileContents = fs.readFileSync(postsDirectory, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();

    // Combine the data with the id and contentHtml
    return {
        contentHtml,
        ...matterResult.data,
    };
}
