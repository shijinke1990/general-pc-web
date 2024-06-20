# 删除服务器旧的代码

```shell
ssh blb
rm -rf  /usr/share/nginx/html/lianlianbushe.com
```

## 复制代码到服务器

```shell
scp -r ./dist blb:/usr/share/nginx/html/lianlianbushe.com
```
