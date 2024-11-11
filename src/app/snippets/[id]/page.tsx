import { notFound } from 'next/navigation';

import { db } from '@/db';
import Link from 'next/link';
import { deleteSnippet } from '@/actions';

type Params = Promise<{ id: string }>;

export default async function SnippetViewPage(props: { params: Params }) {
  const { id } = await props.params;

  await new Promise((r) => setTimeout(r, 2000));

  const snippet = await db.snipet.findFirst({
    where: { id: parseInt(id) },
  });

  if (!snippet) {
    return notFound();
  }

  const deleteSnippetAction = deleteSnippet.bind(null, snippet.id);

  return (
    <div>
      <div className="flex m-4 justify-between items-center">
        <h1 className="text-xl font-bold">{snippet.title}</h1>
        <div className="flex gap-2">
          <Link
            href={`/snippets/${snippet.id}/edit`}
            className="p-2 border rounded"
          >
            Edit
          </Link>
          <form action={deleteSnippetAction}>
            <button className="p-2 border rounded">Delete</button>
          </form>
        </div>
      </div>

      <pre className="p-3 border rounded bg-gray-200 border-gray-200">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
}

/**
 * This already a dynamic route because of the [id]
 * When we build the production, next identify this snippet view page as a dynamic
 * So it renders everytime, because dynamic page's caches are disable.
 * It's not a better idea,
 * We can already build each pages of the snippet view pages one by one,
 * while bulding our production - npm run build --> npm run start
 * Then our server has already built each view pages
 * When click each snippet view page, it renders already build pages (Caching)
 * So we can improve page loading because of this cahing mechanism
 * To do this, we have to write below functionality,
 * then it will automatically build the cache during the build time.
 */
export async function generateStaticParams() {
  const snippets = await db.snipet.findMany();

  return snippets.map((snippet) => {
    return {
      id: snippet.id.toString(),
    };
  });
}
