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

## How to setup

### web

```bash
$ cd web
$ npm install
```

### api

```bash
$ cd api
$ bundle install
```

## How to run

### web

```bash
$ cd web

# development
$ npm run dev

# production
$ npm run build
$ npm run start

```

### api

```bash
$ cd api

# development
$ rails server

# production
$ rails server
```

## Set up cloud server Next.js

### Install pm2

```bash
$ npm install pm2 -g
```

### Set up pm2 process

```bash
cd /path/to/your/project (ex: cd /home/runner/actions-runner/_work/social-media-web/social-media-web/web)
pm2 start ecosystem.config.js
```

### Check pm2 status

```bash
pm2 status
```

## Set up cloud server ruby on rails

### Install systemd

```bash
$ sudo apt install -y systemd
```

### Set up Puma

```bash
$ sudo nano /etc/systemd/system/puma.service
```

Copy and paste the following configuration:

```bash
[Unit]
Description=Puma HTTP Server
After=network.target

[Service]
Type=simple
User=runner
WorkingDirectory=/home/runner/actions-runner/_work/social-media-web/social-media-web/api
ExecStart=/home/runner/.rbenv/shims/rails server -b 0.0.0.0 -p 4000
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target[Unit]
```

### Start Puma

```bash
$ sudo systemctl start puma.service
```

### Check Puma status

```bash
$ sudo systemctl status puma.service
```

## Todo list

### Auth module

- [x] [Login](#login)

### User module

- [x] [Create user](#create-user)
- [x] [Get user detail](#get-user-detail)
- [x] [Update user](#update-user)
- [x] [Delete user](#delete-user)

### Post module

- [x] [Create post](#create-post)
- [x] [Get post detail](#get-post-detail)
- [x] [Update post](#update-post)
- [x] [Delete post](#delete-post)

### Image module

- [x] [Upload image](#upload-image)
- [x] [Get image](#get-image)

## API Reference

### Auth module

#### Login

```http
POST /api/auth/login
```

| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `email`    | `string` | **Required** |
| `password` | `string` | **Required** |

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

#### Register

```http
POST /api/auth/register
```

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

### User module

#### Get user detail

```http
Authorization: Bearer YOUR_TOKEN
GET /api/users/:id
```

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

#### Update password

```http
Authorization: Bearer YOUR_TOKEN
PUT /api/users/password
```

| Header          | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required.** Bearer Token for authentication |

| Parameter             | Type       | Description                                       |
| :-------------------- | :--------- | :------------------------------------------------ |
| `old_password`            | `string`   | **Optional**  Mật khẩu cũ                                    |
| `password`            | `string`   | **Optional**                                      |

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

#### Update user

```http
Authorization: Bearer YOUR_TOKEN
PUT /api/users
```

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

#### Delete avatar

```http
Authorization: Bearer YOUR_TOKEN
DELETE /api/users/avatar
```

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

### Image module

Luồng riêng để tải ảnh

#### Get image

```http
GET /api/images/:id
```

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

#### Upload image

```http
Authorization: Bearer YOUR_TOKEN
POST /api/images
```

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

#### Delete images

```http
Authorization: Bearer YOUR_TOKEN
DELETE /api/images
```

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

### Post module

#### Create post

```http
Authorization: Bearer YOUR_TOKEN
POST /api/posts
```

| Header          | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required.** Bearer Token for authentication |

| Parameter   | Type     | Description                                         |
| :---------- | :------- | :-------------------------------------------------- |
| `content`   | `string` | **Required**                                        |
| `user_id`   | `int`    | **Required** Đăng bài lên trang cá nhân của ông này |
| `image_ids` | `Array`  | **Optional**                                        |

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

#### Get post detail

```http
GET /api/posts/:id - có đi kèm với comment
```

| Path Variables | Type     | Description  |
| :------------- | :------- | :----------- |
| `id`           | `string` | **Required** |

#### Get post detail

```http
GET /api/posts - Lấy tất cả bài viết
```

| Path Variables | Type     | Description  |
| :------------- | :------- | :----------- |
| `page_index`           | `int` | **Required** |
| `page_size`           | `int` | **Required** |

#### Update post

```http
Authorization: Bearer YOUR_TOKEN
PUT /api/posts/:id
```

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

#### Delete post

```http
Authorization: Bearer YOUR_TOKEN
DELETE /api/posts/:id
```

| Path Variables | Type     | Description  |
| :------------- | :------- | :----------- |
| `id`           | `string` | **Required** |

| Header          | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required.** Bearer Token for authentication |

### Comment module

#### Create comment

```http
Authorization: Bearer YOUR_TOKEN
POST /api/comments
```

| Header          | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required.** Bearer Token for authentication |

| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `content`  | `string` | **Required** |
| `post_id`    | `int` | **Required**|
| `image_ids`    | `Array` | **Optional** |

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

#### Update comment

```http
Authorization: Bearer YOUR_TOKEN
PUT /api/comments/:id
```

| Path Variables | Type     | Description  |
| :------------- | :------- | :----------- |
| `id`           | `string` | **Required** |

| Header          | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required.** Bearer Token for authentication |

| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `content`  | `string` | **Optional** |
| `image_ids`    | `Array` | **Optional** có ảnh thì nhớ truyền hết id lên|

#### Delete comment

```http
Authorization: Bearer YOUR_TOKEN
DELETE /api/comments/:id
```

| Path Variables | Type     | Description  |
| :------------- | :------- | :----------- |
| `id`           | `string` | **Required** |

| Header          | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required.** Bearer Token for authentication |

### React module (biểu cảm)

#### Create react post

```http
Authorization: Bearer YOUR_TOKEN
POST /api/posts/reacts
```

| Header          | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required.** Bearer Token for authentication |

| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `type_react`  | `enum - type_react` | **Required** |
| `post_id`    | `int` | **Required**|

```javascript
{
    "success": true,
    "message": "comment created successfully",
    "data": {
        "message": ""
    },
}
```

#### Delete react post

```http
Authorization: Bearer YOUR_TOKEN
DELETE /api/posts/unreact/:post_id
```

| Path Variables | Type     | Description  |
| :------------- | :------- | :----------- |
| `post_id`           | `int` | **Required** |

| Header          | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required.** Bearer Token for authentication |



## Architecture Design

### Database Design

![Database Design](./database/db_v1.png)

### Infrastructure Design (Single-Server Architecture: Web + API)

![Infrastructure Design](./architecture/system.png)

### CI/CD Design

![CI/CD Design](./architecture/cicd.png)
