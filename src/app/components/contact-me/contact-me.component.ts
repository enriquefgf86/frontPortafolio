import { FormEmail } from './../../models/formEmail.model';
import { PostServicesService } from './../../services/post-services.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-me',
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.css'],
})
export class ContactMeComponent implements OnInit {
  contactForm: FormGroup;
  contactFormCreated = new FormEmail();

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostServicesService
  ) {}

  get name() {
    return this.contactForm.get('fullName').value;
  }

  get email() {
    return this.contactForm.get('email').value;
  }

  get text() {
    return this.contactForm.get('text').value;
  }
  ngOnInit(): void {
    this.initContactForm();
  }

  initContactForm() {
    this.contactForm = this.formBuilder.group({
      fullName: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.compose([Validators.required, Validators.email]),
      ]),
      text: new FormControl('', [Validators.required]),
    });
  }

  setContactForm() {
    this.contactFormCreated.fullName = this.contactForm.get('fullName').value;
    this.contactFormCreated.email = this.contactForm.get('email').value;
    this.contactFormCreated.text = this.contactForm.get('text').value;
  }

  async onSubmit() {
    await this.setContactForm();

    let string = {
      fullName: this.name,
      email: this.email,
      text: this.text,
    };
    this.postService.sendContactFormToMyMail(string).subscribe(
      (response) => {
        // console.log(response);
        location.href = 'https://mailthis.to/confirm';
      },
      (error) => {
        // console.log({ error });
      }
    );
  }
}
