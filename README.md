## Team members

## Tech stack

- Frontend: Next.js
- Backend: Ruby on Rails
- Database: MySQL
- Deployment: Cloud Server
- CI/CD: Github Actions
- Version Control: Git

## Runtime Environment

- Node.js 18.16.1
- NPM 9.5.1
- Ruby 3.0.2
- Rails 7.0.7.2

## Install dependencies

```bash
bash deploy-script.sh
```

## How to run

```bash
bash run-script.sh
```

## API Reference

<details>
<summary>User module</summary>

#### Login

<details>
<summary><code>POST /api/auth/login</code></summary>
<br>

#### Parameters

| Parameter  | Type     | Description                                  |
| :--------- | :------- | :------------------------------------------- |
| `email`    | `string` | **Required**. The email address of the user. |
| `password` | `string` | **Required**. The password of the user.      |

#### Response

```json
{
  "success": true,
  "message": "Login successfully",
  "data": {
    "user": {
      // User details here...
    },
    "token": "..."
  }
}
```

</details>

#### Register

<details>
<summary><code>POST /api/auth/register</code></summary>
<br>

#### Parameters

| Parameter    | Type     | Description  |
| :----------- | :------- | :----------- |
| `email`      | `string` | **Required** |
| `password`   | `string` | **Required** |
| `first_name` | `string` | **Required** |
| `last_name`  | `string` | **Required** |

```javascript
{
    "success": true,
    "message": "Login successfully",
    "data": {
        "user": {
            ...
        },
        "token": "..."
    },
}
```

</details>

#### Get user detail

<details>
<summary><code>GET /api/users/:id</code></summary>
<br>

#### Parameters

Không truyền ID thì lấy thông tin qua token
Còn truyền ID thì không cần token

| Header          | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required.** Bearer Token for authentication |

| Path Variables | Type     | Description  |
| :------------- | :------- | :----------- |
| `id`           | `string` | **Required** |

```javascript
{
    "success": true,
    "message": "User detail",
    "data": {
        "user": {
            ...
        },
    },
}
```

</details>

#### Update password

<details>
<summary><code>PUT /api/users/password</code></summary>
<br>

#### Parameters

| Header          | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required.** Bearer Token for authentication |

| Parameter      | Type     | Description              |
| :------------- | :------- | :----------------------- |
| `old_password` | `string` | **Optional** Mật khẩu cũ |
| `password`     | `string` | **Optional**             |

```javascript
{
    "success": true,
    "message": "User updated successfully",
    "data": {
        "user": {
            ...
        },
    },
}
```

</details>

#### Update user

<details>
<summary><code>PUT /api/users</code></summary>
<br>

#### Parameters

Dùng form-data để truyền avatar

| Header          | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required.** Bearer Token for authentication |

| Parameter             | Type       | Description                                       |
| :-------------------- | :--------- | :------------------------------------------------ |
| `first_name`          | `string`   | Họ                                                |
| `last_name`           | `string`   | Tên                                               |
| `full_name`           | `string`   | Họ và tên                                         |
| `phone_number`        | `string`   | SĐT                                               |
| `date_of_birth`       | `date`     | Ngày sinh                                         |
| `gender`              | `integer`  | 0 - Nam, 1 - Nữ, 2 - Không rõ                     |
| `avatar`              | `file_ảnh` | Ảnh đại diện                                      |
| `address`             | `string`   | Địa chỉ                                           |
| `bio`                 | `string`   | Mô tả ngắn gọn                                    |
| `relationship_status` | `integer`  | Tình trạng: 1 - Độc thân, 2 - Kết hôn, 3 - Hẹn hò |

```javascript
{
    "success": true,
    "message": "User updated successfully",
    "data": {
        "user": {
            ...
        },
    },
}
```

</details>

#### Delete avatar

<details>
<summary><code>DELETE /api/users/avatar</code></summary>
<br>

#### Parameters

| Header          | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required.** Bearer Token for authentication |

```javascript
{
    "success": true,
    "message": "User info",
    "data": {
        "message": "Thành công"
    },
}
```

</details>

#### Get image

<details>
<summary><code>GET /api/images/:id</code></summary>
<br>

```javascript
{
    "success": true,
    "message": "Post created successfully",
    "data": {
        "image": {
            ...
        },
    },
}
```

</details>

#### Upload image

<details>
<summary><code>POST /api/images</code></summary>
<br>

Dùng form-data để truyền ảnh

#### Parameters

| Header          | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required.** Bearer Token for authentication |

| Parameter | Type       | Description  |
| :-------- | :--------- | :----------- |
| `image`   | `file ảnh` | **Required** |

```javascript
{
    "success": true,
    "message": "Post created successfully",
    "data": {
        "image": {
            ...
        },
    },
}
```

</details>

#### Delete images

<details>
<summary><code>DELETE /api/images</code></summary>
<br>

#### Parameters

Chỉ xóa được những ảnh mà user đang đăng nhập tạo

| Header          | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required.** Bearer Token for authentication |

| Parameter | Type    | Description  |
| :-------- | :------ | :----------- |
| `ids`     | `Array` | **Required** |

```javascript
{
    "success": true,
    "message": "Post created successfully",
    "data": {
        "image": {
            ...
        },
    },
}
```

</details>

#### Create post

<details>
<summary><code>POST /api/posts</code></summary>
<br>

#### Parameters

| Header          | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required.** Bearer Token for authentication |

| Parameter    | Type      | Description                                         |
| :----------- | :-------- | :-------------------------------------------------- |
| `content`    | `string`  | **Required**                                        |
| `user_id`    | `int`     | **Required** Đăng bài lên trang cá nhân của ông này |
| `image_ids`  | `Array`   | **Optional**                                        |
| `share_id`   | `int`     | id của bài viết muốn chia sẻ                        |
| `label`      | `integer` | **Optional**                                        |
| `status`     | `integer` | **Optional**                                        |
| `error_list` | `json`    | **Optional**, '[1,2,3]'                             |

```javascript
{
    "success": true,
    "message": "Post created successfully",
    "data": {
        "post": {
            ...
        },
    },
}
```

</details>

#### Get post detail

<details>
<summary><code>GET /api/posts/:id</code></summary>
<br>

#### Parameters

| Path Variables | Type     | Description  |
| :------------- | :------- | :----------- |
| `id`           | `string` | **Required** |

```javascript
{
    "success": true,
    "message": "Post detail",
    "data": {
        "post": {
            ...
        },
    },
}
```

</details>

#### Get post

<details>
<summary><code>GET /api/posts</code></summary>
<br>

#### Parameters

| Path Variables | Type  | Description  |
| :------------- | :---- | :----------- |
| `page_index`   | `int` | **Optional** |
| `page_size`    | `int` | **Optional** |

</details>

#### Get user post

<details>
<summary><code>GET /api/posts/user/:id</code></summary>
<br>

#### Parameters

| Path Variables | Type  | Description  |
| :------------- | :---- | :----------- |
| `page_index`   | `int` | **Optional** |
| `page_size`    | `int` | **Optional** |

</details>

#### My post

<details>
<summary><code>GET /api/posts/user</code></summary>
<br>

#### Parameters

| Path Variables | Type  | Description  |
| :------------- | :---- | :----------- |
| `page_index`   | `int` | **Optional** |
| `page_size`    | `int` | **Optional** |

</details>

#### My save post

<details>
<summary><code>GET /api/posts/save</code></summary>
<br>

#### Parameters

| Header          | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required.** Bearer Token for authentication |

| Path Variables | Type  | Description  |
| :------------- | :---- | :----------- |
| `page_index`   | `int` | **Optional** |
| `page_size`    | `int` | **Optional** |

</details>

#### Check save post

<details>
<summary><code>GET /api/posts/save/:id</code></summary>
<br>

#### Parameters

| Header          | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required.** Bearer Token for authentication |

</details>

#### Save post

<details>
<summary><code>POST /api/posts/save/:id</code></summary>
<br>

#### Parameters

| Header          | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required.** Bearer Token for authentication |

</details>

#### Unsave post

<details>
<summary><code>POST /api/posts/unsave/:id</code></summary>
<br>

#### Parameters

| Header          | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required.** Bearer Token for authentication |

</details>

#### Update post

<details>
<summary><code>PUT /api/posts/:id</code></summary>
<br>

#### Parameters

| Path Variables | Type     | Description  |
| :------------- | :------- | :----------- |
| `id`           | `string` | **Required** |

| Header          | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required.** Bearer Token for authentication |

| Parameter   | Type     | Description                                   |
| :---------- | :------- | :-------------------------------------------- |
| `content`   | `string` | **Optional**                                  |
| `image_ids` | `Array`  | **Optional** có ảnh thì nhớ truyền hết id lên |

</details>

#### Delete post

<details>
<summary><code>DELETE /api/posts/:id</code></summary>
<br>

#### Parameters

| Path Variables | Type     | Description  |
| :------------- | :------- | :----------- |
| `id`           | `string` | **Required** |

| Header          | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required.** Bearer Token for authentication |

</details>

#### Report post

<details>
<summary><code>POST /api/posts/report/:id</code></summary>
<br>

#### Parameters

| Path Variables | Type     | Description  |
| :------------- | :------- | :----------- |
| `id`           | `string` | **Required** |

| Header          | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required.** Bearer Token for authentication |

| Parameter   | Type     | Description                                   |
| :---------- | :------- | :-------------------------------------------- |
| `type_report`   | `enum TYPE_REPORT` | **Optional**    loại báo cáo của người dùng (ảnh, bài viết) |

</details>

#### Get comment

<details>
<summary><code>GET /api/comments/:post_id</code></summary>
<br>

#### Parameters

| Path Variables | Type  | Description  |
| :------------- | :---- | :----------- |
| `page_index`   | `int` | **Optional** |
| `page_size`    | `int` | **Optional** |

</details>

#### Create comment

<details>
<summary><code>POST /api/comments</code></summary>
<br>

#### Parameters

| Header          | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required.** Bearer Token for authentication |

| Parameter         | Type      | Description             |
| :---------------- | :-------- | :---------------------- |
| `content`         | `string`  | **Required**            |
| `post_id`         | `int`     | **Required**            |
| `image_ids`       | `Array`   | **Optional**            |
| `reply_comment`   | `Array`   | **Optional**            |
| `user_reply_name` | `String`  | **Optional**            |
| `user_reply_id`   | `integer` | **Optional**            |
| `label`           | `integer` | **Optional**            |
| `status`          | `integer` | **Optional**            |
| `error_list`      | `json`    | **Optional**, '[1,2,3]' |

```javascript
{
    "success": true,
    "message": "comment created successfully",
    "data": {
        "comment": {
            ...
        },
    },
}
```

</details>

#### Update comment

<details>
<summary><code>PUT /api/comments/:id</code></summary>
<br>

#### Parameters

| Path Variables | Type     | Description  |
| :------------- | :------- | :----------- |
| `id`           | `string` | **Required** |

| Header          | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required.** Bearer Token for authentication |

| Parameter         | Type      | Description                                   |
| :---------------- | :-------- | :-------------------------------------------- |
| `content`         | `string`  | **Optional**                                  |
| `image_ids`       | `Array`   | **Optional** có ảnh thì nhớ truyền hết id lên |
| `user_reply_name` | `String`  | **Optional**                                  |
| `user_reply_id`   | `integer` | **Optional**                                  |

</details>

#### Delete comment

<details>
<summary><code>DELETE /api/comments/:id</code></summary>
<br>

#### Parameters

| Path Variables | Type     | Description  |
| :------------- | :------- | :----------- |
| `id`           | `string` | **Required** |

| Header          | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required.** Bearer Token for authentication |

</details>

#### Report comment

<details>
<summary><code>POST /api/comments/report/:id</code></summary>
<br>

#### Parameters

| Path Variables | Type     | Description  |
| :------------- | :------- | :----------- |
| `id`           | `string` | **Required** |

| Header          | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required.** Bearer Token for authentication |

| Parameter   | Type     | Description                                   |
| :---------- | :------- | :-------------------------------------------- |
| `type_report`   | `enum TYPE_REPORT` | **Optional**    loại báo cáo của người dùng (ảnh, bài viết) |

</details>

#### Create react post

<details>
<summary><code>POST /api/posts/reacts</code></summary>
<br>

#### Parameters

| Header          | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required.** Bearer Token for authentication |

| Parameter    | Type                | Description  |
| :----------- | :------------------ | :----------- |
| `type_react` | `enum - type_react` | **Required** |
| `post_id`    | `int`               | **Required** |

```javascript
{
    "success": true,
    "message": "comment created successfully",
    "data": {
        "message": ""
    },
}
```

</details>

#### Delete react post

<details>
<summary><code>DELETE /api/posts/unreact/:post_id</code></summary>
<br>

#### Parameters

| Path Variables | Type  | Description  |
| :------------- | :---- | :----------- |
| `post_id`      | `int` | **Required** |

| Header          | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required.** Bearer Token for authentication |

</details>

#### Create react comment

<details>
<summary><code>POST /api/comments/reacts</code></summary>
<br>

#### Parameters

| Header          | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required.** Bearer Token for authentication |

| Parameter    | Type                | Description  |
| :----------- | :------------------ | :----------- |
| `type_react` | `enum - type_react` | **Required** |
| `comment_id` | `int`               | **Required** |

```javascript
{
    "success": true,
    "message": "comment created successfully",
    "data": {
        "message": ""
    },
}
```

</details>

#### Delete react comment

<details>
<summary><code>DELETE /api/comments/unreact/:comment_id</code></summary>
<br>

#### Parameters

| Path Variables | Type  | Description  |
| :------------- | :---- | :----------- |
| `comment_id`   | `int` | **Required** |

| Header          | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required.** Bearer Token for authentication |

</details>

#### Lấy tất cả lời mời kết bạn

<details>
<summary><code>GET /api/friends/request</code></summary>
<br>

#### Parameters

| Header          | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required.** Bearer Token for authentication |

| Path Variables | Type  | Description  |
| :------------- | :---- | :----------- |
| `page_index`   | `int` | **Optional** |
| `page_size`    | `int` | **Optional** |

```javascript
{
    "success": true,
    "message": "ok",
    "data": {
        "friends": ""
    },
}
```

</details>

#### Lấy tất cả danh sách bạn đã chặn

<details>
<summary><code>GET /api/friends/block</code></summary>
<br>

#### Parameters

| Header          | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required.** Bearer Token for authentication |

| Path Variables | Type  | Description  |
| :------------- | :---- | :----------- |
| `page_index`   | `int` | **Optional** |
| `page_size`    | `int` | **Optional** |

```javascript
{
    "success": true,
    "message": "ok",
    "data": {
        "friends": ""
    },
}
```

</details>

#### Lấy danh sách bạn bè của 1 người dùng

<details>
<summary><code>GET /api/friends/:id</code></summary>
<br>

#### Parameters

| Path Variables | Type  | Description  |
| :------------- | :---- | :----------- |
| `page_index`   | `int` | **Optional** |
| `page_size`    | `int` | **Optional** |

```javascript
{
    "success": true,
    "message": "ok",
    "data": {
        "friends": ""
    },
}
```

</details>

#### Lấy danh sách bạn bè của bản thân

<details>
<summary><code>GET /api/friends</code></summary>
<br>

#### Parameters

| Header          | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required.** Bearer Token for authentication |

| Path Variables | Type  | Description  |
| :------------- | :---- | :----------- |
| `page_index`   | `int` | **Optional** |
| `page_size`    | `int` | **Optional** |

```javascript
{
    "success": true,
    "message": "ok",
    "data": {
        "friends": ""
    },
}
```

</details>

#### Tạo lời mời kết bạn

<details>
<summary><code>POST /api/friends</code></summary>
<br>

#### Parameters

| Header          | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required.** Bearer Token for authentication |

| Path Variables | Type  | Description                                |
| :------------- | :---- | :----------------------------------------- |
| `receiver_id`  | `int` | **Required** id của người muốn gửi lời mời |

```javascript
{
    "success": true,
    "message": "ok",
    "data": {
        "message": "Thành công"
    },
}
```

</details>

#### Cập nhật trạng thái kết bạn

<details>
<summary><code>PUT /api/friends</code></summary>
<br>
Chấp nhận lời mời, block, chuyển loại bạn bè (hẹn hò ?)

#### Parameters

| Header          | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required.** Bearer Token for authentication |

| Path Variables  | Type                 | Description                                |
| :-------------- | :------------------- | :----------------------------------------- |
| `receiver_id`   | `int`                | **Required** id của người muốn gửi lời mời |
| `friend_status` | `enum friend_status` | **Optional** trạng thái bạn bè             |
| `friend_type`   | `enum friend_type`   | **Optional** loại bạn bè                   |

```javascript
{
    "success": true,
    "message": "ok",
    "data": {
        "message": "Thành công"
    },
}
```

</details>

#### Xóa lời mời kết bạn, hủy kết bạn

<details>
<summary><code>DELETE /api/friends</code></summary>
<br>

#### Parameters

| Header          | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required.** Bearer Token for authentication |

| Path Variables | Type  | Description                                |
| :------------- | :---- | :----------------------------------------- |
| `receiver_id`  | `int` | **Required** id của người muốn gửi lời mời |

```javascript
{
    "success": true,
    "message": "ok",
    "data": {
        "message": "Thành công"
    },
}
```

</details>

</details>

<details>
<summary>Admin module</summary>

#### Lấy tất cả bài viết, comment vi phạm

<details>
<summary><code>GET /api/admins/reports/posts</code></summary>
<summary><code>GET /api/admins/reports/comments</code></summary>
<br>

#### Parameters

| Header          | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required.** Bearer Token for authentication |

| Path Variables | Type  | Description  |
| :------------- | :---- | :----------- |
| `page_index`   | `int` | **Optional** |
| `page_size`    | `int` | **Optional** |

</details>

#### Chuyển trạng thái vi phạm

<details>
<summary><code>POST /api/admins/reports/posts/:id</code></summary>
<summary><code>POST /api/admins/reports/comments/:id</code></summary>
<br>

#### Parameters

| Header          | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required.** Bearer Token for authentication |

| Path Variables | Type   | Description             |
| :------------- | :----- | :---------------------- |
| `status`       | `int`  | **Optional**            |
| `error_list`   | `json` | **Optional**, '[1,2,3]' |

</details>
</details>
<details>
<summary>Dashboard module</summary>

#### Thống kê lịch sử đăng nhập

<details>
<summary><code>POST /api/dashboard/login-history</code></summary>
<br>

#### Parameters

| Header          | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required.** Bearer Token for authentication, role = admin |

| Path Variables | Type   | Description             |
| :------------- | :----- | :---------------------- |
| `time_statistics`       | `enum TIME_STATISTICS`  | **Optional**            |

</details>

<details>
<summary><code>POST /api/dashboard/number</code></summary>
<br>

#### Parameters

| Header          | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required.** Bearer Token for authentication, role = admin |

</details>

<details>
<summary><code>POST /api/dashboard/post-label</code></summary>
<br>

#### Parameters

| Header          | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required.** Bearer Token for authentication, role = admin |

</details>

</details>

## Architecture Design

### Database Design

![Database Design](./database/db_v1.png)

### Infrastructure Design (Single-Server Architecture: Web + API)

![Infrastructure Design](./architecture/system.png)

### CI/CD Design

![CI/CD Design](./architecture/cicd.png)
