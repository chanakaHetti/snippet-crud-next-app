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

  return (
    <div>
      <div className="flex m-4 justify-between items-center">
        <h1 className="text-xl font-bold">{snippet.title}</h1>
        <div className="flex gap-2">
          <button className="p-2 border rounded">Edit</button>
          <button className="p-2 border rounded">Delete</button>
        </div>
      </div>

      <pre className="p-3 border rounded bg-gray-200 border-gray-200">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
}
