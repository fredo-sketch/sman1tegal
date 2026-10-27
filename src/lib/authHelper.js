import { supabase } from '@/lib/supabaseClient';
import { cookies } from 'next/headers';

// Helper terpusat untuk memverifikasi session admin dari Authorization header atau cookie
export async function verifySession(request) {
  // 1. Cek dari Authorization header
  const authHeader = request?.headers?.get('authorization') || request?.headers?.get('Authorization');
  let token = null;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7).trim();
  }

  // 2. Fallback cek dari cookie
  if (!token) {
    try {
      const cookieStore = await cookies();
      token = cookieStore.get('sb-access-token')?.value;
    } catch {
      // ignore
    }
  }

  if (!token) return null;

  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) return null;
  return user;
}

