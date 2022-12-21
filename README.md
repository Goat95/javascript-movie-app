# Movie App

OMDb API를 활용해 Javascript와 Typescript 버전으로 영화 검색 애플리케이션을 만들었습니다.

[DEMO](https://javascript-movie-hk09xwmf2-goat95.vercel.app/#/)

![Screenshot](/screenshots/screenshot_demo.JPG)

### 프로젝트 시작하기

```bash
$ npm i
$ npm run vercel
```

### Reset.css

브라우저의 기본 스타일을 초기화합니다.

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/reset-css@5.0.1/reset.min.css"
/>
```

### Google Fonts

[Oswald](https://fonts.google.com/specimen/Oswald?query=oswa), [Roboto](https://fonts.google.com/specimen/Roboto?query=robo) 폰트를 사용합니다.

```html
<link
  href="https://fonts.googleapis.com/css2?family=Oswald:wght@500&family=Roboto:wght@400;700&display=swap"
  rel="stylesheet"
/>
```

## Vercel Hosting

`node-fetch` 패키지는 꼭 2버전으로 설치해야 합니다!

```bash
$ npm i -D vercel dotenv
$ npm i node-fetch@2
```

**/vercel.json**

```json
{
  "devCommand": "npm run dev",
  "buildCommand": "npm run build"
}
```

**/package.json**

```json
{
  "scripts": {
    "vercel": "vercel dev"
  }
}
```

### Vercel 개발 서버 실행

Vercel 구성 이후에는 `npm run dev`가 아닌 `npm run vercel`로 개발 서버를 실행해야 합니다!

```bash
$ npm run vercel
```

## Vercel Serverless Functions

프로젝트 루트 경로에 `/api` 폴더를 생성하고,  
API Key 를 노출하지 않도록 서버리스 함수를 작성합니다.

**/api/movie.ts**

```ts
import { VercelRequest, VercelResponse } from "@vercel/node";
import fetch from "node-fetch";
const { APIKEY } = process.env;
export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const { title, page, id } = JSON.parse(request.body as string);
  const url = id
    ? `https://www.omdbapi.com/?apikey=${APIKEY}&i=${id}&plot=full`
    : `https://www.omdbapi.com/?apikey=${APIKEY}&s=${title}&page=${page}`;
  const res = await fetch(url);
  const json = await res.json();
  response.status(200).json(json);
}
```

### 환경변수

로컬의 개발용 서버에서 사용할 환경변수를 `.env` 파일에 지정합니다.

**/.env**

```dotenv
APIKEY=<MY_OMDb_API_KEY>
```

제품 서버(Vercel 서비스)에서 사용할 환경변수를 지정합니다.  
Vercel 서비스의 프로젝트 **'Settings / Environment Variables'** 옵션에서 다음과 같이 환경변수를 지정합니다.

![Screenshot](/screenshots/screenshot_vercel_environment.JPG)

## TypeScript

타입스크립트 코어 패키지와 `node-fetch`의 타이핑 패키지를 설치합니다.

```bash
$ npm i -D typescript @types/node-fetch@2
```

**/tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2015",
    "module": "ESNext",
    "lib": ["ESNext", "DOM"],
    "strict": true,
    "moduleResolution": "node",
    "esModuleInterop": true
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "api/**/*.ts"]
}
```
