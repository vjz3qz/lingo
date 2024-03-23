# Lingo

Have a conversation with our AI and get instant feedback on the language you are learning.

## Tech Stack

- **Frontend**: React, Material-UI, Axios
- **Backend**: Flask, Gunicorn, LangChain
- **Database**: Supabase (Postgres)
- **Deployment**: Render.com

## UI Flow

![UI Flow](development/ui-flow.png)

## API Documentation

### Chat Endpoint

- **POST** `/chat`

#### Headers

- `Content-Type`: `application/json`
- `Authorization`: `Bearer <token here>`

#### Request Body

```json
{
  "conversation_history": [
    {
      "text": "string",
      "is_user_message": "boolean"
    }
  ],
  "user_id": "string"
}
```

#### Response Body

```json
{
  "response": "string"
}
```

### Analyze Proficiency Endpoint

- **POST** `/analyze-proficiency`

#### Headers

- `Content-Type`: `application/json`
- `Authorization`: `Bearer <token here>`

#### Request Body

```json
{
  "conversation_history": [
    {
      "text": "string",
      "is_user_message": "boolean"
    }
  ],
  "user_id": "string"
}
```

#### Response Body

```json
{
  "proficiency_level": "string",
  "feedback": "string"
}
```

### Analyze Proficiency Endpoint

- **POST** `/create-user`

#### Headers

- `Content-Type`: `application/json`

#### Request Body

```json
{
  "name": "string",
  "previous_knowledge": "string",
  "interests": "string"
}
```

#### Response Body

```json
{
  "user_id": "string"
}
```

## Database Schema

### Users (users)

| Column Name        | Data Type | Constraints |
| ------------------ | --------- | ----------- |
| id                 | UUID      | PRIMARY KEY |
| name               | TEXT      | NOT NULL    |
| previous_knowledge | TEXT      | NOT NULL    |
| interests          | TEXT      | NOT NULL    |

### Previous Proficiency Feedback (previous_proficiency_feedback)

| Column Name       | Data Type | Constraints |
| ----------------- | --------- | ----------- |
| id                | UUID      | PRIMARY KEY |
| timestamp         | TIMESTAMP | NOT NULL    |
| user_id           | UUID      | FOREIGN KEY |
| language          | TEXT      | NOT NULL    |
| proficiency_level | INT       | NOT NULL    |
| feedback          | TEXT      | NOT NULL    |
