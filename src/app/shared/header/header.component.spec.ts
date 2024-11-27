import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from 'src/app/app.component';

@Component({ selector: 'app-header', template: '' })
class MockHeaderComponent {}

beforeEach(async () => {
  await TestBed.configureTestingModule({
    declarations: [AppComponent, MockHeaderComponent], // Declare the mock component
  }).compileComponents();
});
