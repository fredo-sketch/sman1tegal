import DetailBeritaClient from './DetailBeritaClient';

export const instant = false;

export default async function DetailBerita({ params }) {
  const { id } = await params;
  return <DetailBeritaClient id={id} />;
}
