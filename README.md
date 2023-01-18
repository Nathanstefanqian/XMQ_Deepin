# 前言

今天帮好兄弟xmq上传了一下他制作的网页deepin到github上

发现关于git命令还有很多未知的事情。说干就干，我们来处理一下这些工作！

# 创建并连接本地仓库与远程仓库

- 我选择的本地仓库路径如下

```shell
/Users/nathanq/Sites/XMQ/HTML-DEEPIN
```

- 首先初始化当前仓库

```shell
$ git init
提示：使用 'master' 作为初始分支的名称。这个默认分支名称可能会更改。要在新仓库中
提示：配置使用初始分支名，并消除这条警告，请执行：
提示：
提示：	git config --global init.defaultBranch <名称>
提示：
提示：除了 'master' 之外，通常选定的名字有 'main'、'trunk' 和 'development'。
提示：可以通过以下命令重命名刚创建的分支：
提示：
提示：	git branch -m <name>
```

这里有个有意思的提示，告诉我可以通过

```shell
git branch -m <name>
```

重命名master分支

- 状态检查命令，来检查当前的文件夹里的文件的提交状态与跟踪状态

```shell
$ git status
位于分支 master

尚无提交

未跟踪的文件:
  （使用 "git add <文件>..." 以包含要提交的内容）
	css/
	image/
	index.html

提交为空，但是存在尚未跟踪的文件（使用 "git add" 建立跟踪）
```

在远程仓库中的目录为 origin/master

- 本地仓库的文件建立跟踪

```shell
$ git add -A
```

- 进行确认提交

```shell
$ git commit -m "first commit"
[master（根提交） 9e2a32f] first commit
 56 files changed, 1378 insertions(+)
```

- 再次查看当前仓库状态

```shell
$ git status
git status
位于分支 master
无文件要提交，干净的工作区
```

- **非常重要的一步 与远程仓库建立连接**

```shell
$ git remote add origin git@github.com:Nathanstefanqian/git-test.git
```

- **将提交的内容推上远程仓库**

```shell
$ git push origin master
枚举对象中: 59, 完成.
对象计数中: 100% (59/59), 完成.
使用 8 个线程进行压缩
压缩对象中: 100% (59/59), 完成.
写入对象中: 100% (59/59), 1.17 MiB | 4.14 MiB/s, 完成.
总共 59（差异 3），复用 0（差异 0），包复用 0
remote: Resolving deltas: 100% (3/3), done.
To github.com:Nathanstefanqian/git-test.git
 * [new branch]      master -> master
```

就此连接仓库以及初步上传的工作就已经结束啦

在练习其他操作之前

我们先对git的工作区域进行一个研究！

# git工作区域的研究



## git的四个工作区域

分别为：

工作区域（Working Directory）、暂存区（Stage\Index）、本地仓库（Repository）、远程仓库（Remote Directory）

![image-20230118121535237](/Users/nathanq/Library/Application Support/typora-user-images/image-20230118121535237.png)

工作区：存放项目代码的地方

暂存区：用来临时存放改动的地方

本地仓库（版本库）：就是安全存放数据的位置，这里面有你提交到所有版本的数据。其中`HEAD`指向最新放入仓库的版本。

远程仓库：托管代码的服务器



## git的工作流程

git的工作流程一般分为以下几步：

在工作目录中添加、修改、删除文件(modified)；

将需要进行版本管理的文件放入暂存区(staged)；

将暂存区域的文件提交git仓库(committed)；

将本地git仓库修改推送到远程仓库；
因此，git管理的文件有三种状态：已修改(modified)、已暂存(staged)、已提交(committed)。

## 文件的四种状态

1. Untracked：未跟踪，此文件在文件夹中但并没有加入到git库，不参与版本控制，通过git add 状态变为Staged。

   

2. Unmodify：文件已经入库，未修改，即版本库中的文件快照内容与文件夹中完全一致，这种类型的文件有两种去处，1. 如果被修改，而变成Modefied,2. 如果使用git rm移除版本库，则成为Untracked文件。

   

3. Modified：文件已修改，仅仅时修改，并没有进行其他操作，这个文件也有两个去处，1. 通过git add可进入暂存Staged状态，2. 使用给git checkout 则丢弃修改内容，返回Unmodifiy状态，这个git checkout 即从库中去除文件，覆盖当前修改。
   

4. Staged：暂存状态，执行git commit 则将修改同步到库中，这时库中的文件和本地文件又变为一致，文件为Unmodify状态，执行git reset HEAD filename取消暂存，文件状态为Modified。
   

# 其他有意思的操作



## git pull与git clone

都是从git上拿到文件 这两个操作根据使用场景的不同 使用也会有限制

| 有权限 本地无代码     | git clone git pull                  |
| --------------------- | ----------------------------------- |
| **有权限 本地有代码** | **git pull（用于更新本地代码）**    |
| **无权限 本地无代码** | **git clone(不需要远程连接此仓库)** |
| **有权限 本地无代码** | **删除.git/ 重新初始化并连接仓库**  |

```shell
$ git pull git@github.com:fengcms/fengcms.git
kex_exchange_identification: Connection closed by remote host
Connection closed by 20.27.177.113 port 22
致命错误：无法读取远程仓库。
```

```shell
$ git pull git@github.com:Nathanstefanqian/git-test.git                                               1 ↵
git pull git@github.com:Nathanstefanqian/git-test.git
来自 github.com:Nathanstefanqian/git-test
 * branch            HEAD       -> FETCH_HEAD
已经是最新的。g
```



## git commit

```shell
git commit -a
```

-a的意思是 当前你已经通过 git add跟踪的文件如果发生了修改或者删除，那么它会自动提交更新，不需要你更新后手动git add

但是注意新添加的文件 依然需要使用 git add来跟踪这个文件



## git restore --staged <filename>

git restore --staged 命令，把文件从暂存区撤回到工作区，保留文件最后一次修改的内容；

git restore 命令，会撤销文件的修改，使文件恢复到暂存区或本地代码库（取决于文件在修改前的状态）；



## git branch与git checkout

git branch 查看当前仓库的分支

git branch <newBranch> 创建一个新的分支

git branch -d <Branch> 删除本地分支



git checkout <newBranch> 切换到新分支

git checkout -b <newBranch> 创建一个新分支并切换到新分支

### 遗留问题

未通过测试的语句：

git checkout . 放弃工作区所有修改

git checkout -- filename 放弃工作区某个文件的修改



## git remote

git remote add <hostname> <url>  新增一个远程主机名并连接到一个url

git remote rm <hostname> 删除远程分支

git remote -v   查看当前的远程主机



## git push

```shell
git push -u origin master
```

将本地分支的内容推到远程主机origin的master分支上 如果没有则创建一个

加上-u代表如果当前分支有连接多个远程主机，那么默认主机为origin，以后推送到origin可以直接写成

```shell
git push
```



## git 删除文件和文件夹



### 1. 仅仅删除远程分支文件，不删除本地文件

```shell
//文件删除
git rm --cached filename
git commit -m "delete remote file filename "
git push origin master(此处是当前分支的名字)
```

```shell
//文件夹删除
git rm -r --cached directoryname
git commit -m "delete remote directory directoryname "
git push origin master(此处是当前分支的名字)
```



### 2. 删除本地文件与远程分支文件

同上，将 --cached删去











