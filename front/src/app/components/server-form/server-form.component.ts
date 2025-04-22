import { Component, Input, Output, EventEmitter, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common'; // Import CommonModule
import { ServerFromService } from '../../api/server-from.service';
import { response } from 'express';


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

    if (this.serverForm.valid) {
      const formData = this.serverForm.value;
      console.log('Submitted data:', formData);
      this.apiService.addServer(formData).subscribe(response => {
        console.log('Saved!', response)
      })
      // You can emit this data or call a service here
     

      // Reset and optionally close form after submit
      this.serverForm.reset();
      this.closeForm();
    } else {
      this.serverForm.markAllAsTouched();
    }
  }

  closeForm() {
    this.isVisible = false;
    
  }
  
}
