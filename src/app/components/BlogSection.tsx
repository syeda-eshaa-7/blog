import Link from 'next/link'; // Import Link from Next.js
import { Button } from "@/components/ui/button";
import Image from 'next/image'; // Import the Image component

export function BlogSection() {
  const blogPosts = [
    {
      image: "/code2.png",
      title: "Blog Post Title 1",
      description: "A brief description of the blog post goes here. It should be engaging and informative.",
      href: "/blog-post-1"
    },
    {
      image: "/coding.jpeg",
      title: "Blog Post Title 2",
      description: "A brief description of the blog post goes here. It should be engaging and informative.",
      href: "/blog-post-2"
    },
    {
      image: "https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg",
      title: "Blog Post Title 3",
      description: "A brief description of the blog post goes here. It should be engaging and informative.",
      href: "/blog-post-3"
    }
  ];

  return (
    <section className="py-12 bg-gray-100 dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200">Top Blogs</h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">Check out our most popular blog posts</p>
        </div>
        <div className="flex flex-wrap justify-center">
          {blogPosts.map((post, index) => (
            <div key={index} className="w-full sm:w-1/2 lg:w-1/3 p-4">
              <div className="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800 transform transition duration-500 hover:scale-105">
                {/* Replace img tag with Image component */}
                <div className="relative w-full h-64">
                  <Image
                    src={post.image}
                    alt={post.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{post.title}</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">{post.description}</p>
                  {/* Wrap the Button with Link */}
                  <Link href={'/blog'}>
                    <Button className="m-2" variant="outline">Read More</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
