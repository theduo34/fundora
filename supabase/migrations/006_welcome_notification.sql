-- Feature: Auto-create Welcome Notification

-- Recreate the trigger function to insert both the profile and the notification
create or replace function public.handle_new_user()
returns trigger as $$
declare
  user_first_name text;
begin
  user_first_name := coalesce(new.raw_user_meta_data->>'first_name', 'there');

  -- 1. Insert Profile
  insert into public.profiles (id, email, phone, first_name, last_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'phone', ''),
    coalesce(new.raw_user_meta_data->>'first_name', ''),
    coalesce(new.raw_user_meta_data->>'last_name', '')
  );

  -- 2. Insert Welcome Notification
  insert into public.notifications (
    user_id, 
    type, 
    title, 
    body, 
    full_content, 
    icon_name
  )
  values (
    new.id, 
    'system', 
    'Welcome to Fundora!', 
    'Your account has been successfully created.', 
    'Hi ' || user_first_name || ', welcome to Fundora, the ultimate financial management app! We are thrilled to have you here. You can easily manage your money, track your expenses, and achieve your saving goals.',
    'PartyPopper'
  );

  return new;
end;
$$ language plpgsql security definer;
