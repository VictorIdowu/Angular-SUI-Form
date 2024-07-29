import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetCountriesService } from '../get-countries.service';
import { SuccessService } from '../success.service';
import { FormsModule } from '@angular/forms';

export type data = {
  firstName: string;
  lastName: string;
  email: string;
  phone: number | string;
  country: string;
  occupation: string;
  success: boolean;
};

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements OnInit {
  countries: any[] = [];

  inputData: data = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    occupation: '',
    success: true,
  };

  inputsVerified = '';

  verifyInputs(): boolean {
    if (
      this.inputData.firstName === '' ||
      this.inputData.lastName === '' ||
      this.inputData.email === '' ||
      this.inputData.phone === '' ||
      this.inputData.country === '' ||
      this.inputData.occupation === ''
    ) {
      return false;
    } else return true;
  }

  constructor(
    private countryService: GetCountriesService,
    private success: SuccessService
  ) {}

  ngOnInit() {
    this.countryService.getCountries().subscribe({
      next: (data) => {
        const sortedData = data.sort((a, b) => {
          if (a.name.common < b.name.common) {
            return -1;
          }
          if (a.name.common > b.name.common) {
            return 1;
          }
          return 0;
        });
        // console.log(sortedData);
        this.countries = sortedData;
      },
      error: (err) => console.error('Subscription error:', err),
    });
  }

  handleSubmit() {
    // console.log(this.verifyInputs());
    if (!this.verifyInputs()) {
      console.log(this.verifyInputs());

      this.inputsVerified =
        'Submit disabled: Kindly fill all inputs and select options first';
      return;
    }

    console.log(this.inputData);
    this.success.toastNdRout(this.inputData);
  }

  toggleRadio(val: boolean) {
    this.inputData['success'] = val;
  }
}
