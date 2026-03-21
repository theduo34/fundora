-- 1. Fix the new user trigger to include phone
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, phone, first_name, last_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'phone', ''),
    coalesce(new.raw_user_meta_data->>'first_name', ''),
    coalesce(new.raw_user_meta_data->>'last_name', '')
  );
  return new;
end;
$$ language plpgsql security definer;

-- 2. Create Dummy Data
DO $$
DECLARE
  first_user_id uuid;
  visa_card_id uuid;
  mastercard_card_id uuid;
BEGIN
  -- Get the first registered user
  SELECT id INTO first_user_id FROM public.profiles LIMIT 1;

  IF first_user_id IS NULL THEN
    RAISE NOTICE 'No profile found. Please register an account first.';
    RETURN;
  END IF;

  -- Create dummy cards
  INSERT INTO public.cards (user_id, network, type, label, masked_pan, card_holder_name, expiry_month, expiry_year, gradient_variant)
  VALUES 
    (first_user_id, 'visa', 'debit', 'VISA •••• 4242', '4242', 'JOHN DOE', '12', '28', 'secondary')
  RETURNING id INTO visa_card_id;

  INSERT INTO public.cards (user_id, network, type, label, masked_pan, card_holder_name, expiry_month, expiry_year, gradient_variant)
  VALUES 
    (first_user_id, 'mastercard', 'credit', 'MC •••• 8888', '8888', 'JOHN DOE', '08', '26', 'primary')
  RETURNING id INTO mastercard_card_id;

  -- Create dummy transactions (Amounts in cents)
  INSERT INTO public.transactions (user_id, card_id, type, status, category, amount, currency, description, merchant_logo_url, balance_after)
  VALUES 
    (first_user_id, visa_card_id, 'debit', 'completed', 'shopping', 125000, 'USD', 'Apple Store', 'https://logo.clearbit.com/apple.com', 850000),
    (first_user_id, mastercard_card_id, 'debit', 'completed', 'food', 4500, 'USD', 'Starbucks', 'https://logo.clearbit.com/starbucks.com', 845500),
    (first_user_id, visa_card_id, 'credit', 'completed', 'transfer', 250000, 'USD', 'Tech Corp', 'https://logo.clearbit.com/stripe.com', 1095500),
    (first_user_id, visa_card_id, 'debit', 'completed', 'transport', 1550, 'USD', 'Uber', 'https://logo.clearbit.com/uber.com', 1093950);

  -- Create dummy notifications
  INSERT INTO public.notifications (user_id, type, title, body, full_content, amount, currency, icon_name)
  VALUES 
    (first_user_id, 'transaction', 'Payment Successful', 'You paid $1,250.00 at Apple Store.', 'Your payment of $1,250.00 to Apple Store using VISA •••• 4242 was processed successfully.', 125000, 'USD', 'CheckCircle2'),
    (first_user_id, 'system', 'Security Alert', 'New login from Mac OS device.', 'We noticed a new login from a Mac OS device in New York. If this was you, you can ignore this message.', null, null, 'ShieldAlert'),
    (first_user_id, 'transaction', 'Money Received', 'You received $2,500.00 from Tech Corp.', 'Your salary deposit of $2,500.00 was successfully added to your main account.', 250000, 'USD', 'ArrowDownLeft');

  -- Update user balance to match
  UPDATE public.profiles SET balance = 1093950 WHERE id = first_user_id;

END $$;
