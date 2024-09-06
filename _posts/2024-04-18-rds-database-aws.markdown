---
layout: post
title: "🪞 Move an RDS Database from one AWS account to another"
date: 2024-04-18 20:00:38 -0600
categories: aws, database, rds
---

This article describes how to move a relational Postgres database from one AWS account to another using an EC2 instance and a S3 bucket.

### EC2 instance

You need to create an EC2 instance with access to your RDS database, this using the same VPC and a Security Group that allows you to access it. See the documentation [here](https://docs.aws.amazon.com/AWSEC2/latest/WindowsGuide/tutorial-connect-ec2-instance-to-rds-database.html).

In this case, `pg_dump` ad `pg_restore` are going to be used. It’s recommended to use it with databases from less than 100 GB. See more details [here](https://docs.aws.amazon.com/dms/latest/sbs/chap-manageddatabases.postgresql-rds-postgresql-full-load-pd_dump.html).

To check your database size, run the following command in the Postgres console

```bash
\l+ dbname
```

You can access the console using the next command:

```bash
psql -h db_hostname -p db_port -U db_username
```

### Dump creation

To create the database dump file, run

```bash
pg_dump -h db_hostname -p 5432 -U db_username -d dbname -Fc -b -v -f destination.sql
```

This would create a file `destination.sql` with the database dump.

### S3 Bucket

Create an S3 bucket to upload the dump file. Go to the S3 buckets management console and create one. You need to create a folder inside it where you are going to upload the file.

Once created, run the following command in the EC2 instance in which you have the database dump file to copy the SQL dump file to your S3 bucket. The `s3://uri` is the URL of the folder you created in you S3 bucket.

```bash
aws s3 cp file.sql s3://uri
```

Note that you will need to have the AWS CLI installed and you have to be logged in.

### Restore the database in the destination account

Yo need to make the object public before you can get it in the another account. Go to the S3 bucket where the sump file is stored and under permissions, uncheck **Block _all_ public access** like in the image below and save the changes.

<img src="/images/s3_permissions.png" width=750>


Then, add the following policy to the bucket:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicRead",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
    }
  ]
}
```

Once you have done this, in the new account you can get the database dump using wget. Copy the file URL and run the following command on an EC2 instance with connetion to the new database instance.

```bash
wget object_uri
```

Once you have the file and checks that the file size is the same, you can make the bucket private again (I strongly recommend this).

On the EC2 instance connected to the destination database, now that you have the database dump file copied, you can restore it to the desired database. Use the following command to do it

```bash
pg_restore -v -h db_hostname -U username -d destination_database_name -j 2 dumpfilelocation.sql
```

You will see the process of the restoration during the process, try to not loose the connection to the EC2 instance so you can see when it finished or in case of any error.

Once it finishes, check the data in the new database. Run queries to check that all the data from the source database is in the new database in the source account.

Leave a comment if you feel that I need to explain something else or a specific step with more clarity.
