-- Create sample seed data for Users table
INSERT INTO
    users (id, name, previous_knowledge, interests)
VALUES
    (
        'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        'John Doe',
        'Beginner',
        'Spanish, French'
    ),
    (
        'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
        'Jane Smith',
        'Intermediate',
        'French, German'
    ),
    (
        'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13',
        'David Johnson',
        'Advanced',
        'Spanish, Italian'
    );

-- Create sample seed data for Previous Proficiency Feedback table
INSERT INTO
    previous_proficiency_feedback (
        id,
        timestamp,
        user_id,
        language,
        proficiency_level,
        feedback
    )
VALUES
    (
        'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a21',
        NOW (),
        'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        'Spanish',
        3,
        'Great progress!'
    ),
    (
        'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
        NOW (),
        'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
        'French',
        2,
        'Needs improvement in pronunciation'
    ),
    (
        'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a23',
        NOW (),
        'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
        'French',
        4,
        'Excellent proficiency'
    ),
    (
        'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a24',
        NOW (),
        'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
        'German',
        3,
        'Good understanding of grammar'
    ),
    (
        'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a25',
        NOW (),
        'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        'Spanish',
        5,
        'Native-like fluency'
    ),
    (
        'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a26',
        NOW (),
        'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13',
        'Italian',
        4,
        'Impressive vocabulary'
    );

-- Additional sample seed data can be added here