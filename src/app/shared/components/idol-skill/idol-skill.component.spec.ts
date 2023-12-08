import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdolSkillComponent } from './idol-skill.component';

describe('IdolSkillComponent', () => {
  let component: IdolSkillComponent;
  let fixture: ComponentFixture<IdolSkillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdolSkillComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IdolSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
