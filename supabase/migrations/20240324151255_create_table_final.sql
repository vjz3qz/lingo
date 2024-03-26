-- Create Users table
CREATE TABLE
    users (
        id uuid not null references auth.users on delete cascade,
        name TEXT NOT NULL,
        previous_knowledge TEXT NOT NULL,
        interests TEXT NOT NULL,
        primary key (id)
    );

-- Create Previous Proficiency Feedback table
CREATE TABLE
    previous_proficiency_feedback (
        id UUID PRIMARY KEY,
        timestamp TIMESTAMP NOT NULL,
        user_id UUID REFERENCES users (id),
        language TEXT NOT NULL,
        proficiency_level INT NOT NULL,
        feedback TEXT NOT NULL
    );