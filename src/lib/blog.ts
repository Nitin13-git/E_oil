import blogsData from '@/data/blogs.json';

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string; // HTML content
    author: string;
    date: string;
    image: string;
    tags: string[];
    metaTitle: string;
    metaDescription: string;
}

export function getAllBlogs(): BlogPost[] {
    // Sort by date descending
    return (blogsData as BlogPost[]).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
    return (blogsData as BlogPost[]).find((blog) => blog.slug === slug);
}
