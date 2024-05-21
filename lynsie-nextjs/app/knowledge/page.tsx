import knowledge from "./knowledge.module.css"
import { getMarkdownFilesPath } from './getArticlePath';
import {getPostData} from "@/app/knowledge/getMarkDown";

export default async function Knowledge() {
    return (
        <div className={knowledge.knowledgeMain}>
            <div className={knowledge.knowledgeContain}>
                <h1 className={knowledge.knowledgeHeader}>knowledge</h1>
                <div className={knowledge.articleItem}>
                    <h3>Socket编程</h3>
                    <div>操作系统（OS）的底层实现各异，导致了不同OS间可执行文件的兼容性问题。这种问题在Linux环境中尤为突出，因为Linux不仅有多种发行版，还有众多版本，即使是微小的版本更新也可能导致应用程序不兼容。这通常要求通过重新编译源码来解决。在不同操作系统中遇到可执行文件不兼容的问题，着实令人困扰。笔者第一年的工作就是处理网卡兼容性，一款网卡可能需要在数十个操作系统版本上进行测试。在明显与操作系统无关的问题出现时，由于系统更新导致的可执行文件不兼容令人十分头疼。为解决这一问题，一种有效的方案是跨平台编译。CMake是一种实现跨平台编译的构建系统，可以生成不同平台的编译脚本。Mellanox网卡驱动和笔者目前正在学习的OpenGL中使用的GLFW库都采用了CMake，使用起来非常便捷。

                        当然，CMake只是众多跨平台编译方法中的一种。例如，知名的DPDK就没有使用CMake，而是采用了meson。这里只是简单提及，不作深入讨论。
                    </div>
                </div>
                <div className={knowledge.articleItem}>
                    <h3>外部库引用——静态库、链接库与共享库</h3>
                    <div>我是一个喜欢打游戏的人。记得还在 Windows 7
                        的年代，每次重装系统都要顺手下载一个游戏组件库并安装，这样才能顺利打开各种游戏。要不然，就会出现缺这个缺那个的情况。

                        上周，博德之门 3 实至名归，拿到了 TGA 年度最佳游戏（2023）。可惜的是，博德之门 3 是一个低魔的世界，我仍很怀念当初博德之门
                        2 的连锁意外三凋死，投影拟像天使海。

                        但当我拿着 2022 年的 ROG 幻 14 经典白 Win11 打开这款 1998
                        年的游戏时，意料之中地报出了错误：找不到openal32.dll。很显然，如今的操作系统尽管已经不再需要像之前一样需要预先安装游戏组件，但仍不会兼容如此古老的库了。在日常编程中，也经过会接触类似的东西，比如著名的OpenGL的教程：
                    </div>
                </div>
                <button className={knowledge.moreButton}>More</button>
            </div>
        </div>
    );
}