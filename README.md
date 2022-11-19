# Sopkathon-Server

## LP (Listening Present)

서비스명: LP(Listening Present)

소개: 당신의 기분, 나아가 당신까지 변화시킬 음악과 메세지를 선물해줍니다.

## 팀원

|[dragontaek-lee](https://github.com/dragontaek-lee)|[hyesuuou](https://github.com/hyesuuou)|
|:--:|:--:|
|<img width="200" alt="image" src="https://user-images.githubusercontent.com/68391767/202856172-6191dbbb-fd57-47b0-b1ae-19ec5812ab39.png">|<img width="200" alt="image" src="https://user-images.githubusercontent.com/68391767/202856197-87e31f39-6ede-4eae-9c93-13ddbd0a2b4d.png">|

## 각자 개발 담당 부분


| API | 설명 | 담당 | 
| --- | --- | --- |
|[POST] /user|유저생성|`혜수`|
|[POST] /message|메시지 생성|`용택`|
|[GET] /message/:categoryId?isopened={0,1}|자신의 메시지 조회|`용택`|
|[GET] /message/:messageId|메시지 상세조회|`혜수`|
|[GET] /category|카테고리별 메시지 개수 조회|`혜수`|

## 코드 컨벤션

[Link](https://spark-chive-e55.notion.site/b2e2f8b48d4e46ddb83c14d40f70f6cd)

## 브랜치 전략

|브랜치 이름|설명|
|:--:|:--|
|`develop`|기능 개발을 위한 브랜치들을 병합하기 위해 사용.|
|`yongtaek`|용택이의 기능개발|
|`hyesu`|혜수의 기능 개발|

## 프로젝트 폴더링

``` plain text
├── README.md
├── node_module
├── nodemon.json
├── package.json
├── prisma
│   └── schema.prisma
├── src
│   ├── controller
│   ├── router
│   └── service
├── tsconfig.json
└── yarn.lock
```

## ERD
![KakaoTalk_Photo_2022-11-20-00-34-00](https://user-images.githubusercontent.com/68391767/202858644-b39eda22-27ea-47d9-9d90-68665a1debde.png)

## schema.prisma

```
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id       Int       @id @default(autoincrement())
  nickname String    @db.VarChar(100)
  Message  Message[]
}

model Category {
  id      Int       @id @default(autoincrement())
  name    String    @db.VarChar(100)
  Message Message[]
}

model Message {
  id          Int      @id @default(autoincrement())
  title       String   @db.VarChar(100)
  contents    String   @db.VarChar(500)
  category_id Int
  receiver_id Int
  created_at  DateTime @db.Timestamp(6)
  artist      String   @db.VarChar(100)
  is_opened   Boolean
  Category    Category @relation(fields: [category_id], references: [id], onDelete: NoAction, onUpdate: NoAction, map: "message_category_id_fk")
  User        User     @relation(fields: [receiver_id], references: [id], onDelete: NoAction, onUpdate: NoAction, map: "message_user_id_fk")
}

```

## package.json

```json
{
  "name": "Sopkathon-Server",
  "version": "1.0.0",
  "main": "index.js",
  "repository": "https://github.com/SOPT-31ST-SOPKATHON-TEAM10/Sopkathon-Server.git",
  "author": "hyesuuou <68391767+hyesuuou@users.noreply.github.com>",
  "license": "MIT",
  "scripts": {
    "dev": "nodemon",
    "build": "tsc && node dist",
    "db:pull": "npx prisma db pull",
    "db:push": "npx prisma db push",
    "generate": "npx prisma generate"
  },
  "dependencies": {
    "@prisma/client": "^4.6.1",
    "express": "^4.18.2",
    "prisma": "^4.6.1"
  },
  "devDependencies": {
    "@types/express": "^4.17.14",
    "@types/node": "^18.11.9",
    "nodemon": "^2.0.20"
  }
}
```

## server architecture

![KakaoTalk_Photo_2022-11-20-00-11-21](https://user-images.githubusercontent.com/68391767/202857637-0c9d3fc3-b861-44be-83cd-2f19bacfe0b6.png)


