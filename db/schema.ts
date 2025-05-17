import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  passwordHash: text('passwordHash').notNull().unique(),
  email: text('email').notNull().unique(),
  profileImage: text('profile_image'),
  departement: text('departement').notNull(),
  role: text('role').notNull(),
  isActive: integer('isActive').notNull().default(1),
  storageLimit: integer('storage_limit').notNull().default(1073741824), // 1GB in bytes
  storageUsed: integer('storage_used').notNull().default(0),
  createdAt: text('created_at').default('CURRENT_TIMESTAMP'),
});

export const files = sqliteTable('files', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  type: text('type').notNull(),
  size: integer('size').notNull(),
  path: text('path').notNull(),
  userId: integer('user_id').notNull().references(() => users.id),
  categoryId: integer('category_id').references(() => categories.id),
  isShared: integer('is_shared').notNull().default(0),
  createdAt: text('created_at').default('CURRENT_TIMESTAMP'),
});

export const categories = sqliteTable('categories', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  userId: integer('user_id').notNull().references(() => users.id),
  createdAt: text('created_at').default('CURRENT_TIMESTAMP'),
});

export const sharedFiles = sqliteTable('shared_files', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  fileId: integer('file_id').notNull().references(() => files.id),
  senderId: integer('sender_id').notNull().references(() => users.id),
  receiverId: integer('receiver_id').notNull().references(() => users.id),
  createdAt: text('created_at').default('CURRENT_TIMESTAMP'),
});

export const departmentSharedFiles = sqliteTable('department_shared_files', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  fileId: integer('file_id').notNull().references(() => files.id),
  senderId: integer('sender_id').notNull().references(() => users.id),
  departement: text('departement').notNull(),
  createdAt: text('created_at').default('CURRENT_TIMESTAMP'),
});

export const departementCollaborations = sqliteTable('departement_collaborations', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    sourceDepartement: text('source_departement').notNull(),
    targetDepartement: text('target_departement').notNull(),
  isApproved: integer('is_approved').notNull().default(0),
  createdAt: text('created_at').default('CURRENT_TIMESTAMP'),
});

export const fileTypes = sqliteTable('file_types', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(),
  mimeType: text('mime_type').notNull(),
    createdAt: text('created_at').default('CURRENT_TIMESTAMP'),
  });