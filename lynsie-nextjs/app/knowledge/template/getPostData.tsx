"use client"
import template from "./template.module.css"


import "./hightlight.js/styles/github.css"; // github样式文件
import hljs from "./hightlight.js/es/core"; // highlight.js核心
import cpp from "./hightlight.js/es/languages/cpp";
import c from "./hightlight.js/es/languages/c";

import {useEffect} from "react"; // 单独使用js部分

export default function Template(resolvedPostData: { contentHtml: any; }){
    useEffect(() => {
        hljs.registerLanguage("cpp", cpp);
        hljs.registerLanguage("c", c);
        hljs.highlightAll();
    });

    return (
        <div className={template.main}>
        <div dangerouslySetInnerHTML={{__html: resolvedPostData.contentHtml}}/>
    </div>
);
}