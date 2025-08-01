-- Grant service role access to t3d schema and all tables
GRANT USAGE ON SCHEMA t3d TO service_role;
GRANT ALL ON ALL TABLES IN SCHEMA t3d TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA t3d TO service_role;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA t3d TO service_role;