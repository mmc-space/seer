import type { Player } from './player'
import type { Skill } from './skill'

/** 对战日志 */
export interface IBattleLog {
  round: number
  target: string
  skillName: string
  desc?: string
}

enum GameStatus {
  /** 运行中 */
  running,
  /** 暂停 */
  pause,
  /** 结束 */
  end,
}

export class Battle {
  private player1?: Player
  private player2?: Player

  /** 当前玩家 */
  public currentPlayer?: Player
  /** 等待玩家 */
  public waitPlayer?: Player
  /** 获胜方 */
  public winner?: Player
  /** 游戏状态 */
  public gameStatus = GameStatus.running
  /** 当前回合数 */
  public currentRound = 0
  /** 日志 */
  public logs: IBattleLog[] = []

  constructor(player1: Player, player2: Player) {
    this.player1 = player1
    this.player2 = player2
    this.currentPlayer = this.randomPriority(player1, player2)
    this.currentRound = 0
    this.waitPlayer
      = this.currentPlayer === this.player1 ? this.player2! : this.player1!
  }

  /** 检查玩家的精灵是否全部死亡 */
  private isElvesDead(elves: { hp?: number }[]): boolean {
    return elves.every(({ hp }) => hp === 0)
  }

  /** 检查游戏状态 */
  private checkGameStatus() {
    // 如果 player1 全部死亡，则 player2 胜利，游戏结束
    if (this.isElvesDead(this.player1?.bagElves ?? [])) this.winner = this.player2
    // 如果 player2 全部死亡，则 player1 胜利，游戏结束
    else if (this.isElvesDead(this.player2?.bagElves ?? []))
      this.winner = this.player1
    // 如果没有玩家全部死亡，则游戏继续进行
    else return

    // 设置游戏状态为结束
    this.gameStatus = GameStatus.end
  }

  /** 随机先手 */
  private randomPriority(player1: Player, player2: Player) {
    return Math.random() > 0.5 ? player1 : player2
  }

  /**
   * 轮转回合
   * @param skill 技能
   */
  public takeTurn = (skill: Skill) => {
    /** 回合数+1 */
    this.currentRound += 1

    // 释放技能
    this.currentPlayer?.currentElve?.useSkill(
      skill,
      this.currentPlayer!,
      this.waitPlayer!,
    )

    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    this.createLog(this.currentPlayer?.currentElve?.name!, skill?.name!, skill!.desc!)

    // 检查状态
    this.checkGameStatus()

    // 切换当前玩家
    const swap = this.currentPlayer
    this.currentPlayer = this.waitPlayer
    this.waitPlayer = swap
  }

  /** 投降 */
  public surrender(player: Player) {
    if (player === this.player1) this.winner = this.player2
    else this.winner = this.player1

    this.gameStatus = GameStatus.end
  }

  /** 生成对战日志 */
  public createLog = (target: string, skillName: string, desc?: string) => {
    this.logs.push({
      round: this.currentRound,
      target,
      skillName,
      desc,
    })
  }
}
