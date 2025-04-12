import slugify from 'slugify';
import prisma from '../lib/prisma.js';

class BlogRepository {
    async createPost(blogDTO) {
        try {
            // Generate slug from title if not provided
            const slug = blogDTO.slug || slugify(blogDTO.title, { 
                lower: true,
                strict: true,
                remove: /[*+~.()"'!:@]/g
            });

            // Check if slug exists
            const existingPost = await prisma.post.findUnique({
                where: { slug }
            });

            // If slug exists, append a timestamp
            const finalSlug = existingPost 
                ? `${slug}-${Date.now()}`
                : slug;

            // Create post with minimal data
            const data = {
                title: blogDTO.title,
                content: blogDTO.content,
                slug: finalSlug,
                categoryId: blogDTO.categoryId ? parseInt(blogDTO.categoryId) : null,
                image: blogDTO.image || 'placeholder.jpg',
                published: blogDTO.published,
                authorId: blogDTO.authorId ? parseInt(blogDTO.authorId) : null
            };

            console.log('Post Data:', data); // Debugging statement

            return await prisma.post.create({
                data,
                include: {
                    author: true,
                    category: true
                }
            });
        } catch (error) {
            console.error('Error creating post:', error);
            throw error;
        }
    }
    async updatePost(id, blogDTO) {
        try {
            const data = {};

            // Update fields if provided
            if (blogDTO.title) data.title = blogDTO.title;
            if (blogDTO.content) data.content = blogDTO.content;
            if (blogDTO.categoryId) data.categoryId = blogDTO.categoryId;
            if (blogDTO.image) data.image = blogDTO.image;
            if (typeof blogDTO.published !== 'undefined') data.published = blogDTO.published;

            // Handle slug update
            if (blogDTO.title) {
                const slug = blogDTO.slug || slugify(blogDTO.title, {
                    lower: true,
                    strict: true,
                    remove: /[*+~.()"'!:@]/g
                });

                // Check if slug exists and is different from current post
                const existingPost = await prisma.post.findFirst({
                    where: {
                        slug,
                        id: { not: parseInt(id) }
                    }
                });

                // If slug exists, append timestamp
                data.slug = existingPost ? `${slug}-${Date.now()}` : slug;
            }

            return await prisma.post.update({
                where: { id: parseInt(id) },
                data,
                include: {
                    author: true,
                    category: true
                }
            });
        } catch (error) {
            console.error('Repository: Error updating post:', error);
            throw error;
        }
    }

    async getPostById(id) {
        if (!id) throw new Error('ID is required to fetch a post');
        
        try {
            const postId = parseInt(id);
            if (isNaN(postId)) throw new Error('Invalid post ID format');

            const post = await prisma.post.findUnique({
                where: { id: postId },
                include: {
                    author: true,
                    category: true
                }
            });

            if (!post) {
                throw new Error('Post not found');
            }

            return post;
        } catch (error) {
            console.error('Error getting post by ID:', error);
            throw error;
        }
    }

    async deletePost(id) {
        if (!id) throw new Error('ID is required to delete a post');
        
        try {
            const postId = parseInt(id);
            if (isNaN(postId)) throw new Error('Invalid post ID format');

            const post = await prisma.post.findUnique({
                where: { id: postId }
            });

            if (!post) {
                throw new Error('Post not found');
            }

            return await prisma.post.delete({
                where: { id: postId }
            });
        } catch (error) {
            console.error('Error deleting post:', error);
            throw error;
        }
    }

    async getPost(slug) {
        if (!slug) throw new Error('Slug is required to fetch a post');

        try {
            console.log('Repository: Fetching post with slug:', slug);
            
            const post = await prisma.post.findUnique({
                where: { slug },
                include: {
                    author: true,
                    category: true
                }
            });

            console.log('Repository: Post found:', post ? 'Yes' : 'No');
            
            if (!post) {
                console.log('Repository: No post found with slug:', slug);
                return null;
            }

            console.log('Repository: Successfully retrieved post:', post.title);
            return post;
        } catch (error) {
            console.error('Repository: Error getting post by slug:', error);
            throw error;
        }
    }

    async getAllPosts() {
        try {
            return await prisma.post.findMany({
                include: {
                    author: true,
                    category: true
                },
                orderBy: {
                    id: 'desc' // Order by id instead of created_at
                }
            });
        } catch (error) {
            console.error('Error getting all posts:', error);
            throw error;
        }
    }

    async getCategories() {
        try {
            return await prisma.category.findMany({
                orderBy: {
                    name: 'asc'
                }
            });
        } catch (error) {
            console.error('Error getting categories:', error);
            throw error;
        }
    }
}

// Create a single instance of the repository
const blogRepository = new BlogRepository();

// Export the instance
export { blogRepository };