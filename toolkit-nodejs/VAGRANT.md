# Vagrant VMs - MongoDB/MySQL

A Vagrant script that you can use to boot a virtual machine with the MongoDB database already installed, complete with example earthquakes data. To use this, you need Vagrant and Virtual Box installed.

Vagrant allows you to create virtual machines that emulate production environments.

You can quickly boot a machine with a database, and this gives you a convenient data source. 

Once Vagrant and Virtual Box are installed, you can change directory, and then boot the virtual machine as follows:

```bash
vagrant up
```

This will run:

```vagrant
# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/trusty64"
  config.vm.network "forwarded_port", guest: 27017, host: 6000
  config.vm.provision "shell", path: "provision.sh"
  config.vm.synced_folder "../", "/code"

end

```

## Building

The virtual machine will take time to prepare. When it completes, you’ll have a MongoDB
database with earthquakes data ready to go. Vagrant has mapped the default MongoDB
port 27017 to port 6000 on our local PC (assuming that port isn’t already in use).

```sh
sudo apt-get update
sudo apt-get upgrade -y

sudo apt-get -y install build-essential

echo "============== Nodejs =================="
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
sudo apt-get update
sudo apt-get install -y --force-yes nodejs

echo "============== Mongodb =================="
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
echo "deb [ arch=amd64 ] http://repo.mongodb.org/apt/ubuntu precise/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.lis
sudo apt-get update
sudo apt-get install -y --force-yes mongodb-org
sudo sed -i 's/bindIp: 127.0.0.1/#bindIp: 127.0.0.1/g' /etc/mongod.conf # Open network interface.
sudo service mongod restart

echo "============== Import example data =================="
cd /vagrant
npm install --no-bin-links
node db-init.js
```

This means we can access the MongoDB database on our local PC at port 6000 as if that’s
where it was running (rather than on the virtual machine where it’s actually running).

Once you’re finished with the MongoDB virtual machine, don’t forget to destroy it
so it doesn’t continue to consume your system resources:

```bash
vagrant destroy
```
