import { auth, currentUser } from '@clerk/nextjs/server';
import { supabaseAdmin } from '@/lib/db/supabase';

export async function getOrCreateUser() {
  const { userId } = await auth();
  if (!userId) return null;

  const user = await currentUser();
  if (!user) return null;

  // Check if user exists in our DB
  const { data: existingUser } = await supabaseAdmin
    .from('users')
    .select('*')
    .eq('clerk_id', userId)
    .single();

  if (existingUser) return existingUser;

  // Create new user
  const { data: newUser, error } = await supabaseAdmin
    .from('users')
    .insert({
      clerk_id: userId,
      email: user.emailAddresses[0]?.emailAddress || '',
      name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
      avatar_url: user.imageUrl,
      plan: 'starter',
      cards_limit: 5,
    })
    .select()
    .single();

  if (error) throw error;
  return newUser;
}

export async function requireAuth() {
  const user = await getOrCreateUser();
  if (!user) throw new Error('Unauthorized');
  return user;
}
