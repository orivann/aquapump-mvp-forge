-- Add user_id column to link data to specific users
ALTER TABLE public.user_data 
ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Update existing rows to have a user_id (if any exist)
-- This assumes we want to assign existing data to the first user or handle differently
-- You may need to adjust this based on your data

-- Create RLS policies to protect user data
CREATE POLICY "Users can view their own data" 
ON public.user_data 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own data" 
ON public.user_data 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own data" 
ON public.user_data 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own data" 
ON public.user_data 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create index for better performance
CREATE INDEX idx_user_data_user_id ON public.user_data(user_id);