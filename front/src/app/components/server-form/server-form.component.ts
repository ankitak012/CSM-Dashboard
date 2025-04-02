import { Component, Input, Output, EventEmitter, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common'; // Import CommonModule
import { ServerService } from '../../api/server.service';


@Component({
  selector: 'app-server-form',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './server-form.component.html',
  styleUrl: './server-form.component.css'
})

export class ServerFormComponent {
  @Output() close = new EventEmitter<void>();
  @Input() isVisible: boolean = false;

  serverForm: FormGroup;
  emailInput: string = ''; 

  
  constructor(private fb: FormBuilder, private apiService: ServerService) {
    this.serverForm = this.fb.group({
      server_name: ['', Validators.required],
      server_secret_name: ['', Validators.required],
      server_secret_password: ['',Validators.required],
      emails: this.fb.array([]), // Use FormArray to store emails
    });
  }

  get emails(): FormArray {
    return this.serverForm.get('emails') as FormArray;
  }

  addEmail() {
    const trimmed = this.emailInput.trim();

    if (trimmed && !this.getEmails().value.some((e: any) => e.email === trimmed)) {
      const newId = this.getEmails.length + 1; // Generate a temporary ID (backend will override it)
      this.getEmails().push(this.fb.group({id: newId, email: trimmed })); // Store emails as objects
      console.log('Added Email:', trimmed);
      console.log('Current Emails:', this.getEmails().value);
    }
    this.emailInput = '';
  }

  removeEmail(email: string) {
    const emailArray = this.getEmails();
    const index = emailArray.value.findIndex((e: any) => e.email === email);
    if (index !== -1) {
      emailArray.removeAt(index);
      console.log('Removed Email:', email);
      console.log('Current Emails:', this.getEmails().value);
    }
  }
  
  getEmails() {
    return this.serverForm.get('emails') as FormArray; // Get emails as FormArray
  }

  
  submitForm() {
    if (this.serverForm.valid) {

      const formData = {
        ...this.serverForm.value,
        emails: this.getEmails().value.map((email: any, index: number) => ({
          id: index + 1, // Generate IDs (optional, backend should handle real IDs)
          email: email.email
        }))
      };

      console.log('Final JSON Sent to API:', formData);

      this.apiService.addServer(formData).subscribe({
        next: (response: any) => {
          console.log('Server created:', response);
          alert('Server added successfully!');
          this.serverForm.reset();
          this.getEmails().clear(); // Clear emails after submission
        },
        error: (error: any) => {
          console.error('Error creating server:', error);
          alert('Failed to add server.');
        },
      });
    }
  }

  closeForm() {
    this.close.emit();
  }
}
