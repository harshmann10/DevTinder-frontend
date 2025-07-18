# DevTinder Frontend

## 🚀 Overview

**DevTinder** is a MERN stack application where developers can create profiles, send connection requests, and connect with each other, similar to a networking platform. This repository contains the frontend for DevTinder.

## 🛠 Tech Stack

- **Frontend:** React.js, Vite, Redux Toolkit, Tailwind CSS
- **State Management:** Redux Toolkit
- **Backend:** [DevTinder backend](https://github.com/harshmann10/DevTinder-backend)
- **Authentication:** JWT
- **Database:** MongoDB (via backend)

## 🏗️ Installation & Setup

1. Clone the repository:

```sh
git clone https://github.com/harshmann10/DevTinder-frontend.git
```

2. Navigate to the project directory:

```sh
cd DevTinder-frontend
```

3. Install dependencies:

```sh
npm install
```

4. Start the development server:

```sh
npm run dev
```

## 📌 Features

- 🏠 **Developer Profiles** - Create and customize your profile.
- 🤝 **Connect with Developers** - Send and accept connection requests.
- 🔒 **Authentication** - Secure login & signup using JWT.
- 👀 **View Profiles** - Browse other developer profiles.
- ✏️ **Edit Profile** - Update personal details, skills, and bio.
- 📩 **Send Connection Requests** - Request to connect with other developers.
- ✅ **Review Connection Requests** - Accept or reject incoming connection requests.
- 🌍 **Responsive Design** - Fully optimized for mobile & desktop.

## 🔧 API Endpoints

The frontend interacts with the backend API hosted in the [DevTinder-backend](https://github.com/harshmann10/DevTinder-backend). Ensure the backend is running before using the frontend.

## 🚀 Deployment

To build and deploy:

```sh
npm  run  build
```

Then, host the `dist/` folder on your preferred hosting service.

### AWS Deployment with EC2 and Nginx

These steps guide you through deploying the frontend on an AWS EC2 instance with Nginx as the web server.

1.  **Launch an EC2 Instance:**

    - Sign in to your [AWS Console](https://aws.amazon.com/console/).
    - Navigate to the EC2 dashboard and click "Launch instances".
    - Choose an Amazon Machine Image (AMI), such as **Ubuntu Server 22.04 LTS**.
    - Select an instance type, like **t2.micro** (which is eligible for the AWS Free Tier).
    - Create a new key pair or use an existing one. Download the `.pem` file and store it securely.
    - In "Network settings", create a security group. Ensure you allow **SSH (port 22)** from your IP address, **HTTP (port 80)** from anywhere, and **HTTPS (port 443)** from anywhere.
    - Launch the instance.

2.  **Connect to your EC2 Instance:**

    - Open a terminal on your local machine.
    - Set the correct permissions for your key file:
      ```sh
      chmod 400 /path/to/your-key.pem
      ```
    - Connect to your instance using SSH (replace `your-ec2-public-ip`):
      ```sh
      ssh -i /path/to/your-key.pem ubuntu@your-ec2-public-ip
      ```

3.  **Install Dependencies on EC2:**

    - Update the package list and install Git and Nginx:
      ```sh
      sudo apt update
      sudo apt install -y git nginx
      ```
    - Install Node.js using Node Version Manager (nvm):
      ```sh
      curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
      export NVM_DIR="$HOME/.nvm"
      [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
      nvm install 22
      ```

4.  **Clone and Build the Project:**

    - Clone the repository:
      ```sh
      git clone https://github.com/harshmann10/DevTinder-frontend.git
      ```
    - Navigate into the project directory:
      ```sh
      cd DevTinder-frontend
      ```
    - Install project dependencies:
      ```sh
      npm install
      ```
    - Create a `.env` file from the sample and add your backend API URL:
      ```sh
      nano .env
      ```
    - Build the application for production:
      ```sh
      npm run build
      ```

5.  **Configure and Start Nginx:**

    - Copy the built files to the Nginx web root directory:
      ```sh
      sudo cp -r dist/* /var/www/html/
      ```
    - Create an Nginx server block to handle client-side routing. This ensures refreshing a page on a route like `/profile` doesn't result in a 404 error.
      ```sh
      sudo nano /etc/nginx/sites-available/default
      ```
    - Replace the file's content with the following:

      ```nginx
      server {
          listen 80 default_server;
          listen [::]:80 default_server;

          root /var/www/html;
          index index.html index.htm;

          location / {
              try_files $uri $uri/ /index.html;
          }
      }
      ```

    - Test the Nginx configuration and restart the service:
      ```sh
      sudo nginx -t
      sudo systemctl restart nginx
      ```
    - You can now access your application via your EC2 instance's public IP address.

## 📜 License

This project is open-source and available under the MIT License.

## 🤝 Contribution

Contributions are welcome! Feel free to fork the repo and submit a pull request.