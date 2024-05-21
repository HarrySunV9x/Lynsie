"use client";

import navStyle from "./nav.module.css";
import Image from "next/image";
import Link from "next/link";
import {usePathname, useRouter} from 'next/navigation'

export default function Nav() {
    const router = useRouter();
    const isRootPath = usePathname() === "/";
    const navClass = isRootPath ? navStyle.navMain : navStyle.nav;
    return (
        <div className={navClass}>
            <div className={navStyle.navTitle}>
                <span className={navStyle.navLogo}>
                    <Image className={navStyle.navLogoImg} src="/logo.png" alt="lynsie" width={80} height={80}/>
                </span>
                <span className={navStyle.navText}>
                    <h1>lynsie</h1>
                    <p>my private technology spirited park</p>
                </span>
            </div>
            <div className={navStyle.navLink}>
                <a href="/">Home</a>
                <a href="/knowledge">Knowledge</a>
                <a href="/myrobot">MyRobot</a>
            </div>
        </div>
    )
}
