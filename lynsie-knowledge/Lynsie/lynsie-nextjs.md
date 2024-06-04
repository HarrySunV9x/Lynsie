创建NextJs项目，输入项目名，其他选项默认。
# CSS动画
https://github.com/cssanimation/css-animation-101
主页文字淡入使用示例：
``` CSS
@keyframes slideIn {  
    from {  
        transform: translateY(50%);  
        opacity: 0;  
    }  
    to {  
        transform: translateY(0);  
        opacity: 1;  
    }  
}

.mainPersonal {  
    margin-top: 3vh;  
    font-weight: 800;  
    animation: slideIn 0.5s ease-out forwards;  
    animation-delay: 0s;  
    opacity: 0;  
}  
  
.mainWork {  
    margin-top: 4vh;  
    animation: slideIn 0.5s ease-out forwards;  
    animation-delay: 0.5s;  
    opacity: 0;  
}  
  
.mainAbility {  
    margin-top: 4vh;  
    animation: slideIn 0.5s ease-out forwards;  
    animation-delay: 1s;  
    opacity: 0;  
}
```
# 模块化CSS
``` TypeScript
import style from "./style.module.css";
...
<div className={style.h1}>
```
CSS的文件命名要求*.module.css
防止不同模块的样式冲突
# 导航栏
页面跳转：
``` TypeScript
<div className={navStyle.navLink}>  
    <a href="/">Home</a>  
    <a href="/knowledge">Knowledge</a>  
    <a href="/myrobot">MyRobot</a>  
</div>
```

每个路径都是一个文件夹，文件夹内的page.tsx是页面：
> /app
> ├── Knowledge/
> 	└── page.tsx
> └── MyRobot/
>     └── page.tsx

主页组件：
``` TypeScript
export default function Page() {
	return({
		// 页面内容	
	})
}
```
# 前后端交互
robot页面通过调用后端接口收发消息，接口调用示例：
``` TypeScript
const LLM_ADDRESS = "http://localhost:8000/llama3/invoke";

fetch(LLM_ADDRESS, {  
    method: 'POST',  
    headers: {  
        'Content-Type': 'application/json'  
    },  
    body: JSON.stringify({  
        "input": {  
            "chat_history": chat_history,  
            "question": inputText  
        }  
    })  
}).then((res) => res.json())  
    .then((data) => {  
        setChatHistory((prevChatHistory) =>  
            JSON.stringify([  
                ...JSON.parse(prevChatHistory),  
                {Assistant: data.output},  
            ])  
        );  
        setLoadingState(false);  
    });
```
## Promise的链式调用
在这段代码中，使用了两个 `then` 是为了处理 Promise 的链式调用，以便按顺序处理异步操作的结果。具体来说，代码的逻辑如下：

1. **第一次 `then`**：在调用 `fetch` 之后，第一个 `then` 用于处理 `fetch` 请求的响应，并将其解析为 JSON 格式。
``` TypeScript
.then((res) => res.json())
```
2. **第二次 `then`**：在 JSON 解析完成之后，第二个 `then` 用于处理解析后的数据 `data`。这里对 `data` 进行处理，并更新组件的状态。
``` TypeScript
.then((data) => {
setChatHistory((prevChatHistory) =>
    JSON.stringify([
        ...JSON.parse(prevChatHistory),
        {Assistant: data.output},
    ])
);
setLoadingState(false);
});
```
这种链式调用的方式使得可以先处理网络请求的响应，然后再处理解析后的数据，并确保每一步的执行顺序正确。

总结起来，两个 `then` 分别用于：

- 第一次 `then`：解析 `fetch` 返回的响应为 JSON。
- 第二次 `then`：处理解析后的 JSON 数据并更新组件状态。