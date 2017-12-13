import { Component, OnInit, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { Classe } from '../classe';
import { ClasseService } from '../classe.service';

import { Observable } from 'rxjs/Observable';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'app-classe-list',
  templateUrl: './classe-list.component.html',
  styleUrls: ['./classe-list.component.css']
})
export class ClasseListComponent implements OnInit {
  section_name = 'Classes';

  classes: Observable<Classe[]>;
  classe: Classe = {
    classeName: '',
    displayName: '',
    section: 'A'
  };

  addSaveNtn = 'Add';
  searchWord;

  constructor(private classeService: ClasseService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.classes = this.classeService.getclasses();
  }

  deleteClasse(classe) {
    this.confirmationService.confirm({
      message: 'Are you sure?',
      accept: () => {
        this.classeService.deleteclasse(classe);
        if (classe.id === this.classe.id) {
          this.classeReset();
        }
      }
    });
  }

  editClasse(classe) {
    this.classe = classe;
    this.addSaveNtn = 'Save';
  }

  addUpdateClasse(classe) {
    if (classe.classeName !== '' && classe.section !== '') {
      if (classe.id !== undefined) {
        classe.displayName = classe.classeName + ' ' + classe.section;
        this.classeService.updateclasse(classe);
      } else {
        classe.displayName = classe.classeName + ' ' + classe.section;
        this.classeService.addclasse(classe);
      }
      this.classeReset();
    }

    // console.log(classe);
  }

  search() {
    if (this.searchWord !== '') {
      this.classes = this.classeService.searchClasses(this.searchWord);
    }
  }


  classeReset() {
    this.classe = {
      classeName: '',
      displayName: '',
      section: 'A'
    };
    this.addSaveNtn = 'Add';
  }

}
