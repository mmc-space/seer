import type { Attribute, Elve } from './elves'
import type { Player } from './player'

export type SkillId = number

/** 技能类型 */
export enum SkillType {
  /** 属性 */
  Attribute,
  /** 魔法 */
  AP,
  /** 物理 */
  AD,
  /** 被动[魂印] */
  Passive,
  /** 异常状态 */
}

interface SkillEffect {
  type: 'damage' | 'heal' | 'buff' | 'debuff'
  effectName?: string
}

/** 技能目标 */
export type SkillTarget = 'self' | 'enemy' | 'allies' | 'enemies'

export interface Effect {
  /** 目标玩家 */
  target: Player

  /** 目标精灵 */
  targetElves: Elve[]

  /** 影响技能 */
  effects: Attribute[]
}

export class Skill {
  /** 技能id */
  public id?: SkillId

  /** 名称 */
  public name?: string

  /** 文字描述 */
  public desc?: string

  /** 需要等级 */
  public needLevel = Infinity

  /** 次数 */
  public times = 0

  /** 已使用次数 */
  public usedTimes = 0

  /** 伤害 */
  public harm = 0

  /** 类型 */
  public skillType?: SkillType

  /** 持续回合 */
  public duration?: number = 0

  /** 待生效效果 */
  public pendingEffects: Effect[] = []

  /** 是否已学会 */
  public isLearned = false

  /** 效果 */
  public effect?: SkillEffect

  /** 目标精灵 '自己' | '敌人' | '盟友' | '敌人们' */
  public target: SkillTarget = 'self'

  /** 是否禁用 */
  public disabled = false

  constructor(id: SkillId) {
    this.id = id
    this.getSkillDetailById(id)
  }

  public getSkillDetailById(id: SkillId) {
    this.name = '不充钱就是死'
    this.id = id
    this.harm = 100
    this.skillType = SkillType.AD
    this.desc = '获得了金钱的力量'
    this.times = 5
  }

  /**
   * 获取伤害
   * @param self
   * @param target
   * @returns
   */
  private getHarm = (self: Elve, target: Elve) => {
    /**
     * 计算精灵伤害
     * 公式：(攻击方的LV×0.4＋2)×技巧威力×攻击方的攻击÷防御方的防御÷50＋2)×本系修正×克制系数×(217-255)÷255
     * @param selfElveStat 己方攻击
     * @param targetDefense 对方防御
     * @param skillHarm 技能伤害
     * @returns
     */
    const harmFormula = (
      selfElveStat = 0,
      targetDefense = 0,
      skillHarm: number,
    ) =>
      !targetDefense
        ? 0
        : ((selfElveStat * 0.4 + 2) * skillHarm * selfElveStat)
            / targetDefense
          + 2

    const skillHandlers: Record<SkillType, () => number> = {
      [SkillType.Attribute]: () => 0,
      [SkillType.AD]: () =>
        harmFormula(self?.ad, target?.armor, this.harm),
      [SkillType.AP]: () =>
        harmFormula(self?.ap, target?.magicResistance, this.harm),
      [SkillType.Passive]: () => 0,
    }

    const handler = this?.skillType && skillHandlers[this?.skillType]
    if (handler) return handler()

    return 0
  }

  /**
   * 使用技能
   * @param self
   * @param targets
   */
  public use = (self: Elve, targets: Elve[]) => {
    if (this.disabled) return

    // 对每个目标使用技能
    targets.forEach((target) => {
      // // 更新精灵状态
      const harm = this.getHarm(self, target)

      // todo 更新精灵状态
      // target.updateAttribute(harm)
      console.log(harm)
    })

    // 没有使用次数 禁止
    if (this.times - ++this.usedTimes <= 0) this.disabled = true
  }

  /** 处理待生效状态 */
  public applyPendingEffects() {}
}
