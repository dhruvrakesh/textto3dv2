-- Add model selection support to t3d.jobs table
ALTER TABLE t3d.jobs ADD COLUMN selected_model text DEFAULT 'auto';
ALTER TABLE t3d.jobs ADD COLUMN selected_service text DEFAULT 'auto';
ALTER TABLE t3d.jobs ADD COLUMN quality_level text DEFAULT 'standard';
ALTER TABLE t3d.jobs ADD COLUMN meshy_task_id text;