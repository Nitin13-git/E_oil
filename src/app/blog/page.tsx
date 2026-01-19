import Link from 'next/link';
import Image from 'next/image';
import { getAllBlogs } from '@/lib/blog';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog | Vedanta Oils',
    description: 'Explore the latest insights, tips, and trends on essential oils, herbal products, and natural wellness from Vedanta Oils.',
};

export default function BlogListingPage() {
    const blogs = getAllBlogs();

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-center mb-4 text-[var(--foreground)]">Vedanta Oils Blog</h1>
            <p className="text-center text-[var(--foreground)] opacity-70 mb-12 max-w-2xl mx-auto">
                Discover the power of nature with our expert guides on essential oils, wellness, and private label manufacturing.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog) => (
                    <Link href={`/blog/${blog.slug}`} key={blog.id} className="group">
                        <div className="bg-[var(--card-bg)] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col border border-[var(--border)]">
                            <div className="relative h-64 w-full overflow-hidden">
                                <Image
                                    src={blog.image}
                                    alt={blog.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex gap-2 mb-3">
                                    {blog.tags.slice(0, 2).map((tag) => (
                                        <span key={tag} className="text-xs font-semibold px-2 py-1 bg-[var(--primary)] text-white rounded-full">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <h2 className="text-xl font-bold mb-3 text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors line-clamp-2">
                                    {blog.title}
                                </h2>
                                <p className="text-[var(--foreground)] opacity-70 mb-4 line-clamp-3 flex-1">
                                    {blog.excerpt}
                                </p>
                                <div className="flex items-center justify-between text-sm text-[var(--foreground)] opacity-50 mt-auto pt-4 border-t border-[var(--border)]">
                                    <span>{blog.date}</span>
                                    <span className="group-hover:translate-x-1 transition-transform">Read More →</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
