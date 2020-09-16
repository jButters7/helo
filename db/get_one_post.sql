SELECT * 
FROM posts p
JOIN users u ON p.author_id = u.id
WHERE u.id = $1; 