#!/bin/bash

export PGPASSWORD='node_password'
echo "Connecting to Database..."

psql -U node_user playlistdb 

echo "Database desconnected"