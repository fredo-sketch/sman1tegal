import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { verifySession } from '@/lib/authHelper';

// GET: ambil semua berita
export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('berita')
    .select('id, judul, tanggal, ringkasan, isi, foto_url')
    .order('tanggal', { ascending: false });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
  return Response.json(data);
}

// POST: tambah berita baru
export async function POST(request) {
  const user = await verifySession(request);
  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { judul, tanggal, ringkasan, isi, foto_url } = body;

  if (!judul || !tanggal || !ringkasan || !isi) {
    return Response.json({ error: 'Semua field berita wajib diisi' }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from('berita')
    .insert({ judul, tanggal, ringkasan, isi, foto_url: foto_url || '/placeholder.jpg' })
    .select()
    .single();

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
  return Response.json(data, { status: 201 });
}
