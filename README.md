## 记录提交

```shell
# 编译文件
jekyll build 

git add .

git commit -m "deploy mysite"

git remote add origin https://github.com/lishijie-me/lishijie-me.github.io.git

git push -f origin main
```


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
