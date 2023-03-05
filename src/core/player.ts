import type { Elve } from './elves'

export class Player {
  public id?: number

  public name?: string

  /** 拥有精灵 */
  public elves?: Elve[]

  /** 背包精灵 */
  public bagElves?: Elve[]

  /** 装备 */
  // equipment: any;

  /** 道具 */
  // props: any[]

  /** 当前精灵 */
  public currentElve?: Elve

  constructor(id: number) {
    this.id = id
  }
}
