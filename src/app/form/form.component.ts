import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  basicForm: FormGroup;

  constructor() {
    this.basicForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      birthdate: new FormControl(
        null,
        Validators.required,
        this.birthdateNotInFuture.bind(this)
      ),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]{9}$'),
      ]),
      taxNumber: new FormControl(null, [
        Validators.required,
        this.validateTaxNumber(),
      ]),
    });
  }

  isInvalid(controlName: string): boolean {
    const control = this.basicForm.get(controlName);
    return control.invalid && control.touched;
  }

  birthdateNotInFuture(control: FormControl): Promise<ValidationErrors | null> {
    return new Promise((resolve) => {
      const today = new Date();
      const birthdate = new Date(control.value);

      if (birthdate > today) {
        resolve({ futureBirthdate: true });
      } else {
        resolve(null);
      }
    });
  }

  validateTaxNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: string | undefined = control.value;

      if (!value || typeof value !== 'string' || value.length !== 9) {
        return { invalidTaxNumber: true };
      }

      const sumAux = Array.from({ length: 8 }, (_, i) => 9 - i).reduce(
        (sum, digit, index) => sum + digit * parseInt(value.charAt(index), 10),
        0
      );

      const module = sumAux % 11;
      const NIFwithoutLastDigit = value.slice(0, value.length - 1);

      if (module === 0 || module === 1) {
        return `${NIFwithoutLastDigit}0` === value
          ? null
          : { invalidTaxNumber: true };
      } else {
        return `${NIFwithoutLastDigit}${11 - module}` === value
          ? null
          : { invalidTaxNumber: true };
      }
    };
  }

  onSubmit() {
    if (this.basicForm.invalid) {
      Object.values(this.basicForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    } else {
      this.basicForm.reset();
    }
  }
}
