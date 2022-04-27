
#!/bin/bash
#!/bin/sh

clear
echo ""
echo " --- REMOVING OLD DEPENDENCIES ---"
rm -rf node_modules package-lock.json
echo "DONE!"
echo ""
echo " --- INSTALLING AGAIN ---"
npm install
echo "DONE!"
echo ""