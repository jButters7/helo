SELECT 
  p.*, 
  u.username,
  u.password,
  u.profile_pic
FROM posts p
JOIN users u ON p.author_id = u.id;
