import { db } from '@/db';
import Link from 'next/link';

// From this line this component will be full dynamic.
// export const dynamic = 'force-dynamic';

export default async function Home() {
  const snippets = await db.snipet.findMany();

  const renderedSnippets = snippets.map((snippet) => (
    <Link
      key={snippet.id}
      href={`snippets/${snippet.id}`}
      className="flex justify-between items-center p-2 border rounded"
    >
      <div>{snippet.title}</div>
      <div>View</div>
    </Link>
  ));

  return (
    <div className="">
      <div className="flex m-2 mb-10 justify-between items-center">
        <h1 className="text-xl font-bold">Snippets</h1>
        <Link href={`snippets/new`} className="border p-2 rounded">
          New Snippet
        </Link>
      </div>
      <div className="flex flex-col gap-2">{renderedSnippets}</div>
    </div>
  );
}
