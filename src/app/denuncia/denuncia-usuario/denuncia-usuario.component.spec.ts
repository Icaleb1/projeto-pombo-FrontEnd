import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenunciaUsuarioComponent } from './denuncia-usuario.component';

describe('DenunciaUsuarioComponent', () => {
  let component: DenunciaUsuarioComponent;
  let fixture: ComponentFixture<DenunciaUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DenunciaUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DenunciaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
