#!/bin/bash

export PGPASSWORD='node_password'
echo "Resiting Database..."
dropdb -U node_user playlistdb
createdb -U node_user playlistdb

psql -U node_user playlistdb < ./sql/account.sql 
psql -U node_user playlistdb < ./sql/songs.sql 
psql -U node_user playlistdb < ./sql/user_session.sql

echo "Database configured"