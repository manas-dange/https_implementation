# Node.js HTTPS Server

This repository contains a simple, secure HTTPS server built with Node.js. It's designed to demonstrate key security features and practices, including serving static files, implementing security headers, and logging requests.

-----
<img width="1530" height="446" alt="image" src="https://github.com/user-attachments/assets/cd7059b0-0f5a-4554-afca-48ac664c5d5c" />
Features

  * **Secure HTTPS Connection**: The server uses TLSv1.3 and is configured with a self-signed key and certificate for secure communication.
  * **Static File Serving**: It can serve static files from the `public` directory, such as HTML, CSS, and images.
  * **Security Headers**: The server implements several important security headers to protect against common web vulnerabilities:
      * `Strict-Transport-Security`: Enforces secure connections over HTTPS.
      * `Content-Security-Policy`: Mitigates against cross-site scripting (XSS) attacks.
      * `X-Content-Type-Options`: Prevents the browser from MIME-sniffing a response away from the declared content type.
      * `X-Frame-Options`: Protects against clickjacking.
  * **Request Logging**: All incoming requests are logged to `log.json`, capturing details like timestamp, method, URL, status code, and IP address.
  * **Basic Routing**: The server handles requests for the root URL (`/`) and an about page (`/about`). All other requests return a `404 Not Found` error.

-----

### Getting Started

#### Prerequisites

To run this server, you need to have Node.js installed on your system.

#### Installation

1.  Clone this repository to your local machine:

    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  Install the necessary dependencies:

    ```bash
    npm install
    ```

#### Generating a Self-Signed Certificate

For HTTPS, you'll need a key and certificate. You can generate a self-signed certificate using OpenSSL with the following command:

```bash
openssl req -x509 -newkey rsa:2048 -nodes -sha256 -days 365 -keyout key.pem -out cert.pem
```

This command will create two files, `key.pem` and `cert.pem`, in the root directory. The server uses these files to establish a secure connection.

#### Running the Server

Start the server using the npm script:

```bash
npm start
```

The server will be running at `https://localhost:8443`.

-----

### Endpoints

  * `GET /`: Serves the `index.html` file from the `public` directory.
  * `GET /about`: Returns a plain text response with information about the developer.
  * `GET /any-other-path`: Returns a `404 Not Found` error.

-----

### Project Structure

  * `index.js`: The main server file containing all the logic for routing, serving files, and implementing security headers.
  * `public/`: Directory for serving static files.
      * `index.html`: The main homepage served by the server.
  * `key.pem`: Your generated private key.
  * `cert.pem`: Your generated public certificate.
  * `log.json`: A log file that records all server requests in JSON format.
  * `package.json`: Contains project metadata and scripts.
