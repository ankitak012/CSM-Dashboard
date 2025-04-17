import { Component, Input, Output, EventEmitter, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common'; // Import CommonModule
import { ServerFromService } from '../../api/server-from.service';


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

  
  constructor(private fb: FormBuilder, private apiService: ServerFromService) {
    this.serverForm = this.fb.group({
      server_name: ['', Validators.required],
      server_secret_name: ['', Validators.required],
      server_secret_password: ['',Validators.required],
      emails: this.fb.array([]), // Use FormArray to store emails
    });
  }

  // get emails(): FormArray {
  //   return this.serverForm.get('emails') as FormArray;
  // }

  // Add new email to FormArray
  addEmail() {
    if (this.emailInput.trim() && this.validateEmail(this.emailInput)) {
      this.getEmails.push(this.fb.group({ email: this.emailInput.trim() }));
      this.emailInput = ''; // Clear input field after adding
    }
  }

  // Remove email from FormArray
  removeEmail(email: string) {
    const index = this.getEmails.controls.findIndex(ctrl => ctrl.value.email === email);
    if (index !== -1) {
      this.getEmails.removeAt(index);
    }
  }

  // Validate email format
  validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }
  
  get getEmails(): FormArray {
    return this.serverForm.get('emails') as FormArray; // Get emails as FormArray
  }

  
  submitForm() {
    if (this.serverForm.valid) {

      const formData = {
        ...this.serverForm.value,
        emails: this.getEmails.value.map((email: any, index: number) => ({
          id: index + 1, // Generate IDs (optional, backend should handle real IDs)
          email: email.email
        }))
      };

      console.log('Final JSON Sent to API:', formData);
      console.log('Form Data:', this.serverForm.value);

      this.apiService.addServer(formData).subscribe({
        next: (response: any) => {
          console.log('Server created:', response);
          alert('Server added successfully!');
          this.serverForm.reset();
          this.getEmails.reset(); // Clear emails after submission
        },
        error: (error: any) => {
          console.error('Error creating server:', error);
          alert('Failed to add server.');
        },
      });
    }
  }

  // closeForm() {
  //   this.close.emit();
  // }

  // Close form (you can emit an event if needed)
  closeForm() {
    this.isVisible = false;
  }
  
}
