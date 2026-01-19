import { getBlogBySlug, getAllBlogs } from '@/lib/blog';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type Props = {
    params: Promise<{ slug: string }>;
};

// Generate static params for all blogs
export async function generateStaticParams() {
    const blogs = getAllBlogs();
    return blogs.map((blog) => ({
        slug: blog.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const blog = getBlogBySlug(slug);

    if (!blog) {
        return {
            title: 'Blog Not Found | Vedanta Oils',
        };
    }

    return {
        title: `${blog.metaTitle}`,
        description: blog.metaDescription,
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const blog = getBlogBySlug(slug);

    if (!blog) {
        notFound();
    }

    const allBlogs = getAllBlogs();
    const relatedBlogs = allBlogs.filter((b) => b.id !== blog.id).slice(0, 3);

    return (
        <div className="container mx-auto px-4 py-12">
            <article className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8 text-center">
                    <div className="flex justify-center gap-2 mb-4">
                        {blog.tags.map((tag) => (
                            <span key={tag} className="text-sm font-semibold px-3 py-1 bg-[var(--primary)] text-white rounded-full">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[var(--foreground)]">{blog.title}</h1>
                    <div className="flex items-center justify-center text-[var(--foreground)] opacity-70 gap-4">
                        <span>By {blog.author}</span>
                        <span>•</span>
                        <span>{blog.date}</span>
                    </div>
                </div>

                {/* Featured Image */}
                <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-12 shadow-2xl">
                    <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Content */}
                <div
                    className="prose prose-lg dark:prose-invert max-w-none mb-16 mx-auto bg-[var(--card-bg)] p-8 md:p-12 rounded-2xl text-justify font-serif leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                {/* Share/CTA */}
                <div className="border-t border-b border-[var(--border)] py-8 my-12 text-center">
                    <h3 className="text-2xl font-bold mb-4">Ready to experience Vedanta Oils?</h3>
                    <p className="mb-6 opacity-70">Explore our premium range of essential oils and natural products.</p>
                    <Link
                        href="/products"
                        className="inline-block bg-[var(--primary)] text-white px-8 py-3 rounded-full font-bold hover:opacity-90 transition-opacity"
                    >
                        Shop Now
                    </Link>
                </div>

                {/* Related Posts */}
                {relatedBlogs.length > 0 && (
                    <div className="mt-16">
                        <h3 className="text-3xl font-bold mb-8 text-center">Related Articles</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedBlogs.map((relatedBlog) => (
                                <Link href={`/blog/${relatedBlog.slug}`} key={relatedBlog.id} className="group">
                                    <div className="bg-[var(--card-bg)] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col border border-[var(--border)]">
                                        <div className="relative h-48 w-full overflow-hidden">
                                            <Image
                                                src={relatedBlog.image}
                                                alt={relatedBlog.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="p-4 flex-1">
                                            <h4 className="font-bold mb-2 group-hover:text-[var(--primary)] transition-colors line-clamp-2">
                                                {relatedBlog.title}
                                            </h4>
                                            <p className="text-sm opacity-70 line-clamp-2">{relatedBlog.excerpt}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </article>
        </div>
    );
}
