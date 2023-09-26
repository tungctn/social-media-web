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

### User module

#### Create user

```http
POST /api/users
```

| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `email`    | `string` | **Required** |
| `password` | `string` | **Required** |
| `name`     | `string` | **Required** |

```javascript
{
    "success": true,
    "message": "User created successfully",
    "data": {
        "user": {
            ...
        },
    },
}
```

#### Get user detail

```http
Authorization: Bearer YOUR_TOKEN
GET /api/users/:id
```

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

### User Info module

#### Get user info

```http
Authorization: Bearer YOUR_TOKEN
GET /api/user_infos/
```

| Header          | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required.** Bearer Token for authentication |

```javascript
{
    "success": true,
    "message": "User info",
    "data": {
        "user_info": {
            ...
        },
    },
}
```

#### Create user info

```http
Authorization: Bearer YOUR_TOKEN
POST /api/user_infos/
PUT /api/user_infos/
```

| Header          | Type     | Description                                   |
| :-------------- | :------- | :-------------------------------------------- |
| `Authorization` | `string` | **Required.** Bearer Token for authentication |

| Parameter             | Type       | Description                                       |
| :-------------------- | :--------- | :------------------------------------------------ |
| `first_name*`         | `string`   | Họ                                                |
| `last_name*`          | `string`   | Tên                                               |
| `full_name*`          | `string`   | Họ và tên                                         |
| `email`               | `string`   | Email                                             |
| `phone_number`        | `string`   | SĐT                                               |
| `date_of_birth`       | `date`     | Ngày sinh                                         |
| `gender`              | `integer`  | 0 - Nam, 1 - Nữ, 2 - Không rõ                     |
| `avatar_url`          | `string`   | Ảnh đại diện                                      |
| `background_url`      | `string`   | Ảnh bìa                                           |
| `join_date`           | `datetime` | Ngày tham gia                                     |
| `last_login`          | `datetime` | Lần đăng nhập cuối                                |
| `address`             | `string`   | Địa chỉ                                           |
| `bio`                 | `string`   | Mô tả ngắn gọn                                    |
| `relationship_status` | `integer`  | Tình trạng: 1 - Độc thân, 2 - Kết hôn, 3 - Hẹn hò |

```javascript
{
    "success": true,
    "message": "User info",
    "data": {
        "user_info": {
            ...
        },
    },
}
```

## Architecture Design

### Database Design

![Database Design](./database/db_v1.png)

### Infrastructure Design (Single-Server Architecture: Web + API)

![Infrastructure Design](./architecture/system.png)

### CI/CD Design

![CI/CD Design](./architecture/cicd.png)
