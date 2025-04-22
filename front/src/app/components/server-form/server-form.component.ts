import { Component, Input, Output, EventEmitter, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common'; // Import CommonModule
import { ServerFromService } from '../../api/server-from.service';
import { response } from 'express';
import { error } from 'console';


@Component({
  selector: 'app-server-form',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './server-form.component.html',
  styleUrl: './server-form.component.css'
})

export class ServerFormComponent {
  @Input() isVisible: boolean = false;
  
  @Output() close = new EventEmitter<void>();

  
  serverForm: FormGroup;
  emailInput: string = '';
  emails: string[] = []; 
  
    
  constructor(private fb: FormBuilder, private apiService: ServerFromService) {
    this.serverForm = this.fb.group({
      server_name: ['', Validators.required],
      server_secret_name: ['', Validators.required],
      server_secret_password: ['',Validators.required],
      emails: [[], Validators.required],
      
    });
  }

  emailListValidator(control: any) {
    const emails = control.value?.split(/[,;]+/).map((e: string) => e.trim()).filter((e: string) => e);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emails || emails.length === 0) return { required: true };
    for (let email of emails) {
      if (!emailRegex.test(email)) {
        return { invalidEmail: true };
      }
    }
    return null;
  }

  

  onSubmit() {
    const formData = this.serverForm.value;
    const rawEmails = formData.emails;

    const emailList = rawEmails
      .split(/[;,]+/)
      .map((e: string) => e.trim())
      .filter((e: string) => e);

    // Check for duplicates
    const hasDuplicates = new Set(emailList).size !== emailList.length;

    if (hasDuplicates) {
      this.serverForm.get('emails')?.setErrors({ duplicate: true });
      return;
    }

    if (this.serverForm.valid) {
      console.log('Submitted data:', formData);
      this.apiService.addServer(formData).subscribe({
        next: response => {
          console.log('Saved!', response);
          this.serverForm.reset();
          this.closeForm();
        }, 
      error: error => {
        console.log('Backend error:', error)

        // Show error on the email field if duplicate
        if (error.error && error.error.emails) {
          const emailError = Array.isArray(error.error.emails) ? error.error.emails.join(' ') : error.error.emails;
          this.serverForm.get('emails')?.setErrors({ backend: emailError });
        } else if (error.error && error.error.non_field_errors) {
          const generalError = error.error.non_field_errors.join(' ');
          this.serverForm.get('emails')?.setErrors({ backend: generalError });
        }
      }
    });
    } else {
      this.serverForm.markAllAsTouched();
    }
  }

  closeForm() {
    this.isVisible = false;
    
  }
  
}
