import express from 'express';
import { body, param, query } from 'express-validator';
import { validateRequest } from '../middleware/validator.js';
import { createPost, getPosts, getPostBySlug, updatePost, deletePost } from '../repositories/blogRepo.js';
import { isAuthenticated, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all posts with pagination
router.get('/', [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 50 }),
  validateRequest
], async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const posts = await getPosts(page, limit);
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

// Get single post by slug
router.get('/:slug', [
  param('slug').isString().trim(),
  validateRequest
], async (req, res, next) => {
  try {
    const post = await getPostBySlug(req.params.slug);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    next(error);
  }
});

// Create new post (protected route)
router.post('/', [
  isAuthenticated,
  body('title').isString().trim().isLength({ min: 1, max: 255 }),
  body('content').isString().trim().isLength({ min: 1 }),
  body('tags').isArray().optional(),
  validateRequest
], async (req, res, next) => {
  try {
    const post = await createPost({
      ...req.body,
      authorId: req.user.id
    });
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
});

// Update post (protected route)
router.put('/:slug', [
  isAuthenticated,
  param('slug').isString().trim(),
  body('title').optional().isString().trim().isLength({ min: 1, max: 255 }),
  body('content').optional().isString().trim().isLength({ min: 1 }),
  body('tags').optional().isArray(),
  validateRequest
], async (req, res, next) => {
  try {
    const post = await updatePost(req.params.slug, req.body, req.user.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    next(error);
  }
});

// Delete post (admin only)
router.delete('/:slug', [
  isAuthenticated,
  isAdmin,
  param('slug').isString().trim(),
  validateRequest
], async (req, res, next) => {
  try {
    await deletePost(req.params.slug);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;