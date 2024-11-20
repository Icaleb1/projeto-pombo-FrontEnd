import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruCadastroComponent } from './pru-cadastro.component';

describe('PruCadastroComponent', () => {
  let component: PruCadastroComponent;
  let fixture: ComponentFixture<PruCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PruCadastroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PruCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
