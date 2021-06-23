import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private monsterHealth = 100;
  private playerHealth = 100;
  private round = 0;

  private randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  onMonsterAttack(): void {
    this.playerHealth -= this.randomNumber(8, 15);
  }

  onPlayerAttack(): void {
    this.monsterHealth -= this.randomNumber(5, 12);
    this.onMonsterAttack();
    this.round++;
  }

  onSpecialAttack(): void {
    if (this.isSpecialAttackAllowed()) {
      this.monsterHealth -= this.randomNumber(10, 25);
      this.onMonsterAttack();
      this.round++;
    }
    return;
  }

  isSpecialAttackAllowed(): boolean {
    return this.round % 3 === 0 ? true : false;
  }

  onPlayerHeal(): void {
    this.playerHealth += this.randomNumber(8, 20);
    this.onMonsterAttack();
    this.round++;
  }

  public getMonsterHealth(): number {
    if(this.monsterHealth <0) return 0
    return this.monsterHealth;
  }

  public getPlayerHealth(): number {
    if(this.playerHealth < 0) return 0
    return this.playerHealth;
  }

  public onReset(): void {
    this.monsterHealth = 100;
    this.playerHealth = 100;
    this.round = 0;
  }

  public getCurrentStatus():number {
    if (this.playerHealth <= 0 && this.monsterHealth <= 0){
      return 0
    }else if(this.playerHealth <= 0){
      return -1
    }else if (this.monsterHealth <= 0){
      return 1
    }else{
      return 2
    }
  }
}
