# Documentation of API

## 简介

前端使用AJAX调用后端接口。GET类接口参数使用URL参数传递，POST请求中参数使用简单表单传递，上传文件类接口使用multipart/form-data。

除了`/course/homework/submission/get_file`会返回二进制文件流，其他接口的响应的`Content-Type`都是`application/json`。成功请求的HTTP状态码是200，失败请求的状态码及状态码含义参考状态码部分的文档（如400、401等）。

响应中会包含`success`字段，值为1表示请求成功，可以继续处理响应中剩下的字段；值为0表示请求失败，与响应的状态码不是200的意义相同。

## 关于Cookie/Session

当调用登录成功时（`/auth/login`），返回的响应Header中会包含`Set-Cookie`字段，其中的值是需要客户端保存的Cookie信息，作为客户端已经登录的凭证，在后续调用后端接口时需要提供，***否则会返回401状态码***。

由于微信小程序不自动保存Cookie，所以需要前端代码手动保存Cookie，并将Cookie手动在调用后端接口时发送给后端。使用[weapp-cookie](https://github.com/charleslo1/weapp-cookie)可以简化这个流程。

前端开发时建议(人肉）保存一些Cookie值，调用需要用的接口时可以直接硬编码到请求里，避免每次都先登录一遍。***但是发布时请注意删掉硬编码***。

## 目录

* [用户 /user](#user)
* [用户验证 /auth](#auth)
* [课程 /course](#course)
* [课件 /course/slides](#courseslides)
* [作业 /course/homework](#coursehomework)
* [作业提交/course/homework/submissoin](#coursehomeworksubmission)
* [通知 /course/announcement](#courseannouncement)
* [问卷 /course/survey](#coursesurvey)
* [签到 /course/checkin](#coursecheckin)
* [状态码](#statuscode)

## <a name="user"></a>用户

### /user/register

#### 功能

用户注册

#### 请求方法

POST

#### 参数

```
username: "abc" // 字符串，用户名
last_name: "张" // 字符串，姓
first_name: "麻子" // 字符串，名
password: "oijdha" // 字符串，sha1后的密码
email: "a@b.com" // 字符串，邮箱地址
birthday_year: 1938 // 数字，生日的年
birthday_month: 12 // 数字，生日的月
birthday_day: 11 // 数字，生日的日
type: "student" 或 "teacher" // 字符串，用户类型
```

#### 成功响应

```
{
    "success": 1 // 数字，成功1，失败0
}
```

#### 可能的错误码

* 400
* 404
* 405
* 500

### /user/get_info

#### 功能

获取用户信息

#### 请求方法

GET

#### 参数

```
username: "abc" // 字符串，用户名
```

#### 成功响应

```
{
    "success": 1, // 数字，成功1，失败0
    "user_id": "5c479f02490df93d56d77a9b", // 字符串，用户ID
    "create_at": "2019-01-22T22:53:54.863000Z" // 字符串，用户创建时间
    "username": "abc", // 字符串，用户名
    "last_name": "张", // 字符串，姓
    "first_name": "麻子", // 字符串，名
    "email": "a@b.com", // 字符串，邮箱地址
    "birthday_year": 1938, // 数字，生日的年
    "birthday_month": 12, // 数字，生日的月
    "birthday_day": 11, // 数字，生日的日
    "type": "student" 或 "teacher", // 字符串，用户类型
}
```

#### 可能的错误码

* 400
* 403
* 404
* 405
* 500

### /user/update_info

#### 功能

更新用户信息

#### 请求方法

POST

#### 参数

```
username: "abc" // 字符串，用户名
last_name: "张" // 字符串，姓
first_name: "麻子" // 字符串，名
email: "a@b.com" // 字符串，邮箱地址
birthday_year: 1938 // 数字，生日的年
birthday_month: 12 // 数字，生日的月
birthday_day: 11 // 数字，生日的日
```

#### 成功响应

```
{
    "success": 1 // 数字，成功1，失败0
}
```

#### 可能的错误码

* 400
* 403
* 404
* 405
* 500

### /user/update_password

#### 功能

更新用户密码

#### 请求方法

POST

#### 参数

```
username: "abc" // 字符串，用户名。非admin用户只能传自己的用户名
old_password: "oiwefj" // 字符串，sha1后的老密码
new_password: "oijdha" // 字符串，sha1后的新密码
```

#### 成功响应

```
{
    "success": 1 // 数字，成功1，失败0
}
```

#### 可能的错误码

* 400
* 401
* 403
* 404
* 405
* 500

### /user/search

#### 功能

搜索用户。参数至少提供一个。提供多个的话每个参数是且的关系

#### 请求方法

GET

#### 参数

```
username: "abc" // 字符串，可选，用户名
email: "a@b.com" // 字符串，可选，邮箱地址
name: "王二麻子" // 字符串，可选，姓或名，或姓名。搜索条件是用户姓名全名包含name
type: "student"或"teacher" // 字符串，可选，用户类型
```

#### 成功响应

```
{
    "success": 1, // 数字，成功1，失败0。没搜索到也是1
    "users": [ // 数组，元素是所有匹配到的用户信息
        {
            "user_id": "5c479f02490df93d56d77a9b", // 字符串，用户ID
            "create_at": "2019-01-22T22:53:54.863000Z" // 字符串，用户创建时间
            "username": "user1" // 字符串，用户名
            "last_name" "张" // 字符串，姓
            "first_name": "麻子" // 字符串，名
            "email": "a@b.com" // 字符串，邮箱地址
            "birthday_year": 1938 // 数字，生日的年
            "birthday_month": 12 // 数字，生日的月
            "birthday_day": 11 // 数字，生日的日
            "type": "student" 或 "teacher" // 字符串，用户类型
        },
        {
            "user_id": "5c479f02490df93d56d77a9b", // 字符串，用户ID
            "create_at": "2019-01-22T22:53:54.863000Z" // 字符串，用户创建时间
            "username": "user2" // 字符串，用户名
            "last_name" "王" // 字符串，姓
            "first_name": "饺子" // 字符串，名
            "email": "b@b.com" // 字符串，邮箱地址
            "birthday_year": 1944 // 数字，生日的年
            "birthday_month": 3 // 数字，生日的月
            "birthday_day": 16 // 数字，生日的日
            "type": "student" 或 "teacher" // 字符串，用户类型
        },
        ...
    ]
}
```

#### 可能的错误码

* 400
* 403
* 404
* 405
* 500

## <a name="auth"></a>用户验证

### /auth/login

#### 功能

用户登录

#### 请求方法

POST

#### 参数

```
username: "abc" // 字符串，用户名
password: "oijdha" // 字符串，sha1后的密码
```

#### 成功响应

```
{
    "success": 1 // 数字，成功1，失败0
}
```

#### 可能的错误码

* 400
* 401
* 500

### /auth/send_email_verification_code

#### 功能

重设密码时请求向某个邮箱发送邮件

#### 请求方法

POST

#### 参数

```
email: "a@b.com" // 字符串，希望重设的账户的邮箱
```

#### 成功响应

```
{
    "success": 1 // 数字，成功1，失败0
}
```

#### 可能的错误码

* 400
* 404:没有找到邮箱是email的用户
* 500

### /auth/verify_code

#### 功能

用户请求发送重设密码的验证码后用来提交收到的验证码

#### 请求方法

POST

#### 参数

```
email: "a@b.com" // 字符串，希望重设的账户的邮箱
verification_code: "aodklcoiw" // 字符串，用户输入的其邮箱收到的验证码
```

#### 成功响应

```
{
    "success": 1, // 数字，成功1，失败0
    "is_verified": 0, // 数字，验证成功1，验证失败0
}
```

#### 可能的错误码

* 400
* 404:没找到邮箱是email的用户
* 500

### /auth/reset_password

#### 功能

用户重设密码验证码验证成功后用来重设密码

#### 请求方法

POST

#### 参数

```
email: "a@b.com" // 字符串，希望重设的账户的邮箱
verification_code: "aodklcoiw" // 字符串，用户输入的其邮箱收到的验证码
new_password: "sdiojoeiwfjiw" // 字符串，sha1加密的新密码
```

#### 成功响应

```
{
    "success": 1, // 数字，成功1，失败0
    "is_verified": 0, // 数字，验证成功1，验证失败0。1也代表密码重设成功
}
```

#### 可能的错误码

* 400
* 404:没找到邮箱是email的用户
* 500

## <a name="course"></a>课程

### /course/create

#### 功能

创建课程

#### 请求方法

POST

#### 参数

```
course_name: "abc" // 字符串，课程名
```

#### 成功响应

```
{
    "success": 1, // 数字，成功1，失败0
    "course_id": "siwqoxmc39x" // 字符串，生成的课程的ID
    "course_name": "ECE 101" // 字符串，课程名
}
```

#### 可能的错误码

* 400
* 403
* 404
* 405
* 500


### /course/get_all

#### 功能

查询全部课程

#### 请求方法

GET

#### 参数

无

#### 成功响应

```
{
    "success": 1, // 数字，成功1，失败0。没有课程也是1
    "courses": [ // 数组，每个元素是一个课程
        {
            "course_id": "siwqoxmc39x" // 字符串，生成的课程的ID
            "course_name": "听力" // 字符串，课程名
            "create_at": "2019-01-21T05:18:42.809000Z"  // 字符串，创建时间，升序排序
        },
        ...
    ]
}
```

#### 可能的错误码

* 403
* 405
* 500

### /course/add_students

#### 功能

向课程里添加学生

#### 请求方法

POST

#### 参数

```
course_id: "zxci238rxw" // 字符串，课程ID
student_usernames: "user1,user2" // 字符串，逗号分隔的学生用户名
```

#### 成功响应

```
{
    "success": 1
}
```

#### 可能的错误码

* 400
* 403
* 404
* 405
* 409
* 500

### /course/add_teachers

#### 功能

向课程里添加老师

#### 请求方法

POST

#### 参数

```
course_id: "zxci238rxw" // 字符串，课程ID
teacher_usernames: "user1,user2" // 字符串，逗号分隔的老师用户名
```

#### 成功响应

```
{
    "success": 1
}
```

#### 可能的错误码

* 400
* 403
* 404
* 405
* 409
* 500

### /course/get_all_students

#### 功能

查询课程里的学生

#### 请求方法

GET

#### 参数

```
course_id: "zxci238rxw" // 字符串，课程ID
```

#### 成功响应

```
{
    "success": 1, // 数字，成功1，失败0。没搜索到也是1
    "users": [ // 数组，元素是所有匹配到的用户信息。按照create_at升序排序
        {
            "user_id": "5c479f02490df93d56d77a9b", // 字符串，用户ID
            "last_name" "张" // 字符串，姓
            "first_name": "麻子" // 字符串，名
            "email": "a@b.com" // 字符串，邮箱地址
            "birthday_year": 1938 // 数字，生日的年
            "birthday_month": 12 // 数字，生日的月
            "birthday_day": 11 // 数字，生日的日
            "type": "student" // 字符串，用户类型
            "create_at": "2019-01-21T05:18:42.809000Z"  // 字符串，创建时间
        },
        {
            "user_id": "5c479f02490df93d56d77a9b", // 字符串，用户ID
            "last_name" "王" // 字符串，姓
            "first_name": "饺子" // 字符串，名
            "email": "b@b.com" // 字符串，邮箱地址
            "birthday_year": 1944 // 数字，生日的年
            "birthday_month": 3 // 数字，生日的月
            "birthday_day": 16 // 数字，生日的日
            "type": "student" // 字符串，用户类型
            "create_at": "2019-01-21T05:18:42.809000Z"  // 字符串，创建时间
        },
        ...
    ]
}
```

#### 可能的错误码

* 400
* 403
* 404
* 405
* 500

### /course/get_all_teachers

#### 功能

查询课程里的老师

#### 请求方法

GET

#### 参数

```
course_id: "zxci238rxw" // 字符串，课程ID
```

#### 成功响应

```
{
    "success": 1, // 数字，成功1，失败0。没搜索到也是1
    "users": [ // 数组，元素是所有匹配到的用户信息。按照create_at升序排序
        {
            "user_id": "5c479f02490df93d56d77a9b", // 字符串，用户ID
            "username": "user1" // 字符串，用户名
            "last_name" "张" // 字符串，姓
            "first_name": "麻子" // 字符串，名
            "email": "a@b.com" // 字符串，邮箱地址
            "birthday_year": 1938 // 数字，生日的年
            "birthday_month": 12 // 数字，生日的月
            "birthday_day": 11 // 数字，生日的日
            "type": "teacher" // 字符串，用户类型
            "create_at": "2019-01-21T05:18:42.809000Z"  // 字符串，创建时间
        },
        {
            "user_id": "5c479f02490df93d56d77a9b", // 字符串，用户ID
            "username": "user2" // 字符串，用户名
            "last_name" "王" // 字符串，姓
            "first_name": "饺子" // 字符串，名
            "email": "b@b.com" // 字符串，邮箱地址
            "birthday_year": 1944 // 数字，生日的年
            "birthday_month": 3 // 数字，生日的月
            "birthday_day": 16 // 数字，生日的日
            "type": "teacher" // 字符串，用户类型
            "create_at": "2019-01-21T05:18:42.809000Z"  // 字符串，创建时间
        },
        ...
    ]
}
```

#### 可能的错误码

* 400
* 403
* 404
* 405
* 500

### /course/delete_students

#### 功能

从特定课程中删除特定学生

#### 请求方法

POST

#### 参数

```
course_id: "zxci238rxw" // 字符串，课程ID
student_usernames: "user1,user2" // 字符串，逗号分隔的学生用户名
```

#### 成功响应

```
{
    "success": 1 // 数字，表示成功
}
```

#### 可能的错误码

* 400
* 403
* 404
* 405
* 500

### /course/delete_teachers

#### 功能

从特定课程中删除特定教师

#### 请求方法

POST

#### 参数

```
course_id: "zxci238rxw" // 字符串，课程ID
teacher_usernames: "user1,user2" // 字符串，逗号分隔的教师用户名
```

#### 成功响应

```
{
    "success": 1 // 数字，表示成功
}
```

#### 可能的错误码

* 400
* 403
* 404
* 405
* 500

### /course/search

#### 功能

搜索某个学生参加的所有课程或某个老师负责的所有课程(只能搜索自己)

#### 请求方法

GET

#### 参数

参数只对管理员提供，普通用户不需要传参（因为普通用户只能查看自己的课程），传了会返回403；

管理员传参只能二选一

```
student_id: "19aisdaj1939s9a"
teacher_id: "aisdjaisjdfo12i"
```

#### 成功响应

```
{ // 按照create_at升序排序
    "success": 1, // 数字，成功1，失败0。没有课程也是1
    "courses": [ // 数组，每个元素是一个课程
        {
            "course_id": "siwqoxmc39x" // 字符串，生成的课程的ID
            "course_name": "听力" // 字符串，课程名
            "create_at": "2019-01-26T19:30:03.473497Z" // 字符串，创建时间
        },
        ...
    ]
}
```

#### 可能的错误码

* 400
* 403
* 404
* 405
* 500

## <a name="courseslides"></a>课件

### /course/slides/create

#### 功能

创建一个新课件

#### 请求方法

POST

#### 参数

```
course_id: "zxci238rxw" // 字符串，课程ID
author: "ajiasjifaisd" // 字符串，上传者ID
title: "课件1" // 字符串，课件名
content: "课件1地址：http://xxxx.com" // 字符串，课件内容
```

#### 成功响应

```
{
    "slides_id": "5c4aae305f9b0d363061b5d9",
    "success": 1
}
```

#### 可能的错误码

* 400
* 403
* 405
* 500

### /course/slides/list

#### 功能

查看某一门课的全部课件

#### 请求方法

GET

#### 参数

```
course_id: "zxci238rxw" // 字符串，课程ID
```

#### 成功响应

```
{
    "slides": [ // 按照create_at升序排序
        {
            "author": "aijsijaijsf", // 字符串，上传者ID
            "content": "课件3地址：http://www.baidu.com", // 字符串，课件内容
            "slides_id": "5c4a456d5f9b0d5e48787971", // 字符串，课件ID
            "title": "课件3" // 字符串，课件标题
            "create_at": "2019-01-21T05:18:42.809000Z"  // 字符串，创建时间
        },
        {
            "author": "asdfjtytryt", // 字符串，上传者ID
            "content": "课件4地址：http://www.baidu.com", // 字符串，课件内容
            "slides_id": "5c4aae305f9b0d363061b5d9", // 字符串，课件ID
            "title": "课件4" // 字符串，课件标题
            "create_at": "2019-01-21T05:18:42.809000Z"  // 字符串，创建时间
        }
    ],
    "success": 1
}
```

#### 可能的错误码

* 400
* 403
* 404
* 405
* 500

### /course/slides/update

#### 功能

更新某一个课件

#### 请求方法

POST

#### 参数

```
slides_id: "zxci238rxw" // 字符串，课程ID
title: "新课件" // 字符串，课件名
content: "新课件内容" // 字符串，新课件内容
```

#### 成功响应

```
{
    "success": 1
}
```

#### 可能的错误码

* 400
* 403
* 404
* 405
* 500

### /course/slides/delete

#### 功能

删除某一个课件

#### 请求方法

POST

#### 参数

```
slides_id: "zxci238rxw" // 字符串，课程ID
```

#### 成功响应

```
{
    "success": 1
}
```

#### 可能的错误码

* 400
* 403
* 404
* 405
* 500

### /course/slides/get

#### 功能

获得某一个课件

#### 请求方法

GET

#### 参数

```
slides_id: "zxci238rxw" // 字符串，课程ID
```

#### 成功响应

```
{
    "slides": {
        "author": "sjifasdsj", // 字符串，上传者ID
        "content": "123", // 字符串，课件内容
        "title": "新新新新课件" // 字符串，课件标题
    },
    "success": 1
}
```

#### 可能的错误码

* 400
* 403
* 404
* 405
* 500

## <a name="coursehomework"></a>作业

### /course/homework/create

#### 功能

给课程创建作业

#### 请求方法

POST

#### 参数

```
course_id: "zxci238rxw" // 字符串，课程ID
title: "作业1" // 字符串，作业标题
content: "明天的课取消" // 字符串，作业内容
deadline: "2018-01-31T14:32:19Z" // 字符串，UTC时间戳
```

#### 成功响应

```
{
    "success": 1, // 数字，成功1，失败0
    "homework_id": "aoi489x" // 字符串，生成的作业的ID
}
```

#### 可能的错误码

* 400
* 403
* 404
* 405
* 500

### /course/homework/update

#### 功能

更新作业

#### 请求方法

POST

#### 参数

```
course_id: "zxci238rxw" // 字符串，课程ID
homework_id: "aoi489x" // 字符串，要修改的作业的ID
title: "作业1" // 字符串，作业标题
content: "明天的课取消" // 字符串，作业内容
deadline: "2018-01-31T14:32:19Z" // 字符串，UTC时间戳
```

#### 成功响应

```
{
    "success": 1 // 数字，成功1，失败0
}
```

#### 可能的错误码

* 400
* 403
* 404
* 405
* 500

### /course/homework/get_all

#### 功能

获取某个课程的全部作业

#### 请求方法

GET

#### 参数

```
course_id: "zxci238rxw" // 字符串，课程ID
```

#### 成功响应

```
{
    "success": 1, // 数字，成功1，失败0
    "homeworks": [ // 数组，每一项是一个作业。按create_at升序排列
        {
            "homework_id": "sis84ixl" // 字符串，作业ID
            "course_id": "zxci238rxw" // 字符串，作业所属课程ID
            "title": "作业1" // 字符串，作业标题
            "content": "读报20分钟" // 字符串，作业内容
            "deadline": "2018-01-31T14:32:19Z" // 字符串，UTC时间戳，截止时间
            "create_at": "2018-01-15T11:30:02Z" // 字符串，UTC时间戳，作业创建时间
        },
        ...
    ]
}
```

#### 可能的错误码

* 400
* 403
* 404
* 405
* 500

### <a name="coursehomeworksubmission"></a> /course/homework/submission/submit

#### 功能

提交作业

#### 请求方法

POST

#### 参数

```
course_id: "zxci238rxw" // 字符串，课程ID
homework_id: "sis84ixl" // 字符串，作业ID
content: "[ // JSON格式的字符串；原本是数组，每个元素是一个提交的内容，之后会按照相同顺序返回
    {
        \"type\": \"text\",
        \"content\": \"1+1=2\"
    },
    {
        \"type\": \"audio\",
        \"file_name\": \"a.wav\"
    },
    {
        \"type\": \"text\",
        \"content\": \"e=mc2\"
    },
    {
        \"type\": \"video\",
        \"file_name\": \"a.mp4\"
    },
    {
        \"type\": \"image\",
        \"file_name\": \"a.jpg\"
    },
    {
        \"type\": \"image\",
        \"file_name\": \"b.jpg\"
    },
    ...
]"
// 以下都是二进制文件流，需要把content中的所有文件放在这里，文件名作为字段名
a.wav: 二进制文件流
a.mp4: 二进制文件流
a.jpg: 二进制文件流
b.jpg: 二进制文件流
```

#### 成功响应

```
{
    "success": 1, // 数字，成功1，失败0
    "submission_id": "soidxji498a" // 字符串，提交的作业的ID
}
```

#### 可能的错误码

* 400
* 403
* 404
* 405
* 409
* 500

### /course/homework/submission/get_students

#### 功能

（给老师用）获取某个作业的所有被提交了的submission。不包含未提交的学生的信息，如果希望知道谁没提交，需要和/course/get_all_students的结果进行比较，看缺少哪个学生的submission

#### 请求方法

GET

#### 参数

```
course_id: "zxci238rxw" // 字符串，课程ID
homework_id: "sis84ixl" // 字符串，作业ID
```

#### 成功响应

```
{
    "success": 1, // 数字，成功1，失败0
    "submissions": [ // 数组，每项是一个学生的提交信息。按create_at升序排列
        {
            "submission_id": "soidxji498a", // 字符串，提交的作业ID
            "student_info": { // 学生的信息
                "user_id": "5c479f02490df93d56d77a9b", // 字符串，用户ID
                "create_at": "2019-01-22T22:53:54.863000Z" // 字符串，用户创建时间
                "username": "abc" // 字符串，用户名
                "last_name" "张" // 字符串，姓
                "first_name": "麻子" // 字符串，名
                "email": "a@b.com" // 字符串，邮箱地址
                "birthday_year": 1938 // 数字，生日的年
                "birthday_month": 12 // 数字，生日的月
                "birthday_day": 11 // 数字，生日的日
            }
            "is_marked": 0, // 数字，0或1。0表示未批改，1表示已批改
            "after_deadline": 0, // 数字，0或1。0表示提交时未过deadline，1表示提交时已过deadline
            "create_at": "2018-01-15T11:30:02Z" // 字符串，UTC时间戳，作业提交时间
        }
    ]
}
```

#### 可能的错误码

* 400
* 403
* 404
* 405
* 500

### /course/homework/submission/get_self

#### 功能

（给学生用）获取某个课的所有提交了的submission的ID

#### 请求方法

GET

#### 参数

```
course_id: "zxci238rxw" // 字符串，课程ID
```

#### 成功响应

```
{
    "success": 1, // 数字，成功1，失败0
    "submissions": [ // 数组，每项是一个提交信息。按create_at升序排列
        {
            "homework": {
                "homework_id": "sis84ixl" // 字符串，作业ID
                "course_id": "zxci238rxw" // 字符串，作业所属课程ID
                "title": "作业1" // 字符串，作业标题
                "content": "读报20分钟" // 字符串，作业内容
                "deadline": "2018-01-31T14:32:19Z" // 字符串，UTC时间戳，截止时间
                "create_at": "2018-01-15T11:30:02Z" // 字符串，UTC时间戳，作业创建时间
            }
            "submission_id": "soidxji498a", // 字符串，提交的作业ID
            "is_marked": 0, // 数字，0或1。0表示未批改，1表示已批改,
            "after_deadline": 0, // 数字，0或1。0表示提交时未过deadline，1表示提交时已过deadline
            "create_at": "2018-01-15T11:30:02Z" // 字符串，UTC时间戳，作业提交时间
        },
        ...
    ]
}
```

#### 可能的错误码

* 400
* 403
* 404
* 405
* 500

### /course/homework/submission/get

#### 功能

(给老师和学生用)获取某个作业提交的内容

#### 请求方法

GET

#### 参数

```
course_id: "zxci238rxw" // 字符串，课程ID
homework_id: "sis84ixl" // 字符串，作业ID
submission_id: "soidxji498a" // 字符串，要获取的作业提交的ID
```

#### 成功响应

```
{
    "success": 1, // 数字，成功1，失败0
    "content": [ // 数组，每个元素代表一个提交的东西（文字、图片等)，和提交时的顺序相同
        {
            "type": "text",
            "content": "1+1=2"
        },
        {
            "type": "audio",
            "file_id": "ewoioewioweioew2" // 调用/course/homework/submission/get_file获取文件
        },
        {
            "type": "text",
            "content": "e=mc2"
        },
        {
            "type": "video",
            "file_id": "oweiskldo29we"
        },
        {
            "type": "image",
            "file_id": "weecklisiodio290"
        },
        {
            "type": "image",
            "file_id": "sdoilcklio298"
        }
        ...
    ],
    "is_marked": 0, // 数字，0或1。0表示未批改，1表示已批改
    "after_deadline": 1 // 数字，是不是在deadline后提交的。1是，0不是
}
```

### /course/homework/submission/get_file

#### 功能

(给老师和学生用)获取某个作业提交中的文件

#### 请求方法

GET

#### 参数

```
course_id: "zxci238rxw" // 字符串，课程ID
homework_id: "sis84ixl" // 字符串，作业ID
submission_id: "soidxji498a" // 字符串，要获取的作业提交的ID
file_id: "sdoiioldsiodsi290" // 字符串，要获取的作业提交中的文件的ID
```

#### 成功响应

二进制文件流

#### 可能的错误码

* 400
* 403
* 404
* 405
* 500

### /course/homework/submission/mark

#### 功能

（给老师用）给某个作业判分

#### 请求方法

POST

#### 参数

```
course_id: "zxci238rxw" // 字符串，课程ID
homework_id: "sis84ixl" // 字符串，作业ID
submission_id: "soidxji498a" // 字符串，要判分的作业提交的ID
content: "作业不错" // 字符串，对作业的评语
score: 38 // 整数，作业的分数
```

#### 成功响应

```
{
    "success": 1, // 数字，成功1，失败0
}
```

#### 可能的错误码

* 400
* 403
* 404
* 405
* 409
* 500

### /course/homework/submission/get_mark

#### 功能

（给老师、学生用）获取某个作业的评语、分数、最高分、最低分、平均分

#### 请求方法

GET

#### 参数

```
course_id: "zxci238rxw" // 字符串，课程ID
homework_id: "sis84ixl" // 字符串，作业ID
submission_id: "soidxji498a" // 字符串，要获取的作业提交的ID
```

#### 成功响应

```
{
    "success": 1, // 数字，成功1，失败0
    "content": "作业不错" // 字符串，对作业的评语
    "score": 38 // 数字，作业分数
    "score_highest": 59 // 数字，所有学生的作业最高分
    "score_lowest": 24 // 数字，所有学生的作业最低分
    "score_average": 33 // 数字，所有学生的作业平均分
}
```

#### 可能的错误码

* 400
* 403
* 404
* 405
* 500

## <a name="courseannouncement"></a>通知

### /course/announcement/create

#### 功能

给课程创建通知

#### 请求方法

POST

#### 参数

```
course_id: "zxci238rxw" // 字符串，课程ID
title: "通知1" // 字符串，通知标题
content: "明天的课取消" // 字符串，通知内容
```

#### 成功响应

```
{
    "success": 1, // 数字，成功1，失败0
    "announcement_id": "aoi489x" // 字符串，生成的通知的ID
}
```

#### 可能的错误码

* 400
* 403
* 405
* 500

### /course/announcement/update

#### 功能

更新问卷

#### 请求方法

POST

#### 参数

```
course_id: "oseii" // 字符串，课程ID
survey_id: "zxci238rxw" // 字符串，要更新的问卷id
title: "问卷1" // 字符串，新问卷标题
content: "老师讲课怎么样" // 字符串，新问卷内容
```

#### 成功响应

```
{
    "success": 1 // 数字，成功1，失败0
}
```

#### 可能的错误码

* 400
* 403
* 404
* 405
* 500

### /course/announcement/get_all

#### 功能

查询课程的全部通知

#### 请求方法

GET

#### 参数

```
course_id: "zxci238rxw" // 字符串，课程ID
```

#### 成功响应

```
{
    "success": 1, // 数字，成功1，失败0。没搜索到也是1
    "announcements": [ // 数组，元素是所有通知。按create_at升序排列
        {
            "announcement_id": "ojiwefjioewf", // 字符串，通知的ID
            "teacher_info": { // 创建通知的老师信息
                "user_id": "5c479f02490df93d56d77a9b", // 字符串，用户ID
                "create_at": "2019-01-22T22:53:54.863000Z" // 字符串，用户创建时间
                "username": "abc", // 字符串，用户名
                "last_name" "张", // 字符串，姓
                "first_name": "麻子", // 字符串，名
                "email": "a@b.com", // 字符串，邮箱地址
                "birthday_year": 1938, // 数字，生日的年
                "birthday_month": 12, // 数字，生日的月
                "birthday_day": 11 // 数字，生日的日
            },
            "course_id": "zxci238rxw", // 字符串，通知所属的课程的ID
            "title": "通知1", // 字符串，通知标题
            "content: "明天的课取消", // 字符串，通知内容
            "create_at": "2018-01-15T11:30:02Z" // 字符串，UTC时间戳，创建时间
        },
        ...
    ]
}
```

#### 可能的错误码

* 400
* 403
* 404
* 405
* 500

### /course/announcement/get

#### 功能

查询课程的一个通知

#### 请求方法

GET

#### 参数

```
course_id: "zxci238rxw" // 字符串，课程ID
announcement_id: "oiwefjoi" // 字符串，通知ID
```

#### 成功响应

```
{
    "success": 1, // 数字，成功1，失败0。没搜索到也是1
    "announcement": {
        "announcement_id": "ojiwefjioewf", // 字符串，通知的ID
        "teacher_info": { // 创建通知的老师信息
            "user_id": "5c479f02490df93d56d77a9b", // 字符串，用户ID
            "create_at": "2019-01-22T22:53:54.863000Z" // 字符串，用户创建时间
            "username": "abc", // 字符串，用户名
            "last_name" "张", // 字符串，姓
            "first_name": "麻子", // 字符串，名
            "email": "a@b.com", // 字符串，邮箱地址
            "birthday_year": 1938, // 数字，生日的年
            "birthday_month": 12, // 数字，生日的月
            "birthday_day": 11 // 数字，生日的日
        },
        "course_id": "zxci238rxw", // 字符串，通知所属的课程的ID
        "title": "通知1", // 字符串，通知标题
        "content: "明天的课取消", // 字符串，通知内容
        "create_at": "2018-01-15T11:30:02Z" // 字符串，UTC时间戳，创建时间
    }
}
```

#### 可能的错误码

* 400
* 403
* 404
* 405
* 500

## <a name="coursesurvey"></a>问卷

### /course/survey/create

#### 功能

创建问卷

#### 请求方法

POST

#### 参数

```
course_id: "zxci238rxw" // 字符串，问卷所属的课程ID
title: "问卷1" // 字符串，问卷标题
content: "老师讲课怎么样" // 字符串，问卷内容
```

#### 成功响应

```
{
    "success": 1, // 数字，成功1，失败0
    "survey_id": "sjoixoijdi8s" // 字符串，问卷id
}
```

#### 可能的错误码

* 400
* 403
* 404
* 405
* 500

### /course/survey/get

#### 功能

获取问卷信息

#### 请求方法

GET

#### 参数

```
course_id: "zxci238rxw" // 字符串，问卷所属的课程ID
survey_id: "zxci238rxw" // 字符串，问卷id
```

#### 成功响应

```
{
    "success": 1, // 数字，成功1，失败0
    "survey": {
        "survey_id": "soieeiwoowie", // 字符串，问卷的ID
        "course_id": "siod2xi", // 字符串，问卷所属课程ID
        "created_by": "weoiio", // 字符串，创建这个问卷的老师ID
        "title": "问卷1", // 字符串，问卷标题
        "content": "老师讲课怎么样", // 字符串，问卷内容
        "create_at": "2018-01-15T11:30:02Z" // 字符串，UTC时间戳，创建时间
    }
}
```

#### 可能的错误码

* 400
* 403
* 404
* 405
* 500

### /course/survey/update

#### 功能

更新问卷

#### 请求方法

POST

#### 参数

```
course_id: "oseii" // 字符串，课程ID
survey_id: "zxci238rxw" // 字符串，要更新的问卷id
title: "问卷1" // 字符串，新问卷标题
content: "老师讲课怎么样" // 字符串，新问卷内容
```

#### 成功响应

```
{
    "success": 1 // 数字，成功1，失败0
}
```

#### 可能的错误码

* 400
* 403
* 404
* 405
* 500

### /course/survey/get_all

#### 功能

获取某个课程的全部问卷

#### 请求方法

GET

#### 参数

```
course_id: "zxci238rxw" // 字符串，要获取问卷的课程ID
```

#### 成功响应

```
{
    "success": 1, // 数字，成功1，失败0。没搜到也是1
    "surveys": [ // 数组，每个元素是一个该课程的问卷。按created_at升序排列
        {
            "survey_id": "soieeiwoowie", // 字符串，问卷的ID
            "course_id": "siod2xi", // 字符串，问卷所属课程ID
            "created_by": "weoiio", // 字符串，创建这个问卷的老师ID
            "title": "问卷1", // 字符串，问卷标题
            "content": "老师讲课怎么样", // 字符串，问卷内容
            "create_at": "2018-01-15T11:30:02Z" // 字符串，UTC时间戳，创建时间
        },
        ...
    ]
}
```

#### 可能的错误码

* 400
* 403
* 404
* 405
* 500

### /course/survey/response/submit

#### 功能

提交问卷的回复

#### 请求方法

POST

#### 参数

```
course_id: "zxci238rxw" // 字符串，问卷所属的课程ID
survey_id: "zxci238rxw" // 字符串，问卷ID
content: "非常差" // 字符串，问卷的回复
```

#### 成功响应

```
{
    "success": 1, // 数字，成功1，失败0
    "survey_response_id": "oisdjoi" // 提交的问卷回复的ID
}
```

#### 可能的错误码

* 400
* 403
* 404
* 405
* 409
* 500

### /course/survey/response/update

#### 功能

更新问卷的回复

#### 请求方法

POST

#### 参数

```
course_id: "zxci238rxw" // 字符串，问卷所属的课程ID
survey_id: "zxci238rxw" // 字符串，问卷ID
survey_response_id: "oiwefjo" // 字符串，问卷反馈ID
content: "非常差" // 字符串，新的问卷反馈
```

#### 成功响应

```
{
    "success": 1 // 数字，成功1，失败0
}
```

#### 可能的错误码

* 400
* 403
* 404
* 405
* 500

### /course/survey/response/get_all

#### 功能

获取某个问卷的全部反馈。只能老师用

#### 请求方法

GET

#### 参数

```
course_id: "zxci238rxw" // 字符串，问卷所属的课程ID
survey_id: "zxci238rxw" // 字符串，问卷ID
```

#### 成功响应

```
{
    "success": 1, // 数字，成功1，失败0
    "responses": [ // 数组，元素是不同学生的反馈。按create_at升序排列
        {
            "student_info": {
                "user_id": "5c479f02490df93d56d77a9b", // 字符串，用户ID
                "create_at": "2019-01-22T22:53:54.863000Z" // 字符串，用户创建时间
                "username": "abc", // 字符串，用户名
                "last_name": "张", // 字符串，姓
                "first_name": "麻子", // 字符串，名
                "email": "a@b.com", // 字符串，邮箱地址
                "birthday_year": 1938, // 数字，生日的年
                "birthday_month": 12, // 数字，生日的月
                "birthday_day": 11 // 数字，生日的日
            },
            "content": "很差", // 字符串，反馈的内容
            "create_at": "2018-01-15T11:30:02Z" // 字符串，UTC时间戳，创建时间
        },
        ...
    ]
}
```

### /course/survey/response/get

#### 功能

获取某个问卷的某个反馈或自己的反馈

#### 请求方法

GET

#### 参数

当调用的用户是老师时，`survey_response_id`必须提供。当调用的用户是学生时，`survey_response_id`必须不提供，此时返回该学生对`survey_id`代表的问卷的反馈。

```
course_id: "zxci238rxw" // 字符串，问卷所属的课程ID
survey_id: "zxci238rxw" // 字符串，问卷ID
survey_response_id: "oweifjoi" // 字符串，反馈ID
```

#### 成功响应

```
{
    "success": 1, // 数字，成功1，失败0
    "response": { // 问卷反馈
        "student_info": {
            "user_id": "5c479f02490df93d56d77a9b", // 字符串，用户ID
            "create_at": "2019-01-22T22:53:54.863000Z" // 字符串，用户创建时间
            "username": "abc", // 字符串，用户名
            "last_name": "张", // 字符串，姓
            "first_name": "麻子", // 字符串，名
            "email": "a@b.com", // 字符串，邮箱地址
            "birthday_year": 1938, // 数字，生日的年
            "birthday_month": 12, // 数字，生日的月
            "birthday_day": 11 // 数字，生日的日
        },
        "content": "很差", // 字符串，反馈的内容
        "create_at": "2018-01-15T11:30:02Z" // 字符串，UTC时间戳，创建时间
    }
}
```

#### 可能的错误码

* 400
* 403
* 404
* 405
* 500

## <a name="coursecheckin"></a>签到

### /course/checkin/create

#### 功能

新建并存储一个签到表单

#### 请求方法

POST

#### 参数


```
content: '{"5c4556325f9b0d4d1018c3e7": true, "5c455a3d5f9b0d0eec57cd8a": false}' // JSON字符串，键为学生ID，值为true或false，即是否出席
title: "英语课签到" // 字符串，签到标题
course_id: "ajisjdoiaios" // 字符串，课程ID
```

#### 成功响应

```
{
    "checkin_id": "5c4b85285f9b0d20ac9f70e5", // 字符串，签到表单的ID，后续操作会用，推荐存一下
    "success": 1
}
```

#### 可能的错误码

* 400
* 403
* 404
* 405
* 500

### /course/checkin/update

#### 功能

更新一个签到表单

#### 请求方法

POST

#### 参数


```
content: '{"5c4556325f9b0d4d1018c3e7": true, "5c455a3d5f9b0d0eec57cd8a": false}' // JSON字符串，键为学生ID，值为true或false，即是否出席
checkin_id: "5c4b85285f9b0d20ac9f70e5" // 字符串,签到表单的ID
```

#### 成功响应

```
{
    "success": 1
}
```

#### 可能的错误码

* 400
* 403
* 404
* 405
* 500

### /course/checkin/list

#### 功能

获取一门课的全部签到表单

#### 请求方法

GET

#### 参数


```
course_id: "5c4b85285f9b0d20ac9f70e5" // 字符串，课程ID
```

#### 成功响应

```
{
    "info": [ // 按照create_at升序排序
        {
            "checkin_id": "5c4cb4ee5f9b0d3440a5ba59", // 字符串，签到表单ID
            "create_at": "2019-01-26T19:28:46.246000Z", // 创建时间，字符串
            "title": "测试点名1" // 签到表单标题，字符串
        },
        {
            "checkin_id": "5c4cb4f25f9b0d3440a5ba5c", // 字符串，签到表单ID
            "create_at": "2019-01-26T19:28:50.144000Z", // 创建时间，字符串
            "title": "测试点名2" // 签到表单标题，字符串
        },
        {
            "checkin_id": "5c4cb4f55f9b0d3440a5ba5f", // 字符串，签到表单ID
            "create_at": "2019-01-26T19:28:53.559000Z", // 创建时间，字符串
            "title": "测试点名3" // 签到表单标题，字符串
        }
    ],
    "success": 1
}
```

#### 可能的错误码

* 400
* 403
* 404
* 405
* 500

### /course/checkin/get

#### 功能

获取一个签到表单

#### 请求方法

GET

#### 参数


```
checkin_id: "5c4b85285f9b0d20ac9f70e5" // 字符串，表单ID
```

#### 成功响应

```
{
    "info": {
        "create_at": "2019-01-26T19:28:53.559000Z", // 签到表单创建时间，字符串
        "students": [
            {
                "status": true,
                "student_id": "5c4556325f9b0d4d1018c3e7" // 学生ID，字符串
            },
            {
                "status": false,
                "student_id": "5c455a3d5f9b0d0eec57cd8a" // 学生ID，字符串
            }
        ],
        "title": "测试点名3" // 表单标题，字符串
    },
    "success": 1
}
```

#### 可能的错误码

* 400
* 403
* 404
* 405
* 500

## <a name="statuscode"></a>状态码

### 400

缺少参数或参数非法。会把出错的参数的名字写在msg里，但只会告诉服务器最先发现的参数，而不是所有的参数。

```
{
    "msg": "Missing or illegal argument"
}
```

### 401

登录时用户名、密码错误

```
{
    "msg": "Not authorized"
}
```

### 403

用户权限不够完成想做的操作

```
{
    "msg": "Forbidden"
}
```

### 404

可能调用错了不存在的API，或者试图获取的东西不存在

```
{
    "msg": "Wrong URL or resource not found"
}
```

### 405

请求方法错误，可能只接受POST的接口收到了GET

```
{
    "msg": "Illegal request method"
}
```

### 409

表示有重复的资源，如用户名重复、已经提交过作业等

```
{
    "msg": "Duplicated resources found"
}
```

### 413

请求太大。可能图片太大

```
{
    "msg": "Request is too large"
}
```

### 500

后端内部错误

```
{
    "msg": "Internal error"
}
```