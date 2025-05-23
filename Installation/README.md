# Installing Oracle Database 23ai

## Introduction
Oracle Database 23ai **includes support for Oracle AI Vector Search**. These instructions show you how to install **Oracle Database 23ai Free**. Some trivial vector operations are used to verify that vectors are working on this database instance. 
 

## Oracle Database 23ai Free resource limits:
- 2 CPUs for foreground processes
- 2GB of RAM (SGA and PGA combined)
- 12GB of user data on disk (irrespective of compression factor)


## Prerequisites
- You can use either **Oracle Linux 8.8+** or **Oracle Linux 9.1+**.
  - Oracle Linux 7.x, SuSE Linux and Debian/Ubuntu **will not work** due to RPM dependencies
- Your Linux VM should have 4+ GB of RAM.
- You will need 20+ GB of disk space
- You will want at least 2 CPU cores

You can install Oracle Database 23ai Free on a VM in your x8664 laptop, in your data center, or in Oracle Cloud compute nodes.


## Download RPMs
You need to download the relevant RPMs.

### For Oracle Linux 8
- [oracle-database-preinstall-23ai-1.0-1.4.el8.x86_64.rpm](https://yum.oracle.com/repo/OracleLinux/OL8/appstream/x86_64/getPackage/oracle-database-preinstall-23ai-1.0-2.el8.x86_64.rpm) 
- [oracle-database-free-23ai-23.8-1.el8.x86_64.rpm](https://download.oracle.com/otn-pub/otn_software/db-free/oracle-database-free-23ai-23.8-1.el8.x86_64.rpm)

### For Oracle Linux 9
- [oracle-database-preinstall-23ai-1.0-1.4.el9.x86_64.rpm](https://yum.oracle.com/repo/OracleLinux/OL9/appstream/x86_64/getPackage/oracle-database-preinstall-23ai-1.0-2.el9.x86_64.rpm)
- [oracle-database-free-23ai-23.8-1.el9.x86_64.rpm](https://download.oracle.com/otn-pub/otn_software/db-free/oracle-database-free-23ai-23.8-1.el9.x86_64.rpm)


## Install RPMs
You need to use the el8 RPMs on Oracle Linux 8, and the el9 RPMs on Oracle Linux 9, else it will not work.

This install is using Oracle Linux 8.9 and is using the corresponding el8 RPMs:


As a Linux user who has the sudo privilege install the pre-install RPM:

`sudo dnf install -y oracle-database-preinstall*` 


As a Linux user who has the sudo privilege install the database-free-23ai RPM:

`sudo dnf install -y oracle-database-free*` 


## Configure Instance
As a Linux user who has the sudo privilege, configure the instance:

`sudo /etc/init.d/oracle-free-23ai configure` 


## Change to the oracle User
A side effect of installing the Oracle database was creating an oracle user on Linux.
Change to the oracle user.

`sudo su`  
`su – oracle`

Set the environment for the oracle user.

`export ORACLE_SID=FREE`  
`export ORAENV_ASK=NO`  
`. /opt/oracle/product/23ai/dbhomeFree/bin/oraenv` 



## Create DB user
Connect to the default Oracle 23ai PDB service and create a database user.

`sqlplus sys@localhost:1521/freepdb1 as sysdba`  

`create user vector identified by vector`  
`default tablespace users`   
`quota unlimited on users;`

`grant DB_DEVELOPER_ROLE to vector;`

`exit;`

## <a name="VECTOR_MEMORY_SIZE"></a> Allocate memory for VECTOR_MEMORY_SIZE
Connect to the Container Database as /, allocate memory to vector pool and bounce the database.

`sqlplus / as sysdba`  

`create pfile from spfile;`  
`ALTER SYSTEM SET vector_memory_size = 500M SCOPE=SPFILE;`   
`shutdown`  
`startup`  
`show parameter vector_memory_size;`  
`alter pluggable database all open;`  
`exit;`  

### Why you need to size VECTOR_MEMORY_SIZE correctly
- Both the HNSW and IVFFlat use memory from the vector pool.
- HNSW vector indexes must fit entirely within the memory allocated by VECTOR_MEMORY_SIZE.
- You must allocate some memory for VECTOR_MEMORY_SIZE to be able to use HNSW vector indexes.
- IVFFlat indexes use memory from by VECTOR_MEMORY_SIZE for metadata.
- Sizing the VECTOR_MEMORY_SIZE parameter is covered here


## Configure Oracle Net
Create a PDB service (freepdb1) in tnsnames.ora using your favorite editor, for example:

`vi $ORACLE_HOME/network/admin/tnsnames.ora`   


`freepdb1 =`  
`  (DESCRIPTION =`  
`    (ADDRESS = (PROTOCOL = TCP)(HOST = Your_23ai_hostname_or_IP_Address)(PORT = 1521))`  
`    (CONNECT_DATA =`  
`      (SERVER = DEDICATED)`  
`      (SERVICE_NAME = freepdb1)`  
`    )`  
`)`


## Connect with SqlPlus
You should now be able to connect to your 23ai database service via either:

`sqlplus vector/vector@localhost:1521/freepdb1`   
or  
`sqlplus vector/vector@freepdb1` 


## Create some vectors
Now you can create a table with vectors.

`sqlplus vector/vector@freepdb1`   
`create table t1 (v vector);`  
`desc t1;`  
`insert into t1 values ('[1.1, 2.2, 3.1415]');`  
`select * from t1;`  
`update t1 set v = '[42.69]';`  
`drop table t1;`





