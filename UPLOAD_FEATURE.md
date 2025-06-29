# Image Upload Feature

## Overview

The admin dashboard now supports direct image uploads instead of URL inputs. Admins can upload images directly from their mobile or desktop devices, and the images are stored locally on the server.

## Features

### ✅ What's Changed

- **Removed URL input fields** from all admin forms
- **Added file upload functionality** with drag-and-drop support
- **Local storage** - Images are stored in `/public/uploads/` directory
- **File validation** - Only image files (JPEG, PNG, WebP, GIF) up to 5MB are allowed
- **Unique filenames** - Prevents conflicts with timestamp + random string
- **Preview functionality** - Shows uploaded images immediately
- **Error handling** - Clear error messages for invalid files

### 📁 Upload Locations

- **Blog Posts**: Card Image, Hero Image, Author Image
- **Projects**: Main Image, Cover Image, Gallery Images (multiple)
- **Testimonials**: Client Image
- **Services**: No images (uses icons only)

### 🔧 Technical Details

#### API Endpoint

- **POST** `/api/upload`
- Accepts multipart form data
- Returns JSON with file path and success status

#### File Storage

- **Directory**: `public/uploads/`
- **Filename format**: `{timestamp}_{randomString}.{extension}`
- **Example**: `1704067200000_a1b2c3d4.jpg`

#### File Validation

- **Allowed types**: JPEG, JPG, PNG, WebP, GIF
- **Max size**: 5MB
- **Security**: Server-side validation

### 🎯 Benefits

1. **No domain configuration needed** - Images are served locally
2. **Better user experience** - Direct upload from device
3. **Mobile-friendly** - Works on phones and tablets
4. **Secure** - File type and size validation
5. **Organized** - All uploads in one directory
6. **Version control friendly** - Uploads directory is gitignored

### 🚀 Usage

1. Navigate to any admin section (Blog Posts, Projects, Testimonials)
2. Click "Add New" or "Edit" for an existing item
3. Click the upload area or drag an image file
4. Select an image from your device
5. The image will upload automatically and show a preview
6. Save the form to use the uploaded image

### 📝 Notes

- Uploaded images are stored permanently until manually deleted
- The uploads directory is excluded from git to avoid committing large files
- Images are served statically by Next.js from the public directory
- File paths are stored in the database as relative paths (e.g., `/uploads/filename.jpg`)
