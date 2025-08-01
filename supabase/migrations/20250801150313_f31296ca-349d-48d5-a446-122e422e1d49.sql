-- Add replicate_prediction_id column to t3d.jobs table for tracking Replicate API predictions
ALTER TABLE t3d.jobs ADD COLUMN IF NOT EXISTS replicate_prediction_id TEXT;