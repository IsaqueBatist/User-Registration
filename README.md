# User Registration

Welcome to the **User Registration** project! This project is based on the "Aprendendo React do Zero, Conectando Back e Front End, e Consumindo API" project, developed by [DevClub | Programação](https://www.youtube.com/@canaldevclub).

---

## Features

- **Home Page**
  - A form where you can add information about the user
  - Includes:
    - Name
    - Email
    - Date of birth
    - Address
      - Street Address
      - City
      - State
      - Postal Code
      - Country
  - List of already registered users
  - Includes:
    - Delete Button
    - Edit Button

---

## User Interactions and Behavior

- Entering the zip code:
  - All inputs related to the address will be filled automatically.
- Submitting the form:
  - A check will be carried out, verifying:
    - Required inputs
    - Valid inputs
    - Valid zip code
    - Valid date
    - Whether the email is available

---

## Technologies Used

- **React**: Front-end framework for building user interfaces.
- **TypeScript**: Typed superset of JavaScript for improved code quality and maintainability.
- **CSS**: Styles for creating an appealing user interface.
- **React Hook Form**: Library for managing form state and validation in React, offering minimal re-renders and improved performance.
- **json-server**: Full fake REST API for prototyping and testing, providing a quick way to simulate server behavior with JSON data.
- **Zod**: TypeScript-first schema validation library, ensuring the correctness of data structures at runtime with strong type inference.
- Additional libraries or tools as needed.

---

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/IsaqueBatist/User-Registration.git
   ```
2. Navigate to the project directory:
   ```bash
   cd user-registration
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000/`.

---

## How to Use

1. Start on the home page.
2. Fill in the inputs with the user's information.
3. Click "Registre" to submit the form.
4. If all inputs are correct, the user will appear under the form.
5. Click the edit button to populate the form with the user's information again.
6. After editing the information, click "Save" to save the changes.
7. If you want to delete the user, click the red icon to remove it from the user list.

---
