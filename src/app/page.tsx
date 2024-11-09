import { db } from '@/db';

export default async function Home() {
  const snippets = await db.snipet.findMany();

  const renderedSnippets = snippets.map((snippet) => (
    <div key={snippet.id}>{snippet.title}</div>
  ));

  return <div className="">{renderedSnippets}</div>;
}
