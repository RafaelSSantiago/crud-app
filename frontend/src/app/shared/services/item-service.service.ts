import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Item } from '../models/item';
import { FindAllItemsResponse } from '../models/find-all-items-response.interface';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private apiUrl = 'http://localhost:3000/api/item';
  private uploadUrl = 'http://localhost:3000/api/upload';

  constructor(private http: HttpClient) {}

  private handleError(message: string) {
    return (error: any) => {
      console.error(message, error);
      return throwError(() => new Error(message));
    };
  }

  buscarTodosOsItens(
    page: number = 1,
    limit: number = 10,
    sortBy: string = 'createdAt',
    sortOrder: 'asc' | 'desc' = 'asc'
  ): Observable<FindAllItemsResponse> {
    const params = {
      page: page.toString(),
      limit: limit.toString(),
      sortBy,
      sortOrder,
    };
    return this.http
      .get<FindAllItemsResponse>(`${this.apiUrl}`, { params })
      .pipe(catchError(this.handleError('Erro ao buscar todos os itens')));
  }

  buscarItem(): Observable<Item[]> {
    return this.http
      .get<Item[]>(this.apiUrl)
      .pipe(catchError(this.handleError('Erro ao buscar itens')));
  }

  adicionarItem(item: Item): Observable<Item> {
    return this.http
      .post<Item>(this.apiUrl, item)
      .pipe(catchError(this.handleError('Erro ao adicionar item')));
  }

  atualizarItem(item: Item): Observable<Item> {
    return this.http
      .put<Item>(`${this.apiUrl}/${item._id}`, item)
      .pipe(catchError(this.handleError('Erro ao atualizar item')));
  }

  deletarItem(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError('Erro ao deletar item')));
  }

  buscarItemPorId(id: string): Observable<Item> {
    return this.http
      .get<Item>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError('Erro ao buscar item por ID')));
  }

  uploadPhoto(file: File): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http
      .post<{ url: string }>(this.uploadUrl, formData)
      .pipe(
        catchError(
          this.handleError(
            'Ocorreu um erro ao fazer o upload da foto. Por favor, tente novamente mais tarde.'
          )
        )
      );
  }
}
