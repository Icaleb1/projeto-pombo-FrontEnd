import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarDenunciasComponent } from './gerenciar-denuncias.component';

describe('GerenciarDenunciasComponent', () => {
  let component: GerenciarDenunciasComponent;
  let fixture: ComponentFixture<GerenciarDenunciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenciarDenunciasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenciarDenunciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
