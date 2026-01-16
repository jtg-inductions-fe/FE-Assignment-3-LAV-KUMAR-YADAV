# FE-Assignment-3-LAV-KUMAR-YADAV

## React Base Shad CN Template

## Getting Started

### Prerequisites

- **Node.js**: Version 20+. You can download and install it from nodejs.org.

### Installing

To set up the project on your local environment, follow these steps:

1. **Clone the Repository**

    First, you need to clone the repository.

2. **nvm (Node Version Manager)**: If the required Node version 20+ is already installed and active, you can skip this step else you can use nvm (Node Version Manager). Here's how to use it:
    - **Switch Node Version**: If the required Node version is already installed, run:

    ```bash
    nvm use
    ```

    - **Install Node Version**: If the required Node version isn’t installed, you can install it by running:

    ```bash
    nvm install
    ```

    > **_Tip:_** If you don't have nvm installed, you can install it by following the instructions on [nvm-sh/nvm](https://github.com/nvm-sh/nvm).

    Alternatively, you can update Node.js directly by downloading the latest version from the official website: nodejs.org.

3. **Install the necessary dependencies using yarn**

    ```bash
    npm install
    ```

4. **Run the Development Server**

    ```bash
    npm run dev
    ```

    The app will typically be available at http://localhost:3000, but check the terminal output for the exact URL.

    > **_NOTE:_** : If you want to change the server's port number, you can do so by creating a **.env file** at the root level of the project and update the PORT field (check **.env.template** for reference)

    ```env
    PORT=<New Port>
    ```

5. **Format the Code**

    ```bash
    npm run prettier:fix
    ```

6. **Lint the Code**

    ```bash
    npm run lint
    ```

7. **To Fix Lint errors**

    ```bash
    npm run lint:fix
    ```

8. **Build the Project**

    ```bash
    npm run build
    ```

    This command will generate the optimized production build in the dist directory.

9. **Preview the build**

    ```bash
    npm run  preview
    ```

10. **Setup Husky (If pre-commit hooks are not working)**

    ```bash
    npm run prepare
    ```
