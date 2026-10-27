import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { verifySession } from '@/lib/authHelper';

// POST: upload gambar ke Supabase Storage bucket "images"
export async function POST(request) {
  const user = await verifySession(request);
  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file');

  if (!file || typeof file === 'string') {
    return Response.json({ error: 'Tidak ada file yang diupload' }, { status: 400 });
  }

  // Batas 5MB
  if (file.size > 5 * 1024 * 1024) {
    return Response.json({ error: 'Ukuran file maksimal 5MB' }, { status: 400 });
  }

  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  if (!allowedTypes.includes(file.type)) {
    return Response.json({ error: 'Tipe file tidak didukung. Gunakan JPG, PNG, WebP, atau GIF.' }, { status: 400 });
  }

  // Nama file unik: timestamp + nama asli
  const ext = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const { data, error } = await supabaseAdmin.storage
    .from('images')
    .upload(fileName, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  // Ambil public URL
  const { data: urlData } = supabaseAdmin.storage
    .from('images')
    .getPublicUrl(fileName);

  return Response.json({ url: urlData.publicUrl }, { status: 201 });
}
