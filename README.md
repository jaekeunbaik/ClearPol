# ClearPol - 정치인 정보 플랫폼

정치인 정보를 중립적이고 투명하게 제공하며, 시민들이 의견을 나누고 토론할 수 있는 커뮤니티 플랫폼입니다.

## 🚀 기능

### ✅ 구현 완료

- **정치인 목록 조회** - 카드형 리스트, 검색/필터링 기능
- **정치인 상세 정보** - 프로필, 경력, 공약 정보
- **댓글 시스템** - 정치인별 댓글 작성/조회
- **관리자 기능** - 정치인 CRUD, 관리 대시보드
- **반응형 UI** - 모바일/데스크톱 대응
- **로그인/회원가입 UI** (백엔드 연동 필요)

### 📋 남은 작업

- Supabase 데이터베이스 스키마 설정
- 사용자 인증 시스템 (Supabase Auth)
- 실제 사용자 데이터 연동

## 📦 기술 스택

- **프론트엔드**: Vue 3 + TypeScript + Tailwind CSS
- **백엔드**: Node.js + Express
- **데이터베이스**: Supabase (PostgreSQL)
- **라우팅**: Vue Router

## 🛠️ 설치 및 실행

### 1. 프로젝트 클론

```bash
git clone <repository-url>
cd ClearPol
```

### 2. 백엔드 설정

```bash
cd backend
npm install
```

**환경변수 설정** (.env 파일 생성):

```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
PORT=3000
```

### 3. 프론트엔드 설정

```bash
cd frontend
npm install
```

### 4. Supabase 데이터베이스 설정

Supabase 콘솔에서 다음 테이블을 생성하세요:

#### `politicians` 테이블

```sql
CREATE TABLE politicians (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  party TEXT NOT NULL,
  region TEXT NOT NULL,
  career TEXT,
  promises TEXT,
  photo_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### `users` 테이블

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### `comments` 테이블

```sql
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  politician_id INTEGER REFERENCES politicians(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### 샘플 데이터 삽입

```sql
-- 샘플 정치인 데이터
INSERT INTO politicians (name, party, region, career, promises) VALUES
('김철수', '더불어민주당', '서울', '2020-현재 국회의원\n2018-2020 서울시의원', '청년 일자리 창출\n주거비 부담 완화'),
('이영희', '국민의힘', '부산', '2016-현재 국회의원\n2010-2016 부산시의원', '지역경제 활성화\n교통 인프라 확충'),
('박민수', '정의당', '대구', '2020-현재 국회의원\n2015-2020 시민단체 활동', '교육격차 해소\n환경보호 정책 강화');

-- 샘플 사용자 데이터
INSERT INTO users (username, email, role) VALUES
('admin', 'admin@clearpol.com', 'admin'),
('user1', 'user1@example.com', 'user'),
('user2', 'user2@example.com', 'user');
```

### 5. 실행

**백엔드 서버 실행:**

```bash
cd backend
npm run dev
```

**프론트엔드 개발 서버 실행:**

```bash
cd frontend
npm run dev
```

## 📱 페이지 구조

- `/` - 홈 (정치인 목록 + 검색/필터)
- `/politician/:id` - 정치인 상세 + 댓글
- `/add-politician` - 정치인 등록 (관리자)
- `/admin` - 관리자 대시보드
- `/login` - 로그인
- `/signup` - 회원가입

## 🔧 API 엔드포인트

### 정치인 API

- `GET /politicians` - 전체 정치인 목록
- `GET /politicians/:id` - 특정 정치인 상세
- `POST /politicians` - 정치인 등록 (관리자)
- `PUT /politicians/:id` - 정치인 수정 (관리자)
- `DELETE /politicians/:id` - 정치인 삭제 (관리자)

### 댓글 API

- `GET /politicians/:id/comments` - 댓글 목록
- `POST /politicians/:id/comments` - 댓글 작성
- `DELETE /comments/:id` - 댓글 삭제

## 🎨 주요 특징

- **중립성**: 정치적 편향 없는 정보 제공
- **투명성**: 공개적이고 검증 가능한 데이터
- **접근성**: 직관적이고 사용하기 쉬운 인터페이스
- **반응형 디자인**: 모든 기기에서 최적화된 경험

## 🔮 향후 계획

- 사용자 인증 시스템 완성
- 실시간 알림 기능
- 정치인 평가/투표 기능
- 소셜 로그인 연동
- 정치인 활동 타임라인
- 정책 비교 도구

---

**ClearPol**로 더 투명하고 접근 가능한 정치 정보를 만나보세요! 🏛️✨
