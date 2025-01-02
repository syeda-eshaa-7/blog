import fs from "fs/promises";
import path from "path";
import rehypeDocument from "rehype-document";
import rehypeFormat from "rehype-format";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import rehypePrettyCode from "rehype-pretty-code";
import { transformerCopyButton } from "@rehype-pretty/transformers";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import OnThisPage from "../../components/onthispage";
import CommentSection from "@/app/components/Comments";


// Define the type for the params


// Define the type for the props
interface PageProps {
    params: Promise<{
      slug: string;
    }>;
  }

// Blog post page
export default async function Page({ params }: PageProps) {
    // Await the params as it is a Promise
    const resolvedParams = await params;
    const { slug } = resolvedParams;
  // Construct the filepath for the markdown file
  const filepath = path.join(process.cwd(), "content", `${slug}.md`);

  let fileContent;
  try {
    // Check if the file exists
    await fs.access(filepath);
    // Read the content of the markdown file
    fileContent = await fs.readFile(filepath, "utf-8");
  } catch {
    // If the file doesn't exist, return a 404 page
    notFound();
    return null; // Return null since we have already sent a 404 response
  }

  const { content, data } = matter(fileContent);

  // Process the markdown content into HTML using unified and rehype
  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeDocument, { title: data.title || "Blog Post" })
    .use(rehypeFormat)
    .use(rehypeStringify)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(rehypePrettyCode, {
      theme: "github-dark",
      transformers: [
        transformerCopyButton({
          visibility: "always",
          feedbackDuration: 3000, // 3 seconds
        }),
      ],
    });

  let htmlContent;
  try {
    htmlContent = (await processor.process(content)).toString();
  } catch (error) {
    console.error("Error processing markdown content:", error);
    notFound();
    return;
  }

  // Return the JSX for the blog post page
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
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
          Comments
        </h2>
        <CommentSection />
      </div>
    </div>
  );
}
