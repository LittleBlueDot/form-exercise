# Form Exercise 

The exercise consist of 2 parts.

### First part
Build a form using Angular's **ReactiveForms** approach with the following structure:

- Name
- Email
- Birthdate
- Phone
- Tax number
- Submit button

![My image](form-first-part.png)

Every field should use native input elements and are required.

The "Email" field only accepts valid emails.

The "Birthdate" field does not accept dates in the futures.

The "Phone" field only accepts 9 digit numbers.

The "Tax number" field only accepts valid portuguese Individual Identification Number (Número de Identificação Fiscal (NIF) )

When submitting, the fields with invalid values should appear with a red background.

If all fields are valid, the page should refresh.

The exercise uses Bootstrap 5.

### Second part
Build a custom Dropdown component that implements Angular's **ControlValueAccessor** interface.

Add a new field "Country" into the form, which uses the custom Dropdown component.
The "Country" field is required.

**This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.2.**

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
