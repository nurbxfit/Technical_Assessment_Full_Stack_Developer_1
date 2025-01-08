#!/bin/bash

# Pull MySQL image
docker pull mysql

# Run the container
docker run --name arkmysql-db -e MYSQL_ROOT_PASSWORD=password123 -p 3306:3306 -d mysql

# Wait for the database to be ready
echo "Waiting for MySQL to be ready..."
until docker logs arkmysql-db 2>&1 | grep -q "ready for connections"; do
    sleep 1
done

echo "MySQL database started and ready for connections on port 3306"

# Copy the items.sql file into the container
docker cp ./items.sql arkmysql-db:/items.sql

# Execute the SQL file inside the container
docker exec -i arkmysql-db mysql -u root -password123 -e "source ./items.sql"

echo "SQL script executed successfully"
