# EmployeeApp
The project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.4.

It is the Angular application for managing employee data. It features a responsive user interface with dynamic data fetching, filtering, and multiple ways to view employee information.

## Key Features

* **Employee List Management:** A searchable and sortable list of employees that can be viewed in either a card or a list format.
* **Reactive Employee Forms:** A reactive form for adding and editing employee data, including managing skills.
* **PrimeNG UI Components:** The user interface is built with PrimeNG components for better user experience.

## Technologies Used

* **Front-end Framework:** Angular (version 20.1.0)
* **UI Components:** PrimeNG (version 20.0.1), PrimeUIX themes, and PrimeIcons
* **Styling:** SCSS, which includes a variable file for consistent styling.
* **Data Management:** RxJS for asynchronous data handling and filtering.
* **Language:** TypeScript (version 5.8.2).
* **Tools:** Angular CLI (version 20.1.4), Node.js (version 22.18.0).

## Notes about the Implementation

* **Reactive Forms:** The application uses Angular's reactive forms for type-safe and scalable form handling, including nested data for employee skills.
* **Modern Control Flow:** Instead of structural directives like `*ngIf` and `*ngFor`, the project uses the new `@if`, `@for`, and `@switch` syntax.
* **Component Communication:** The components use a standard `@Input` and `@Output` pattern to manage data flow between parent and child components.
* **RxJS for Data Handling:** The application uses RxJS to handle asynchronous data operations, including managing data streams and implementing filtering logic on the employee list.
* **SCSS Styling:** The styles are written in SCSS and use variables to ensure a consistent look and feel across the application. The use of media guarantee responsive design.
* **PrimeNG Integration:** PrimeNG components are used to quickly build a feature-rich UI while following the established brand identity.
* **Data Persistence:** The employee list is automatically persisted to the browser's `localStorage` via the `EmployeeService`. This ensures that data is not lost when the user reloads the page or closes the browser.
* **Validation Testing:** Unit tests are included to validate the form.


## Setup Instructions

To get this project running on your local machine, follow these steps:

1.  **Clone the repository.**
2.  **Install dependencies:** Navigate to the project directory and run the following command to install all required packages:

    ```bash
    npm install
    ```

3.  **Start the development server:** Run the following command to start a local development server:

    ```bash
    ng serve
    ```

    Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Building

To build the project for production, run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory.
