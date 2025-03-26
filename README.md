# ALU-CURRENCY_CONVERTER
# Currency Converter Application

This project is a Currency Converter web application that allows users to convert between different currencies using live exchange rates fetched from an external API. The app allows users to select currencies, input an amount, and receive the converted amount instantly. Additionally, the app includes features for searching, sorting currencies, and dynamically updating the list of available currencies.

## Features

- **Currency Conversion**: Convert between different currencies using live exchange rate data.
- **Currency Search**: Search for currencies by name or code.
- **Currency Sorting**: Sort the list of available currencies alphabetically.
- **Responsive Design**: The app is designed to be mobile-friendly and looks good on all screen sizes.
- **User-Friendly Interface**: Simple and intuitive interface with clear instructions for use.

## Technologies Used

- **HTML**: Structure of the web application.
- **CSS**: Styling and layout.
- **JavaScript**: Handles functionality such as fetching data from the API, performing currency conversion, and updating the UI.
- **API**: [ExchangeRate API](https://www.exchangerate-api.com/) (used for live currency rates).

## How to Run Locally

### Prerequisites

Before you can run the project locally, you’ll need the following installed on your machine:

- A modern web browser (Chrome, Firefox, etc.)
- A text editor (VS Code, Sublime Text, etc.)

### Steps to Run the Project Locally

1. **Clone the repository**:
   Open your terminal and run the following command to clone the repository:
   
   ```bash
   git clone https://github.com/Angel-ingabire/ALU-CURRENCY_CONVERTER.git
   # API and Resource Attribution

This project utilizes the following resources:

### 1. **ExchangeRate API**:
   - **Provider**: [ExchangeRate-API](https://www.exchangerate-api.com/)
   - **Purpose**: This API is used to fetch live exchange rates for currency conversion. It provides up-to-date and accurate exchange rates for various currencies.
   - **Usage**: The API is used in the `script.js` file to fetch the exchange rates for conversion.

   You can find more about the API here: [https://www.exchangerate-api.com/](https://www.exchangerate-api.com/).
Deployment Instructions
This project has been deployed across two web servers and a load balancer to ensure high availability and scalability.

Web Server Setup (web-01 & web-02)
sudo git clone https://github.com/Angel-ingabire/ALU-CURRENCY_CONVERTER.git /var/www/html/myapp
Set File Permissions:
sudo chown -R www-data:www-data /var/www/html/myapp
sudo chmod -R 755 /var/www/html/myapp
Create a configuration file at /etc/nginx/sites-available/myapp with the following;
server {
    listen 80;
    server_name 54.175.182.240;

    root /var/www/html/myapp;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
Enable the configuration:


Copy
Edit
sudo ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo systemctl restart nginx
Load Balancer Setup (lb-01)
sudo apt update && sudo apt install nginx -y

Create Load Balancer Configuration:
upstream backend_servers {
    server 44.210.130.80;  # web-01 IP
    server 44.210.130.81;  # web-02 IP
}

server {
    listen 80;
    server_name 44.201.211.3;  # Load balancer IP or your domain name

    location / {
        proxy_pass http://backend_servers;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
Enable and Restart:


Copy
Edit
sudo ln -s /etc/nginx/sites-available/loadbalancer /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
Test the Load Balancer:

Visit http://44.201.211.3 in a browser and verify that traffic is being distributed between the two web servers.

Error Handling & Troubleshooting
The application includes error handling to manage issues such as API downtime or invalid responses.

User Feedback: Users will see a clear error message if the API call fails.
Usage Example


CURRENCY CONVERSIN:

Select the base and target currencies.

Enter the amount to convert.

View the converted result instantly.

Search and Sort:

Use the search feature to find currencies by name or code.

Click on sort options to order the list alphabetically.

Demo Video
Watch the demo video that showcases the application running locally and on the deployed servers with the load balancer:



