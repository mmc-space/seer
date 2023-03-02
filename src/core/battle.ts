import { Elve } from "./elves";
import { Player } from "./player";
import { Skill } from "./skill";

enum GameStatus {
  /** 运行中 */
  running,
  /** 暂停 */
  pause,
  /** 结束 */
  end,
}

export class Battle {
  private player1?: Player;
  private player2?: Player;

  /** 当前玩家 */
  private currentPlayer?: Player;
  /** 等待玩家 */
  private waitPlayer?: Player;
  /** 获胜方 */
  private winner?: Player;
  /** 游戏状态 */
  private gameStatus?: GameStatus;
  /** 当前回合数 */
  private currentRound?: number;

  constructor(player1: Player, player2: Player) {
    this.player1 = player1;
    this.player2 = player2;
    this.gameStatus = GameStatus.running;
    this.currentRound = 0;
    this.currentPlayer = this.randomPriority(player1, player2);
    this.waitPlayer =
      this.currentPlayer === this.player1 ? this.player2! : this.player1!;
  }

  /** 检查玩家的精灵是否全部死亡 */
  private isElvesDead(elves: { hp?: number }[]): boolean {
    return elves.every(({ hp }) => hp === 0);
  }

  /** 检查游戏状态 */
  private checkGameStatus() {
    // 如果 player1 全部死亡，则 player2 胜利，游戏结束
    if (this.isElvesDead(this.player1?.bagElves!)) this.winner = this.player2;
    // 如果 player2 全部死亡，则 player1 胜利，游戏结束
    else if (this.isElvesDead(this.player2?.bagElves!))
      this.winner = this.player1;
    // 如果没有玩家全部死亡，则游戏继续进行
    else return;

    // 设置游戏状态为结束
    this.gameStatus = GameStatus.end;
  }

  /** 随机先手 */
  private randomPriority(player1: Player, player2: Player) {
    return Math.random() > 0.5 ? player1 : player2;
  }

  /** 轮转回合 */
  public takeTurn(skillId: number) {
    /** 回合数+1 */
    this.currentRound! += 1;

    // 释放技能
    const skill = this.currentPlayer?.currentElve?.useSkill(
      skillId,
      this.currentPlayer!,
      this.waitPlayer!
    );

    console.log(
      `当前玩家: ${
        this.currentPlayer === this.player1 ? "player1" : "player2"
      }'`,
      `当前回合数: ${this.currentRound}`,
      `当前精灵: ${this.currentPlayer?.currentElve}`,
      `使用技能: ${skill?.name}`,
      `当前精灵血量: ${this.currentPlayer?.currentElve?.hp}`,
      `对方精灵血量: ${this.waitPlayer?.currentElve?.hp}`
    );

    // 检查状态
    this.checkGameStatus();

    // 切换当前玩家
    this.currentPlayer =
      this.currentPlayer === this.player1 ? this.player2 : this.player1;
  }

  /** 对战开始 */
  // public start() {
  //   console.log("Game started!");

  //   while (this.gameStatus === GameStatus.running) {
  //     this.takeTurn();
  //   }

  //   console.log("Game over!");
  // }
}
