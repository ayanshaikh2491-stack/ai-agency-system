# Supabase Storage Structure

## Overview
Organized file storage for client-specific assets using Supabase Storage buckets.

## Bucket Structure
- **product-images**: Main bucket for all product images
- **client-avatars**: (Optional) For client profile images
- **marketing-assets**: (Optional) For promotional materials

## Folder Organization
Within the `product-images` bucket:

```
/client_{id}/
├── products/
│   ├── product_images/
│   │   ├── {timestamp}-{filename}.{ext}
│   │   └── ...
│   └── thumbnails/
│       ├── {timestamp}-{filename}_thumb.{ext}
│       └── ...
├── categories/
│   ├── {category-name}/
│   │   └── ...
│   └── ...
└── temporary/
    └── ... (for upload processing)
```

## Example Paths
- `/client_123/products/1717856400000-tshirt-blue.jpg`
- `/client_123/products/thumbnails/1717856400000-tshirt-blue_thumb.jpg`
- `/client_456/products/1717856500000-hoodie-black.png`

## Access Rules
- **Public Read**: All files in `/client_{id}/products/` are publicly accessible
- **Private Write**: Only authenticated users with proper client_id can upload/delete
- **Size Limits**: Max 10MB per file (configurable)
- **Allowed Types**: jpg, jpeg, png, gif, webp

## URL Format
Publicly accessible files use this URL pattern:
```
https://{project-id}.supabase.co/storage/v1/object/public/product-images/client_{id}/products/{filename}
```

## Implementation Notes
1. Bucket must be set to "Public" for unauthenticated access to product images
2. File uploads should include client_id in the path for organization
3. Consider implementing automatic thumbnail generation
4. Regular cleanup of temporary files recommended
5. CDN caching can be enabled for better performance

## Supabase Storage Setup
To create the bucket via SQL or Supabase dashboard:
```sql
-- This would typically be done through Supabase dashboard
-- or via management API
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'product-images',
  'product-images',
  true,
  10485760, -- 10MB in bytes
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
);
```