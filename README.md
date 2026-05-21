# AWS Minecraft Server Host Website

![front-end interface](https://github.com/MenuMinyu/Minecraft_Server_Hosting_Website/blob/main/Front-end.gif)
### This is a web application that allows users to start, stop, and monitor Minecraft servers hosted on AWS EC2 through a Next.js web interface.
---

## Tech Stack:

Front-end: React, Next.js 

Cloud & back-end: AWS API Gateway, Lambda, VPC, EC2, IAM

Infrastructure and scripting: Linux, Bash 

UI libraries: ShadCN, Reactbits.DEV

---

## Demo Website and Video
### Website: https://minecraft-server-hosting-demo-websi.vercel.app/
### Video Demo (Click the image to be redirected)
[![Youtube video](https://i9.ytimg.com/vi/qnZrnn-s13A/mqdefault.jpg?v=6a00bf17&sqp=CPTYvdAG&rs=AOn4CLAnXFMdSAVcWIP_SeLdLj1f2hc9mQ)](https://youtu.be/qnZrnn-s13A)

---
## High Level Architecture Diagram
![Diagram](https://media.licdn.com/dms/image/v2/D4D12AQETWgM_rWbCsQ/article-inline_image-shrink_1500_2232/B4DZ4cYJg0GcAQ-/0/1778592553399?e=1781136000&v=beta&t=xqHloiASel5eZ41xUJjDWL8U6FkUtS8fLT-ovJ_w750)
This is a diagram of the entire flow of the user experience and architecture on a high level. When a user connects to the website, they can see an attractive UI, two buttons “Deploy and Stop” then the status of the server. The website is hosted on Vercel due to its user-friendly interface, support for multiple frameworks, and its automatic CI/CD features that’s all free on the hobby plan. When deploy is clicked, it sends a get request to the API gateway which triggers the “start EC2” lambda function. The lambda then sends a command through the VPC to the EC2 instance to turn on. Once the EC2 turns on a Bash script to start the minecraft server runs shortly after.

Startup takes roughly 30–60 seconds, so the frontend uses a third-party API to display the server’s status. Once the server is online the user can open Minecraft and connect to the server then switch it off when they’re done.

The architecture was designed with simplicity, control, and cost efficiency in mind. Instead of leaving the server running all the time, the system allows the instance to be turned on only when needed and stopped when not in use, saving money. Compared to the average minecraft server subscriptions where you pay a flat fee monthly whether you use the servers or not. As of writing this website has multiple servers attached to it that can easily be managed with this setup.

---
## VPC Architecture Diagram
![VPC Diagram](https://media.licdn.com/dms/image/v2/D4D12AQEFRCpGy_CXbA/article-inline_image-shrink_400_744/B4DZ4cYLGVKwAM-/0/1778592559892?e=1781136000&v=beta&t=0kTXjiKy-FxpF_GX3zb2i0Wp4VrXe4ESfyUJnwAAMH0)

In the VPC the server is kept in a public subnet for Minecraft players to connect to, The default port for Minecraft Java edition is 25565 which is open to anybody in TCP. To securely SSH into the EC2 I only allowed “EC2 instance connect” available from the AWS console to access it. The CIDR range is from Amazon themselves in the EU-West-1 region. Then for the EC2 to receive inbound and make outbound connections to the internet it connects to the internet gateway.

---
## How to run project
1. Copy the project using git or Github Desktop
2. open the terminal then input ```npm install```
3. then ```npm run dev```
4. open localhost:3000 on your browser

---
## Rest of technical breakdown on linkedin
This README is still in progress

the full technical breakdown and story of this project is in a linkedin article 

https://www.linkedin.com/pulse/building-one-click-minecraft-server-hoster-aws-api-gateway-akele-a2x0f/
