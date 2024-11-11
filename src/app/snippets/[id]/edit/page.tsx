import { notFound } from 'next/navigation';

import { db } from '@/db';
import SnippetEditForm from '@/components/snippet-edit-form';

type Params = Promise<{ id: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function SnippetEditPage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const params = await props.params;
  const id = params.id;

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
