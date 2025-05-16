import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputFieldComponent } from './input-field.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

describe('InputFieldComponent', () => {
  let fixture: ComponentFixture<InputFieldComponent>;
  let component: InputFieldComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InputFieldComponent, ReactiveFormsModule],
    });
    fixture = TestBed.createComponent(InputFieldComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Email');
    fixture.componentRef.setInput('name', 'email');
    fixture.componentRef.setInput('placeholder', 'Enter your email');
    fixture.componentRef.setInput('control', new FormControl());
    fixture.detectChanges();
  });

  it('should render the label', () => {
    const label = fixture.nativeElement.querySelector('label');
    expect(label.textContent).toContain('Email');
  });

  it('should have a placeholder', () => {
    const input = fixture.nativeElement.querySelector('input');
    expect(input.placeholder).toContain('Enter your email');
  });
});
