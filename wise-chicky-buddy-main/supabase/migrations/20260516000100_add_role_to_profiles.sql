ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS role TEXT CHECK (role IN ('student', 'teacher', 'parent', 'doctor'));

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, role)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.email,
    NEW.raw_user_meta_data->>'role'
  );
  RETURN NEW;
END;
$$;
