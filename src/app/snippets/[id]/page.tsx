import { notFound } from 'next/navigation';

import { db } from '@/db';

interface SnippetViewPageProps {
  params: {
    id: string;
  };
}

export default async function SnippetViewPage(props: SnippetViewPageProps) {
  const { id } = await props.params;

  await new Promise((r) => setTimeout(r, 2000));

  const snippet = await db.snipet.findFirst({
    where: { id: parseInt(id) },
  });
  console.log('props', snippet);

  if (!snippet) {
    return notFound();
  }

  return <div>{snippet.title}</div>;
}
