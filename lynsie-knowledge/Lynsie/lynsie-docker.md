Lynsie集成了多个程序，因此采用多阶段构建。
## docker-compose
`docker-compose.yml` 是一个用于定义和管理多容器 Docker 应用的 YAML 文件。在这个文件中可以描述应用程序的服务、网络、卷等内容，并通过 `docker-compose` 命令来一键部署和管理这些服务。
Lynsie的`docker-compose`示例：
``` yaml
# docker-compose.yml
services:
  python-app:
    build:
      context: .
      dockerfile: Dockerfile.langchain
      target: python-app
    ports:
      - "8000:8000"
    container_name: python-app-container

  node-app:
    build:
      context: .
      dockerfile: Dockerfile.nextjs
      target: node-app
    ports:
      - "3000:3000"
    container_name: node-app-container
```
规定了两个服务，对应的Dockerfile，并映射端口供本地访问。
## DockerFile
Dockerfile 是一个用于定义 Docker 容器镜像的文本文件，它包含了一系列的指令，这些指令描述了如何构建一个 Docker 镜像。每个指令会在镜像中创建一层，最终这些层会叠加起来形成一个完整的镜像。
### 基本结构
一个简单的 Dockerfile 可能包含以下几个部分：
1. 基础镜像
	`FROM` 指令指定了构建镜像所基于的基础镜像。每个 Dockerfile 都以这个指令开头。
	`FROM ubuntu:20.04`
2. 维护者信息
	`LABEL` 指令用来添加元数据，例如维护者信息。
	`LABEL maintainer="you@example.com"`
3. 环境变量设置
	`ENV` 指令用来设置环境变量。
	`ENV APP_ENV=production`
4. 复制文件到镜像
	`COPY` 和 `ADD` 指令用来将文件或目录复制到镜像中。
	COPY 将文件或目录从 build context 复制到镜像，其支持两种格式：
	- COPY src dest 
	- COPY[“src”,“dest”]  
	
	`COPY . /app`
	
	ADD 与 COPY 类似，复制文件到镜像，不同的是，ADD 的 src 是归档文件（tar、zip、tgz 等），这些归档文件会被自动解压到 dest （镜像目标路径），无需手动解压。
1. 安装依赖和软件
	`RUN` 指令用来执行命令，通常用于安装软件包和依赖。
	`RUN apt-get update && apt-get install -y python3 python3-pip`
6. 设置工作目录
	`WORKDIR` 指令用来设置工作目录。所有后续的 `COPY`、`ADD`、`RUN` 等指令都相对于这个目录。
	`WORKDIR /app`
7. 暴露端口
	`EXPOSE` 指令用来声明容器监听的端口。
	`EXPOSE 8080`
8. 运行命令
	`RUN`、 `CMD` 和 `ENTRYPOINT` 指令用来指定容器启动时执行的命令。
	[浅析 Dockerfile 中 RUN、CMD 以及 ENTRYPOINT 指令的异同](https://blog.csdn.net/LostUnravel/article/details/125819584)
	`CMD ["python3", "app.py"]`

Lynsie的Dockerfile示例：
```DockerFile
# Dockerfile.langchain
# 使用官方 Python 运行时作为父镜像
FROM python:3.11-slim AS python-app
# 将当前目录内容复制到工作目录
COPY ./lynsie-langchain /app/lynsie-langchain
# 切换到应用目录
WORKDIR /app/lynsie-langchain
# 安装依赖
RUN pip install --no-cache-dir -r requirements.txt
# 暴露端口
EXPOSE 8000
# 运行应用
CMD ["python", "main.py"]
```

```DockerFIle
# Dockerfile.nextjs
# 使用官方 Node.js 运行时作为父镜像
FROM node:20-slim AS node-app
# 将当前目录内容复制到工作目录
COPY ./lynsie-nextjs /app/lynsie-nextjs
# 切换到应用目录
WORKDIR /app/lynsie-nextjs
# 安装依赖
RUN npm install
# 暴露端口
EXPOSE 3000
# 运行应用
CMD ["npm", "run", "dev"]
```