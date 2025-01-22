import { Component } from '@angular/core';
import { Item } from 'src/app/shared/models/item';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ItemService } from 'src/app/shared/services/item-service.service';


@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss'],
})
export class ItemDetailsComponent {
  item!: Item;
  itemForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private itemService: ItemService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      const title = this.route.snapshot.queryParamMap.get('title');
      const description = this.route.snapshot.queryParamMap.get('description');
      const photoUrl = this.route.snapshot.queryParamMap.get('photoUrl');

      if (id && title && description) {
        this.itemForm = this.fb.group({
          _id: [{ value: id, disabled: true }],
          title: [title],
          description: [description],
          photoUrl: [`http://localhost:3000${photoUrl}` || ''],
        });
        console.log('Detalhes do item carregados:', this.itemForm.value);
      }
    });
  }

  onSubmit(): void {
  if (this.itemForm.valid) {
    const updatedItem = this.itemForm.getRawValue();
    this.itemService.atualizarItem(updatedItem).subscribe(
      (response) => {
        console.log('Item atualizado com sucesso:', response);
        // Redirecionar ou mostrar mensagem de sucesso
      },
      (error) => {
        console.error('Erro ao atualizar item:', error);
        // Mostrar mensagem de erro
      }
    );
  }
  }

  voltar(): void {
    this.router.navigate(['/item']);
  }
}
