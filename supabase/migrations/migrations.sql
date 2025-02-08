/*
  # Portfolio Database Schema

  1. New Tables
    - `users` - Admin users for the portfolio
    - `projects` - Portfolio projects
    - `experiences` - Work experiences
    - `skills` - Technical skills and tools
    
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their data
*/

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  tags TEXT[],
  github_url TEXT,
  live_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Experiences table
CREATE TABLE IF NOT EXISTS experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  period TEXT NOT NULL,
  description TEXT,
  achievements TEXT[],
  logo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Skills table
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can manage their own data"
  ON users
  USING (auth.uid() = id);

CREATE POLICY "Users can manage their own projects"
  ON projects
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view projects"
  ON projects
  FOR SELECT
  USING (true);

CREATE POLICY "Users can manage their own experiences"
  ON experiences
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view experiences"
  ON experiences
  FOR SELECT
  USING (true);

CREATE POLICY "Users can manage their own skills"
  ON skills
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view skills"
  ON skills
  FOR SELECT
  USING (true);