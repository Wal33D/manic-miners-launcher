import { z } from 'zod';
import { logger } from './frontendLogger';

// Schema definitions for API responses
export const CommentSchema = z.object({
  id: z.string(),
  author: z.string(),
  date: z.string(),
  text: z.string(),
  avatarUrl: z.string(),
  upvotes: z.number(),
  downvotes: z.number(),
});

export const NewsItemSchema = z.object({
  id: z.number(),
  date: z.string(),
  title: z.string(),
  content: z.string(),
  media: z.string().optional(),
});

export const VideoSchema = z.object({
  id: z.string(),
  url: z.string(),
  name: z.string(),
  description: z.string(),
  internalUrl: z.string(),
  cloudinaryUrl: z.string(),
});

export const VersionSchema = z.object({
  gameId: z.number(),
  title: z.string(),
  displayName: z.string(),
  identifier: z.string(),
  experimental: z.boolean(),
  version: z.string(),
  releaseDate: z.string(),
  filename: z.string(),
  type: z.string(),
  md5Hash: z.string(),
  size: z.string(),
  sizeInBytes: z.number(),
  downloadUrl: z.string(),
  coverImage: z.string(),
  thumbnailUrl: z.string(),
  detailsUrl: z.string(),
  description: z.string(),
  screenshots: z.array(z.string()).optional(),
  changelog: z.string().optional(),
});

// Response schemas
export const CommentsResponseSchema = z.object({
  count: z.number(),
  comments: z.array(CommentSchema),
});

// News response can be either an array or an object with news array
export const NewsResponseSchema = z.union([
  z.array(NewsItemSchema),
  z.object({
    count: z.number(),
    news: z.array(NewsItemSchema),
  }),
]);

export const VideosResponseSchema = z.array(VideoSchema);

export const VersionsResponseSchema = z.object({
  versions: z.array(VersionSchema),
});

/**
 * Validates API response data against a schema
 * Logs validation errors and returns validated data or null
 *
 * @template T
 * @param {unknown} data - Data to validate
 * @param {z.ZodSchema<T>} schema - Zod schema to validate against
 * @param {string} apiName - Name of the API for logging
 * @returns {T | null} Validated data or null if validation fails
 */
export function validateApiResponse<T>(data: unknown, schema: z.ZodSchema<T>, apiName: string): T | null {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      logger.error('API_VALIDATION', `${apiName} response validation failed`, {
        errors: error.errors,
        receivedData: data,
      });
    }
    return null;
  }
}

/**
 * Safe fetch wrapper that validates API responses
 *
 * @template T
 * @param {string} url - URL to fetch
 * @param {z.ZodSchema<T>} schema - Schema to validate response
 * @param {string} apiName - Name of the API for logging
 * @returns {Promise<T | null>} Validated data or null
 */
export async function fetchWithValidation<T>(url: string, schema: z.ZodSchema<T>, apiName: string): Promise<T | null> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      logger.error('API_FETCH', `${apiName} fetch failed`, {
        status: response.status,
        statusText: response.statusText,
      });
      return null;
    }

    const data = await response.json();
    return validateApiResponse(data, schema, apiName);
  } catch (error) {
    logger.error('API_FETCH', `${apiName} request failed`, { error });
    return null;
  }
}
