


import fs from "fs"
import matter from "gray-matter"
import { notFound } from "next/navigation"
import rehypeDocument from 'rehype-document'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import rehypePrettyCode from "rehype-pretty-code"
import { transformerCopyButton } from '@rehype-pretty/transformers'
import OnThisPage from "../../components/onthispage"
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import CommentSection from "@/app/components/Comments"
interface Params {
  slug: string;
};
interface PageProps {
  params: Promise<Params>;
}


export default async function Page({ params }: PageProps) {
  const resolvedParams = await params; // Wait for the promise to resolve
  const filepath = `content/${resolvedParams.slug}.md`
  
    if (!fs.existsSync(filepath)) {
        notFound()
        return
    }

    const fileContent = fs.readFileSync(filepath, "utf-8")
    const { content, data } = matter(fileContent)

    const processor = unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeDocument, { title: '👋🌍' })
        .use(rehypeFormat)
        .use(rehypeStringify)
        .use(rehypeSlug)
        .use(rehypeAutolinkHeadings)
        .use(rehypePrettyCode, {
            theme: "github-dark",
            transformers: [
                transformerCopyButton({
                    visibility: 'always',
                    feedbackDuration: 3_000,
                }),
            ],
        })

    const htmlContent = (await processor.process(content)).toString()

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
                <p>By <span className="font-medium">{data.author}</span></p>
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
    )
}


// import fs from "fs";
// import path from "path";
// import matter from "gray-matter";
// import rehypePrettyCode from "rehype-pretty-code";
// import { transformerCopyButton } from "@rehype-pretty/transformers";
// import rehypeSlug from "rehype-slug";
// import rehypeAutolinkHeadings from "rehype-autolink-headings";
// import CommentSection from "@/app/components/Comments";
// import OnThisPage from "@/app/components/onthispage";
// import { unified } from "unified";
// import remarkParse from "remark-parse";
// import remarkRehype from "remark-rehype";
// import rehypeDocument from "rehype-document";
// import rehypeFormat from "rehype-format";
// import rehypeStringify from "rehype-stringify";

// interface FrontMatter {
//   title: string;
//   description: string;
//   author: string;
//   date: string;
// }

// type Params = {
//   slug: string;
// };

// type PageProps = {
//   params: Params;
// };

// export async function generateStaticParams() {
//   const slugs = fs
//     .readdirSync(path.join(process.cwd(), "content"))
//     .filter((file) => file.endsWith(".md"))
//     .map((file) => ({ slug: file.replace(".md", "") }));

//   return slugs;
// }

// export default async function Page({ params }: PageProps) {
//   const filepath = path.join(process.cwd(), "content", `${params.slug}.md`);

//   if (!fs.existsSync(filepath)) {
//     return <div>Post not found</div>;
//   }

//   const fileContent = fs.readFileSync(filepath, "utf-8");
//   const { content, data } = matter(fileContent);
//   const frontMatter = data as FrontMatter;

//   const processor = unified()
//     .use(remarkParse)
//     .use(remarkRehype)
//     .use(rehypeDocument, { title: frontMatter.title })
//     .use(rehypeFormat)
//     .use(rehypeStringify)
//     .use(rehypeSlug)
//     .use(rehypeAutolinkHeadings)
//     .use(rehypePrettyCode, {
//       theme: "github-dark",
//       transformers: [
//         transformerCopyButton({
//           visibility: "always",
//           feedbackDuration: 3000,
//         }),
//       ],
//     });

//   const htmlContent = (await processor.process(content)).toString();

//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       <h1 className="text-4xl font-semibold mb-6">{frontMatter.title}</h1>
//       <p className="text-gray-600 italic mb-6">{frontMatter.description}</p>
//       <div className="flex gap-4 text-sm text-gray-500 mb-6">
//         <p>By <span className="font-medium">{frontMatter.author}</span></p>
//         <p>{new Date(frontMatter.date).toLocaleDateString()}</p>
//       </div>
//       <div className="prose dark:prose-invert mb-8">
//         <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
//       </div>
//       <OnThisPage htmlContent={htmlContent} />
//       <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-lg">
//         <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">Comments</h2>
//         <CommentSection />
//       </div>
//     </div>
//   );
// }


// import fs from "fs";
// import path from "path";
// import matter from "gray-matter";
// import rehypePrettyCode from "rehype-pretty-code";
// import { transformerCopyButton } from "@rehype-pretty/transformers";
// import rehypeSlug from "rehype-slug";
// import rehypeAutolinkHeadings from "rehype-autolink-headings";
// import CommentSection from "@/app/components/Comments";
// import OnThisPage from "@/app/components/onthispage";
// import { unified } from "unified";
// import remarkParse from "remark-parse";
// import remarkRehype from "remark-rehype";
// import rehypeDocument from "rehype-document";
// import rehypeFormat from "rehype-format";
// import rehypeStringify from "rehype-stringify";
// type PageProps = {
//   params: {
//     slug: string;
//   };
// };

// export default async function Page({ params }: PageProps) {
//   const { slug } = params; // `slug` should be available synchronously
//   const filepath = path.join(process.cwd(), "content", `${slug}.md`);

//   if (!fs.existsSync(filepath)) {
//     return <div>Post not found</div>;
//   }

//   const fileContent = fs.readFileSync(filepath, "utf-8");
//   const { content, data } = matter(fileContent);
//   const frontMatter = data as FrontMatter;

//   const processor = unified()
//     .use(remarkParse)
//     .use(remarkRehype)
//     .use(rehypeDocument, { title: frontMatter.title })
//     .use(rehypeFormat)
//     .use(rehypeStringify)
//     .use(rehypeSlug)
//     .use(rehypeAutolinkHeadings)
//     .use(rehypePrettyCode, {
//       theme: "github-dark",
//       transformers: [
//         transformerCopyButton({
//           visibility: "always",
//           feedbackDuration: 3000,
//         }),
//       ],
//     });

//   const htmlContent = (await processor.process(content)).toString();

//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       <h1 className="text-4xl font-semibold mb-6">{frontMatter.title}</h1>
//       <p className="text-gray-600 italic mb-6">{frontMatter.description}</p>
//       <div className="flex gap-4 text-sm text-gray-500 mb-6">
//         <p>
//           By <span className="font-medium">{frontMatter.author}</span>
//         </p>
//         <p>{new Date(frontMatter.date).toLocaleDateString()}</p>
//       </div>
//       <div className="prose dark:prose-invert mb-8">
//         <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
//       </div>
//       <OnThisPage htmlContent={htmlContent} />
//       <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-lg">
//         <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
//           Comments
//         </h2>
//         <CommentSection />
//       </div>
//     </div>
//   );
// }


// //import fs from "fs";
// // import fs from "fs";
// // import path from "path";
// // import matter from "gray-matter";
// // import rehypePrettyCode from "rehype-pretty-code";
// // import { transformerCopyButton } from "@rehype-pretty/transformers";
// // import rehypeSlug from "rehype-slug";
// // import rehypeAutolinkHeadings from "rehype-autolink-headings";
// // import CommentSection from "@/app/components/Comments";
// // import OnThisPage from "@/app/components/onthispage";
// import { unified } from "unified";
// import remarkParse from "remark-parse";
// import remarkRehype from "remark-rehype";
// import rehypeDocument from "rehype-document";
// import rehypeFormat from "rehype-format";
// import rehypeStringify from "rehype-stringify";

// interface PageParams {
//   slug: string;
// }

// type Props = {
//   params: PageParams;
// };

// export default async function Page({ params }: Props) {
//   const filepath = path.join(process.cwd(), "content", `${params.slug}.md`);

//   // Check if the file exists, if not, return a 404 error
//   if (!fs.existsSync(filepath)) {
//     return { notFound: true };
//   }

//   // Read the file content
//   const fileContent = fs.readFileSync(filepath, "utf-8");

//   // Use gray-matter to parse the Markdown front matter and content
//   const { content, data } = matter(fileContent);

//   // Process the Markdown content to HTML
//   const processor = unified()
//     .use(remarkParse)
//     .use(remarkRehype)
//     .use(rehypeDocument, { title: data.title })
//     .use(rehypeFormat)
//     .use(rehypeStringify)
//     .use(rehypeSlug)
//     .use(rehypeAutolinkHeadings)
//     .use(rehypePrettyCode, {
//       theme: "github-dark",
//       transformers: [
//         transformerCopyButton({
//           visibility: "always",
//           feedbackDuration: 3000,
//         }),
//       ],
//     });

//   const htmlContent = (await processor.process(content)).toString();

//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       {/* Blog Title */}
//       <h1 className="text-4xl font-semibold mb-6">{data.title}</h1>

//       {/* Blog Description */}
//       <p className="text-gray-600 italic mb-6">{data.description}</p>

//       {/* Meta info (author, date) */}
//       <div className="flex gap-4 text-sm text-gray-500 mb-6">
//         <p>By <span className="font-medium">{data.author}</span></p>
//         <p>{new Date(data.date).toLocaleDateString()}</p>
//       </div>

//       {/* Blog Content */}
//       <div className="prose dark:prose-invert mb-8">
//         <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
//       </div>

//       {/* On This Page Component */}
//       <OnThisPage htmlContent={htmlContent} />

//       {/* Comment Section */}
//       <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-lg">
//         <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">Comments</h2>
//         <CommentSection />
//       </div>
//     </div>
//   );
// }



// import fs from "fs";
// import path from "path";
// import matter from "gray-matter";
// import rehypePrettyCode from "rehype-pretty-code";
// import { transformerCopyButton } from "@rehype-pretty/transformers";
// import rehypeSlug from "rehype-slug";
// import rehypeAutolinkHeadings from "rehype-autolink-headings";
// import CommentSection from "@/app/components/Comments";
// import OnThisPage from "@/app/components/onthispage";
// import { unified } from "unified";
// import remarkParse from "remark-parse";
// import remarkRehype from "remark-rehype";
// import rehypeDocument from "rehype-document";
// import rehypeFormat from "rehype-format";
// import rehypeStringify from "rehype-stringify";

// // No need for the Props type anymore

// export default async function Page({ params }: { params: { slug: string } }) {
//   const filepath = path.join(process.cwd(), "content", `${params.slug}.md`);

//   // Check if the file exists, if not, return a 404 error
//   if (!fs.existsSync(filepath)) {
//     return { notFound: true };
//   }

//   // Read the file content
//   const fileContent = fs.readFileSync(filepath, "utf-8");

//   // Use gray-matter to parse the Markdown front matter and content
//   const { content, data } = matter(fileContent);

//   // Process the Markdown content to HTML
//   const processor = unified()
//     .use(remarkParse)
//     .use(remarkRehype)
//     .use(rehypeDocument, { title: data.title })
//     .use(rehypeFormat)
//     .use(rehypeStringify)
//     .use(rehypeSlug)
//     .use(rehypeAutolinkHeadings)
//     .use(rehypePrettyCode, {
//       theme: "github-dark",
//       transformers: [
//         transformerCopyButton({
//           visibility: "always",
//           feedbackDuration: 3000,
//         }),
//       ],
//     });

//   const htmlContent = (await processor.process(content)).toString();

//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       {/* Blog Title */}
//       <h1 className="text-4xl font-semibold mb-6">{data.title}</h1>

//       {/* Blog Description */}
//       <p className="text-gray-600 italic mb-6">{data.description}</p>

//       {/* Meta info (author, date) */}
//       <div className="flex gap-4 text-sm text-gray-500 mb-6">
//         <p>By <span className="font-medium">{data.author}</span></p>
//         <p>{new Date(data.date).toLocaleDateString()}</p>
//       </div>

//       {/* Blog Content */}
//       <div className="prose dark:prose-invert mb-8">
//         <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
//       </div>

//       {/* On This Page Component */}
//       <OnThisPage htmlContent={htmlContent} />

//       {/* Comment Section */}
//       <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-lg">
//         <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">Comments</h2>
//         <CommentSection />
//       </div>
//     </div>
//   );
// }
