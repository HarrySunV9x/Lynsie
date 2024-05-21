"use client"

import styles from "./page.module.css";
import Image from "next/image";
import "./background.css";

export default function Home() {
    return (
        <main className={styles.main}>
            <div className={styles.mainLogo}>
                <div className={styles.mainTitle}>
                    <span>
                    <Image className={styles.mainImage} src="/logo.png" alt="lynsie" width={150} height={150}/>
                </span>
                    <span>
                    <h1>灵汐 lynsie</h1>
                    <p>成为程序艺术家<br/>从十年前<br/>或者从现在</p>
                </span>
                </div>

                <div className={styles.mainText}>
                    <div className={styles.mainPersonal}>
                        <div>孙伟 (Harry Sun)</div>
                        <div>毕业于 复旦大学研究生 (Graduated from Fudan University as a postgraduate)</div>
                        <div>现 北京外企德科人力资源服务江苏有限公司 (working at FESCO Adecco, Jiangsu)</div>
                    </div>

                    <div className={styles.mainWork}>
                        <h4>北京外企德科人力资源服务上海有限公司 游戏中心开发部</h4>
                        <div><i>2023.10 - today 软件开发工程师</i></div>
                        <h4>北京外企德科人力资源服务上海有限公司 系统测试与兼容性验证部</h4>
                        <div><i>2022.08 - 2023.09 软件开发工程师</i></div>
                    </div>

                    <div className={styles.mainAbility}>
                        <div>编程语言：C/C++，Python，JavaScript</div>
                        <div>工具与环境：Linux操作系统，Native C++，网络编程、性能分析工具。</div>
                        <div>正在学习：Machine Learning、Next.js、两数之和</div>
                    </div>
                </div>
            </div>

            <div className={styles.mainFooter}>
                图片素材来着网络或者AI生成，如有侵权请联系我删除
            </div>
        </main>
    );
}
