INSERT INTO users
(username, password)
VALUES
($1, $2)
RETURNING username, id, profile_pic;