import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'SignUp';

  registerForm: FormGroup;
submitted = false;
genders=['male','female', 'prefer not to specify'];
consent=['yes', 'no'];
@ViewChild('regForm') myRegForm;
constructor(
 private formBuilder: FormBuilder,
 private toastr: ToastrService,
 private spinner: NgxSpinnerService
) { }
ngOnInit() {
 this.registerForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    mobileNumber: ['', [Validators.required, Validators.pattern("^((\\+27-?)|0)?[0-9]{10}$")]],
    email: ['', [Validators.required,   Validators.pattern(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,63})$/)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    gender: ['', Validators.required],
    consent: ['', Validators.required],
    hobbies:new FormArray([])
 });

 /** spinner starts on init */
 this.spinner.show();
 
 setTimeout(() => {
   /** spinner ends after 3 seconds */
   this.spinner.hide();
 }, 3000);
}
// convenience getter for easy access to form fields, if not used then in html we can use like
// form.get('identity').touched"
get f() { return this.registerForm.controls; }
// onAddHobby(){
//  const control=new FormControl(null,Validators.required);  (<FormArray>this.registerForm.get('hobbies')).push(control);
// }
onSubmit() {
  this.submitted = true;
  // stop here if form is invalid
  if (this.registerForm.invalid) {
   return;
  }
  this.spinner.show();
  setTimeout(() => {
   this.spinner.hide();
 }, 2000);

  console.log(this.registerForm.value);
  this.myRegForm.resetForm();
  this.submitted = false;
  this.toastr.success("Sign Up Successfull");
  // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
 }
}
