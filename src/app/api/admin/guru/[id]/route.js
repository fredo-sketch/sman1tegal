import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { verifySession } from '@/lib/authHelper';

// PUT: edit guru by id
export async function PUT(request, { params }) {
  const user = await verifySession(request);
  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const { nama, mapel, foto_url } = body;

  if (!nama || !mapel) {
    return Response.json({ error: 'Nama dan mapel wajib diisi' }, { status: 400 });
  }

  const updateData = { nama, mapel };
  if (foto_url) updateData.foto_url = foto_url;

  const { data, error } = await supabaseAdmin
    .from('guru')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
  return Response.json(data);
}

// DELETE: hapus guru by id
export async function DELETE(request, { params }) {
  const user = await verifySession(request);
  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  const { error } = await supabaseAdmin
    .from('guru')
    .delete()
    .eq('id', id);

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
  return Response.json({ success: true });
}
