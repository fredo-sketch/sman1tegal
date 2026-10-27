import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { verifySession } from '@/lib/authHelper';

// PUT: edit berita by id
export async function PUT(request, { params }) {
  const user = await verifySession(request);
  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const { judul, tanggal, ringkasan, isi, foto_url } = body;

  if (!judul || !tanggal || !ringkasan || !isi) {
    return Response.json({ error: 'Semua field berita wajib diisi' }, { status: 400 });
  }

  const updateData = { judul, tanggal, ringkasan, isi };
  if (foto_url) updateData.foto_url = foto_url;

  const { data, error } = await supabaseAdmin
    .from('berita')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
  return Response.json(data);
}

// DELETE: hapus berita by id
export async function DELETE(request, { params }) {
  const user = await verifySession(request);
  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  const { error } = await supabaseAdmin
    .from('berita')
    .delete()
    .eq('id', id);

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
  return Response.json({ success: true });
}
