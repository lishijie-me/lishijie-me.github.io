---
layout: post
title:  "jekyll-config-01"
date:   2024-12-21 10:06:01 +0800
categories: jekyll-config
typora-root-url: ..
---

- TOC
  
  {:toc}

## 问题引出

刚尝试用 `jekyll` + `github pages` 搭建了一个个人博客，有个图片配置文件，分享给大家

> 图片不能在 typora 和 jekyll 博客中同时显示的问题

首先，我已经配置完图片路径了，我的整个博客的目录层级如下：

```bash
mysite                                   
├─ assets                                
│  └─ 2024-12-21-jekyll-config           
│     └─ image-20241221102243755.png     
├─ _posts                                
│  └─ 2024-12-21-jekyll-config.md        
├─ _site                                 
│  ├─ about                              
│  │  └─ index.html                      
│  ├─ assets                             
│  │  ├─ 2024-12-21-jekyll-config        
│  │  │  └─ image-20241221102243755.png  
│  │  ├─ main.css                        
│  │  ├─ main.css.map                    
│  │  └─ minima-social-icons.svg         
│  ├─ jekyll-config                      
│  │  └─ 2024                            
│  │     └─ 356                          
│  │        └─ jekyll-config.html        
│  ├─ 404.html                           
│  ├─ feed.xml                           
│  ├─ index.html                         
│  └─ README.md                          
├─ 404.html                              
├─ about.markdown                        
├─ Gemfile                               
├─ Gemfile.lock                          
├─ index.markdown                        
├─ README.md                             
└─ _config.yml                           

```

## 问题解决

### 确定图片存放目录

博客根目录新建 `assets` 文件夹用以存放图片，我这里的规划是 每篇文章对应有个文章同名的图片文件夹，所以有如下操作

![image-20241221102243755](/assets/2024-12-21-jekyll-config/image-20241221102243755.png)

### 配置图片根目录

按下图配置，给文章里的图片设置图 片根目录

![image-20241221104601595](/assets/2024-12-21-jekyll-config/image-20241221104601595.png)

我这里直接选择了 **博客根目录** 作为 **图片根目录**，注意看文章头部会自动添加配置 `typora-root-url: ..` 

![image-20241221104742626](/assets/2024-12-21-jekyll-config/image-20241221104742626.png)

### 修改 全局图像设置

按如图步骤，进行配置 

![image-20241221105215323](/assets/2024-12-21-jekyll-config/image-20241221105215323.png)

启动博客验证图片配置，确认生效后，整个流程结束

## 写在最后

目前这个流程应该是最简单的了，有啥别的发现，再来更新