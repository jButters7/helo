SELECT * 
FROM posts p
JOIN users u ON p.author_id = u.id
WHERE author_id != $1 
AND title ilike $2;
