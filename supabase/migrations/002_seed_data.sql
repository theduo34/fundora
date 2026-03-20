-- Seed function: call after a user signs up to populate demo data
-- Usage: select public.seed_demo_data('USER_UUID_HERE');

create or replace function public.seed_demo_data(p_user_id uuid)
returns void as $$
declare
  card1_id uuid := gen_random_uuid();
  card2_id uuid := gen_random_uuid();
begin
  -- update profile with demo balance
  update public.profiles set
    balance = 349985,
    phone = '+1 (555) 234-5678',
    address = '123 Main Street, New York, NY 10001',
    avatar_url = 'https://i.pravatar.cc/150?u=fundora'
  where id = p_user_id;

  -- cards
  insert into public.cards (id, user_id, network, type, status, label, card_holder_name, masked_pan, expiry_month, expiry_year, balance, gradient_variant)
  values
    (card1_id, p_user_id, 'visa', 'debit', 'active', 'Personal Visa', 'Fundora User', '1121', '07', '26', 4965000, 'primary'),
    (card2_id, p_user_id, 'mastercard', 'credit', 'active', 'Business Credit', 'Fundora User', '4488', '11', '27', 40292300, 'secondary');

  -- transactions
  insert into public.transactions (user_id, card_id, type, status, category, amount, currency, description, merchant_logo_url, reference, balance_after, fee, metadata, created_at, completed_at)
  values
    (p_user_id, card1_id, 'debit', 'completed', 'entertainment', 1590, 'USD', 'Netflix', 'https://logo.clearbit.com/netflix.com', 'REF20250224001', 496350000, 0, '{"merchantId":"MCH_netflix_001"}', now() - interval '5 days', now() - interval '5 days'),
    (p_user_id, null, 'credit', 'completed', 'transfer', 150000, 'USD', 'Shola Daniel', null, 'REF20250226002', 497850000, 0, '{}', now() - interval '3 days', now() - interval '3 days'),
    (p_user_id, card1_id, 'debit', 'completed', 'entertainment', 15000, 'USD', 'iTunes', 'https://logo.clearbit.com/apple.com', 'REF20250225003', 497700000, 0, '{"merchantId":"MCH_apple_002"}', now() - interval '4 days', now() - interval '4 days'),
    (p_user_id, card1_id, 'debit', 'completed', 'food', 4500, 'USD', 'Starbucks', 'https://logo.clearbit.com/starbucks.com', 'REF20250227004', 497655000, 0, '{}', now() - interval '2 days', now() - interval '2 days'),
    (p_user_id, card2_id, 'debit', 'completed', 'transport', 8500, 'USD', 'Uber', 'https://logo.clearbit.com/uber.com', 'REF20250228005', 497570000, 0, '{}', now() - interval '1 day', now() - interval '1 day'),
    (p_user_id, null, 'topup', 'completed', 'topup', 500000, 'USD', 'Bank Transfer', null, 'REF20250220006', 502570000, 0, '{}', now() - interval '10 days', now() - interval '10 days');

  -- notifications
  insert into public.notifications (user_id, type, status, title, body, full_content, amount, currency, action_url, icon_name, metadata, created_at)
  values
    (p_user_id, 'transaction_debit', 'unread', 'Payment Successful', 'Your payment of $15.90 to Netflix was successful.', 'Your payment of $15.90 to Netflix has been processed successfully. Your new available balance is $49,634.10. If you did not authorise this transaction, please contact support immediately.', 1590, 'USD', '/transactions', 'ArrowUpRight', '{}', now() - interval '5 days'),
    (p_user_id, 'transaction_credit', 'unread', 'Money Received', 'Shola Daniel sent you $1,500.00.', 'Great news! Shola Daniel has sent you $1,500.00. The funds have been added to your wallet balance. Note: Rent split February.', 150000, 'USD', '/transactions', 'ArrowDownLeft', '{}', now() - interval '3 days'),
    (p_user_id, 'security_alert', 'read', 'New Device Login', 'A new login was detected from your device.', 'We detected a login to your Fundora account from a new device. If this was you, no action is needed. If you don''t recognise this activity, secure your account immediately.', null, null, '/settings/security', 'ShieldAlert', '{}', now() - interval '4 days'),
    (p_user_id, 'promotion', 'read', 'Zero Fees This Weekend 🎉', 'Send money to any bank for free until Sunday midnight.', 'This weekend only — send money to any local or international bank account with zero transfer fees. No promo code needed. Terms and conditions apply.', null, null, '/send', 'Gift', '{}', now() - interval '1 day');
end;
$$ language plpgsql security definer;
