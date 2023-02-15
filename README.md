# @liangshen/plist-cli

**用于从 plist 文件中生成 typescript 的声明文件(即 .d.ts 文件)**

## 安装

```shell
npm i @liangshen/plist-cli -g
```

## 使用方法

**比如我有个 plist 文件(是 Iterm2 软件的编好文件)**

`~/Library/Preferences/com.googlecode.iterm2.plist`

```shell
plist ~/Library/Preferences/com.googlecode.iterm2.plist
```

**会在执行命令的目录下生成一个声明文件 com-googlecode-iterm2-plist.d.ts 声明接口 ComGooglecodeIterm2Plist**


 plist命令有俩个参数
- output(o): 文件输出的位置 默认为命令执行的位置
- name(n): 定义文件名和导出的类名 默认为plist文件名的变体(文件中的.替换成了-)

```shell
plist ~/Library/Preferences/com.googlecode.iterm2.plist -n preferences -o ~/
```

生成以下文件 导出的接口名为Preferences
`~/preferences.d.ts`