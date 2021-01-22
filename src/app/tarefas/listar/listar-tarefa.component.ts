import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; 
import { TarefaService, Tarefa } from '../shared';

@Component({
  selector: 'app-listar-tarefa',
  templateUrl: './listar-tarefa.component.html',
  styleUrls: ['./listar-tarefa.component.css']
})

export class ListarTarefaComponent implements OnInit {

  tarefas: Tarefa[];

  constructor(private tarefaService: TarefaService,
  	private route: ActivatedRoute,
  	private router: Router) {}

  ngOnInit() {
    this.tarefas = this.listarTodos();
    if (this.tarefas.length == 0 && !this.tarefaService.getExisteTarefasTeste())
      this.gerarTarefasTeste();
  }

  gerarTarefasTeste(): void {
    this.tarefaService.cadastrar(new Tarefa(1, "Tarefa Teste #1", true));
    this.tarefaService.cadastrar(new Tarefa(2, "Tarefa Teste #2", false));
    this.tarefaService.cadastrar(new Tarefa(3, "Tarefa Teste #3", false));
    this.tarefaService.setExisteTarefasTeste(true);
    this.tarefas = this.listarTodos();    
    this.router.navigate(['/tarefas']);
  }

  listarTodos(): Tarefa[] {
    return this.tarefaService.listarTodos();
  }

  remover($event: any, tarefa: Tarefa): void {
    $event.preventDefault();
    if (confirm('Deseja remover a tarefa "' + tarefa.nome + '"?')) {
      this.tarefaService.remover(tarefa.id);
      this.tarefas = this.tarefaService.listarTodos();
    }
  }

  alterarStatus(tarefa: Tarefa): void {
    if (confirm('Deseja alterar o status da tarefa "' + tarefa.nome + '"?')) {
      this.tarefaService.alterarStatus(tarefa.id);
      this.tarefas = this.tarefaService.listarTodos();
    }
  }

}
