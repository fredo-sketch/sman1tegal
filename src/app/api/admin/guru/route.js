import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { verifySession } from '@/lib/authHelper';

// GET: ambil semua guru
export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('guru')
    .select('id, nama, mapel, foto_url')
    .order('id', { ascending: true });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
  return Response.json(data);
}

// POST: tambah guru baru
export async function POST(request) {
  const user = await verifySession(request);
  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { nama, mapel, foto_url } = body;

  if (!nama || !mapel) {
    return Response.json({ error: 'Nama dan mapel wajib diisi' }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from('guru')
    .insert({ nama, mapel, foto_url: foto_url || '/placeholder.jpg' })
    .select()
    .single();

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
  return Response.json(data, { status: 201 });
}
