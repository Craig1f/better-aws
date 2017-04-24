# Better AWS

Helps with a few irritating AWS issues:
1. ec2s are referenced by Instance ID in some places in a way that is not useful, for example when viewing Elastic IPs and trying to remember what you're doing with them. 
2. Same issue when trying to figure out what a VPC or a NAT Gateway is for. 
3. Anything else I can think of

### Set-up
1. Install Tampermonkey for Chrome (http://tampermonkey.net/)
2. Add the scripts included with this package

## Features

[x] - Cache Names of ec2's when visiting the ec2 page
[x] - Abstract the function for caching data in a table so it can be re-used easier
[x] - Cache VPCs
[ ] - Show VPCs on Network Interfaces page
[ ] - Show VPC on NAT Gateway page
[x] - Show ec2's on Network Interfaces page
[ ] - Cache NIC Name or Description
[ ] - Show NIC Name or Description on EIP page
[ ] - Cache Route Table
[ ] - Show Route Table on VPC page
