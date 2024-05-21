创建NextJs项目，输入项目名，其他选项默认。
# 主页
CSS动画：
https://github.com/cssanimation/css-animation-101
# 导航栏
```
<div className={navStyle.navLink}>  
    <a href="/">Home</a>  
    <a href="/knowledge">Knowledge</a>  
    <a href="/myrobot">MyRobot</a>  
</div>
```
对应目录结构：
> /app
> ├── Knowledge/
> 	└── page.tsx
> └── MyRobot/
>     └── page.tsx

规则：每个路径都是一个文件夹，文件夹内的page.tsx是页面。
```
export default function Page() {
	return({
		// 页面内容	
	})
}
```
