
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import rehypeDocument from 'rehype-document';
import rehypeFormat from 'rehype-format';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import rehypePrettyCode from 'rehype-pretty-code';
import { transformerCopyButton } from '@rehype-pretty/transformers';
import OnThisPage from '../../components/onthispage';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import CommentSection from '@/app/components/Comments';

interface Params {
  slug: string;
}

interface PageProps {
  params: Params;
  content: string;
  data: any;
}

// This will generate params at build time
export async function generateStaticParams() {
  const files = fs.readdirSync(path.join(process.cwd(), 'content'));
  const slugs = files.map(file => ({
    slug: file.replace('.md', ''),
  }));

  return slugs;
}

export default async function Page({ params }: PageProps) {
  const { slug } = params;
  const filepath = path.join(process.cwd(), 'content', `${slug}.md`);

  if (!fs.existsSync(filepath)) {
    notFound();
    return;
  }

  const fileContent = fs.readFileSync(filepath, 'utf-8');
  const { content, data } = matter(fileContent);

  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeDocument, { title: '👋🌍' })
    .use(rehypeFormat)
    .use(rehypeStringify)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(rehypePrettyCode, {
      theme: 'github-dark',
      transformers: [
        transformerCopyButton({
          visibility: 'always',
          feedbackDuration: 3000,
        }),
      ],
    });

  const htmlContent = (await processor.process(content)).toString();

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Blog Title */}
      <h1 className="text-4xl font-semibold mb-6 text-gray-900 dark:text-white tracking-tight">
        {data.title}
      </h1>

      {/* Description */}
      <p className="text-lg text-gray-600 dark:text-gray-400 italic mb-6 border-l-4 border-gray-500 pl-4">
        &quot;{data.description}&quot;
      </p>

      {/* Meta info */}
      <div className="flex gap-4 text-sm text-gray-500 mb-6">
        <p>
          By <span className="font-medium">{data.author}</span>
        </p>
        <p>{data.date}</p>
      </div>

      {/* Content */}
      <div className="prose dark:prose-invert mb-8">
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>

      {/* On This Page Component */}
      <OnThisPage htmlContent={htmlContent} />

      {/* Comment Section */}
      <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">Comments</h2>
        <CommentSection />
      </div>
    </div>
  );
}
