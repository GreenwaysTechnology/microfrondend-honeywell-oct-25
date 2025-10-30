cd remote-app
npm i
docker build -t mfe-remote .
•	Run Remote App container:
bash
docker run -d -p 3001:3001 mfe-remote

•	Build Host App image:
bash
cd host-app
npm i
docker build -t mfe-host .
•	Run Host App container:
bash
docker run -d -p 3000:3000 mfe-host
