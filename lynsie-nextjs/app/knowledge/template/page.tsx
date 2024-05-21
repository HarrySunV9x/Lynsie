import {getPostData} from "@/app/knowledge/getMarkDown";
import Template from "@/app/knowledge/template/getPostData";

export default async function App() {
    const postData = await getPostData('...');
    const resolvedPostData = await postData;

    // @ts-ignore
    return <Template contentHtml={resolvedPostData.contentHtml}/>;

}