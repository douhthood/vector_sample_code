# Installing Oracle Database 23ai

## Introduction
Oracle Database 23ai includes support for Oracle AI Vector Search. These instructions show you how to install Oracle Database 23ai Free. Some trivial vector operations are used to verify that vectors are working on this database instance. 
 
## Oracle Database 23ai Free resource limits:
- 2 CPUs for foreground processes
- 2GB of RAM (SGA and PGA combined)
- 12GB of user data on disk (irrespective of compression factor)

## Prerequisites
- You can use either Oracle Linux 8.8+ or Oracle Linux 9.1+.
  - Oracle Linux 7.x, SuSE Linux and Debian/Ubuntu will not work due to RPM dependencies
- Your Linux VM should have 4+ GB of RAM.
- You will need 20+ GB of disk space
- You will want at least 2 CPU cores

You can install Oracle Database 23ai Free on a VM in your x8664 laptop, in your data center, or in Oracle Cloud compute nodes.

## Download RPMs
You need to download the relevant RPMs.

### For Oracle Linux 8
- oracle-database-preinstall-23ai-1.0-1.4.el8.x86_64.rpm
- oracle-database-ee-23ai-1.0-1.el8.x86_64.rpm

### For Oracle Linux 9
- oracle-database-preinstall-23ai-1.0-1.4.el9.x86_64.rpm
- oracle-database-ee-23ai-1.0-1.el9.x86_64.rpm


