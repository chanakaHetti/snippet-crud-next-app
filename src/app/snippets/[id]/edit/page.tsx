import { notFound } from 'next/navigation';

import { db } from '@/db';
import SnippetEditForm from '@/components/snippet-edit-form';

interface SnippetEditPageProps {
  params: {
    id: string;
  };
}

export default async function SnippetEditPage(props: SnippetEditPageProps) {
  const { id } = await props.params;

  await new Promise((r) => setTimeout(r, 2000));

  const snippet = await db.snipet.findFirst({
    where: { id: parseInt(id) },
  });
  console.log('props edit', snippet);

  if (!snippet) {
    return notFound();
  }

  return (
    <div>
      <SnippetEditForm snippet={snippet} />
    </div>
  );
}
