# omnipost API

## Endpoints

### Generate Content

Generate platform-specific content from original content.

```bash
POST /generate
Content-Type: application/json

{
  "originalContent": "Your content here",
  "targetPlatform": "linkedin",
  "tone": "professional",
  "hashtags": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid-here",
    "platform": "linkedin",
    "text": "Generated content...",
    "media": [...]
  }
}
```

---

### Get History

Get generated posts history.

```bash
# All platforms
GET /history

# Filter by platform
GET /history?platform=linkedin

# With limit
GET /history?platform=linkedin&limit=5
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-here",
      "original_content": "Your original content",
      "platform": "linkedin",
      "generated_content": "Generated content...",
      "tone": "professional",
      "created_at": "2024-01-15T10:00:00Z"
    }
  ]
}
```

---

### Get History by Platform

```bash
GET /history/:platform
GET /history/threads?limit=10
```

---

### Post to Platform

Post content to a specific platform.

```bash
POST /post/:platform
Content-Type: application/json

{
  "content": {
    "platform": "threads",
    "text": "Your post content"
  }
}
```

**Platform:** `threads`, `linkedin`, `instagram`

---

### Schedule Post

Schedule a post for future publishing.

```bash
POST /schedule
Content-Type: application/json

{
  "content": {
    "originalContent": "Your content",
    "targetPlatform": "linkedin"
  },
  "scheduledAt": "2024-01-15T10:00:00Z",
  "platforms": ["linkedin", "threads"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "postId": "post_1705312800000"
  }
}
```

---

### Get Scheduled Posts

```bash
GET /scheduled
```

---

### Health Check

```bash
GET /health
```

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | Yes | OpenAI API key |
| `OPENAI_MODEL` | No | Model (default: gpt-4-turbo-preview) |
| `PORT` | No | Server port (default: 3000) |
| `LOG_LEVEL` | No | Log level (default: info) |

---

## Running Locally

```bash
npm install
cp .env.example .env
# Edit .env with your API keys
npm run dev
```

## Running Tests

```bash
npm test
```

## Database

SQLite database is auto-created in `data/crossreach.db` on first run. Contains:
- `generated_posts` - All generated content with history
- `post_history` - Publishing status tracking
