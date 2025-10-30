# Docker Deployment Guide

KHVD 2025 Exhibition Docker 배포 가이드입니다.

## 변경 사항 요약

### 1. SvelteKit Adapter 변경

- `@sveltejs/adapter-auto` → `@sveltejs/adapter-node`
- Docker 환경에서 Node.js 서버로 실행하기 위한 변경

### 2. 환경변수 처리 방식 변경

- **빌드 타임 환경변수** (`$env/static/private`) → **런타임 환경변수** (`$env/dynamic/private`)
- 서버마다 다른 환경변수로 동일한 Docker 이미지를 사용 가능

## Docker 이미지 빌드

```bash
# 프로젝트 루트에서 실행
docker build -t khvd-2025 .
```

빌드가 완료되면 `khvd-2025` 이미지가 생성됩니다.

## Docker 컨테이너 실행

### 방법 1: 환경변수 파일 사용 (권장)

`.env` 파일을 준비하고 Docker run 시 전달:

```bash
# .env 파일 예시
DB_HOST=your-database-host
DB_PORT=3306
DB_USER=khvd_user
DB_PASSWORD=your-secure-password
DB_NAME=khvd_2025
DB_CONNECTION_LIMIT=10
```

```bash
# 환경변수 파일로 실행
docker run -d \
  --name khvd-2025 \
  -p 3000:3000 \
  --env-file .env \
  khvd-2025
```

### 방법 2: 개별 환경변수 지정

```bash
docker run -d \
  --name khvd-2025 \
  -p 3000:3000 \
  -e DB_HOST=your-database-host \
  -e DB_PORT=3306 \
  -e DB_USER=khvd_user \
  -e DB_PASSWORD=your-secure-password \
  -e DB_NAME=khvd_2025 \
  -e DB_CONNECTION_LIMIT=10 \
  khvd-2025
```

### 방법 3: Docker Compose 사용

`docker-compose.yml` 파일 생성:

```yaml
version: '3.8'

services:
  web:
    image: khvd-2025
    ports:
      - '3000:3000'
    env_file:
      - .env
    restart: unless-stopped
    healthcheck:
      test:
        [
          'CMD',
          'node',
          '-e',
          "require('http').get('http://localhost:3000/', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"
        ]
      interval: 30s
      timeout: 3s
      start_period: 5s
      retries: 3
```

실행:

```bash
docker-compose up -d
```

## 컨테이너 관리

### 로그 확인

```bash
docker logs khvd-2025
docker logs -f khvd-2025  # 실시간 로그
```

### 컨테이너 중지/시작

```bash
docker stop khvd-2025
docker start khvd-2025
docker restart khvd-2025
```

### 컨테이너 삭제

```bash
docker stop khvd-2025
docker rm khvd-2025
```

### 이미지 삭제

```bash
docker rmi khvd-2025
```

## 서버별 배포 시나리오

### 개발 서버

```bash
# 개발 환경 .env 파일 사용
docker run -d \
  --name khvd-2025-dev \
  -p 3000:3000 \
  --env-file .env.development \
  khvd-2025
```

### 스테이징 서버

```bash
# 스테이징 환경 .env 파일 사용
docker run -d \
  --name khvd-2025-staging \
  -p 3000:3000 \
  --env-file .env.staging \
  khvd-2025
```

### 프로덕션 서버

```bash
# 프로덕션 환경 .env 파일 사용
docker run -d \
  --name khvd-2025-prod \
  -p 3000:3000 \
  --env-file .env.production \
  --restart always \
  khvd-2025
```

## 주요 특징

### 1. 멀티 스테이지 빌드

- **Builder 스테이지**: 애플리케이션 빌드
- **Production 스테이지**: 런타임 실행 (최소 크기)

### 2. Health Check

- 30초마다 헬스 체크 실행
- 5초 시작 대기 시간
- 3회 재시도 후 unhealthy 상태

### 3. 포트

- 기본 포트: `3000`
- 변경 시 Dockerfile의 `EXPOSE` 수정 필요

## 환경변수 필수 항목

| 변수명                | 설명              | 기본값    | 필수 여부 |
| --------------------- | ----------------- | --------- | --------- |
| `DB_HOST`             | MySQL 호스트      | localhost | 선택      |
| `DB_PORT`             | MySQL 포트        | 3306      | 선택      |
| `DB_USER`             | MySQL 사용자      | khvd_user | 선택      |
| `DB_PASSWORD`         | MySQL 비밀번호    | -         | 선택      |
| `DB_NAME`             | 데이터베이스 이름 | khvd_2025 | 선택      |
| `DB_CONNECTION_LIMIT` | 커넥션 풀 크기    | 10        | 선택      |

모든 환경변수는 기본값이 있어 데이터베이스를 사용하지 않을 경우 생략 가능합니다.

## 트러블슈팅

### 빌드 실패 시

```bash
# Docker 캐시 없이 다시 빌드
docker build --no-cache -t khvd-2025 .
```

### 컨테이너 시작 실패 시

```bash
# 로그 확인
docker logs khvd-2025

# 환경변수 확인
docker inspect khvd-2025 | grep -A 10 Env
```

### 데이터베이스 연결 실패 시

1. 환경변수가 올바르게 설정되었는지 확인
2. 데이터베이스 호스트가 컨테이너에서 접근 가능한지 확인
3. MySQL 서버가 실행 중인지 확인

## 보안 권장사항

1. **환경변수 파일 보안**
   - `.env` 파일을 Git에 커밋하지 마세요
   - 프로덕션 환경변수는 안전하게 관리하세요

2. **비밀번호 관리**
   - 강력한 비밀번호 사용
   - Docker secrets 또는 외부 secrets 관리 도구 사용 권장

3. **네트워크 보안**
   - 필요한 포트만 노출
   - 프로덕션 환경에서는 리버스 프록시(Nginx 등) 사용 권장

## 추가 참고사항

- Node.js 버전: 22 (Alpine Linux 기반)
- 최소 이미지 크기를 위해 Alpine 사용
- 프로덕션 의존성만 포함

---

**문의사항이나 이슈가 있을 경우 프로젝트 관리자에게 연락하세요.**
