# NagerDate

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.2.

## Application's features and architecture.

This application is designed for searching information about holidays in countries. 
You can use the search field to find the country you need. Additionally, the random countries widget allows you to learn about upcoming holidays in those countries.

The application is developed using Angular 18 and it is based on standalone components rather than modules.
The architecture of the application is quite simple and is divided into two components that serve as pages. 
These smart components handle events and data, while dumb components are used for displaying information.
The application could be further divided into even smaller components for displaying each item in the list. However, I did not see the need for this in the current task.

The widget is designed to be reusable throughout the application. It fetches data directly from the service and displays information about random countries and their holidays.

Reusable components are placed in the shared folder.
Another task was to make the country name a link to its holiday page. This has been implemented using a component that redirects the user to the corresponding page.

The country holiday page operates as follows:
1.The user first clicks on the country name.
2.Then, we retrieve the country code from the parameters and use the service to fetch the holiday data.

## Installation

To install the project, run the following command:

`npm install`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
