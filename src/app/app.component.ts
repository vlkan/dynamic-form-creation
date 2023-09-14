import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'dynamic-form-creation';

  //For Static
  registerForm!: FormGroup;
  get r(): any { return this.registerForm.controls; }

  //For Dynamic
  formGroupFields?: any
  existSmsProvider?: any
  fields: any[] = [];

  model = [
    {
      PropertyType: 'string',
      DisplayName: 'Method Type',
      PropertyName: 'MethodType',
    },
    {
      PropertyType: 'string',
      DisplayName: 'Api Url',
      PropertyName: 'ApiUrl',
    },
    {
      PropertyType: 'string',
      DisplayName: 'Http Accept',
      PropertyName: 'HttpAccept',
    }
  ] as any;

  ngOnInit(): void {
    setTimeout(() => {
      this.createDynamicForm()
    }, 500);

  }

  //Dinamik form burada oluşturulur. "getFormControlsFields" fonksiyonu db den gelecek
  //modele göre fieldName, DisplayName ve type gibi bilgileri tutar.
  createDynamicForm() {
    this.formGroupFields = this.getFormControlsFields();
    this.registerForm = new FormGroup(this.formGroupFields);
  }

  //Dinamik formun detay bilgileri doldurulur.
  getFormControlsFields() {
    const formGroupFields = {} as any;
    let temp = 0;
    for (const field of Object.keys(this.model[0])) {
      const fieldProps = this.model[temp];
      console.log(this.model[temp]);

      formGroupFields[fieldProps.PropertyName] = new FormControl();
      this.fields.push({ ...fieldProps, fieldName: field });
      temp++;
    }
    console.log(this.fields);

    return formGroupFields;
  }


  //Typical Static Form Creation
  createStaticForm() {
    this.registerForm = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      phone: new FormControl("", [Validators.required]),
      birthday: new FormControl("", [Validators.required]),
    });
  }
}
