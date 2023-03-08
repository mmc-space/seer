import type { Player } from './player'
import type { Effect, SkillTarget } from './skill'
import { Skill } from './skill'

import { MAX_ELVE_LVEVL } from '@/constants/config'

export type ElveID = number

type Buff = Record<
  keyof Required<
    Pick<Elve, 'ap' | 'ad' | 'armor' | 'magicResistance' | 'hitRate'>
  >,
  number
>

// 修改属性
export type Attribute = Partial<Pick<Elve, 'hp'> & Buff>

/** 精灵 */
export class Elve {
  /** hp */
  public hp = 0

  /** 法术强度 */
  public ap = 0

  /** 攻击力 */
  public ad = 0

  /** 护甲 */
  public armor = 0

  /** 魔抗 */
  public magicResistance = 0

  /** 命中率 */
  public hitRate = 1

  /** 等级 1-100 */
  public level = 1

  /** name */
  public name?: string

  /** id */
  public id?: ElveID

  /** 技能栏中的技能 */
  public skills: Skill[] = []

  /** 可以学习的技能列表 */
  public learnableSkills: Skill[] = []

  /** 进化相关 */
  public evolution?: Skill[] = []

  /** 被动[魂印] */
  public passive?: Skill[] = []

  /** 经验值 */
  public exp = 0

  /** 种族值 0-31 */
  public specie = 0

  /** 精灵类型 {低级,高级} */
  public type = 0

  /** 是否可以学习技能 */
  public canLearnSkill = true

  /** buff */
  public buff?: Buff

  constructor(id: ElveID) {
    this.getElveDetailsById(id)
  }

  /** 获取精灵详情 */
  public getElveDetailsById(id: ElveID) {
    this.hp = 1000
    this.ad = 100
    this.ap = 100
    this.armor = 50
    this.magicResistance = 50
    this.id = id
    const skill = new Skill(31)
    this.skills = [skill, skill, skill]
    this.name = '毛虫兽'
  }

  /**
   * 使用技能
   * @param skill 技能
   * @param self 已方玩家
   * @param target 对方玩家
   */
  public useSkill(skill: Skill, self: Player, target: Player) {
    // 技能可能会影响自己的所有精灵或者对方的所有精灵，而且还可能有持续时间，在指定某个回合生效的效果

    // 目标精灵
    const targetCharSet: Record<SkillTarget, Elve[]> = {
      /** 自己 */
      self: [self.currentElve!],
      /** 对方 */
      enemy: [target.currentElve!],
      /** 己方全部 */
      allies: self.elves?.filter(elve => elve !== null) ?? [],
      /** 对方全部 */
      enemies: target.elves?.filter(elve => elve !== null) ?? [],
    }
    const targets: Elve[] = targetCharSet[skill.target]
    skill?.use(self.currentElve!, targets)

    return skill
  }

  /**
   * 更新精灵属性
   */
  public updateAttribute(effect: Effect[]) {
    // 升级、进化、强化、AI自定义属性
    // const { hp } = attribute
    console.log(effect)
  }

  /**
   * 进化精灵
   */
  public evolve() {
    console.log()
  }

  /** 随机生成种族值 */
  public getRandomSpecie() {
    return Math.floor(Math.random() * 32)
  }

  /** 学习新技能 */
  public learnSkill() {
    // 如果不能学习技能 则跳过
    if (!this.canLearnSkill) return

    // 如果当前级别在 learnableSkills 数组中可以学习新技能 则学习
    const newSkill = this.learnableSkills?.find(
      skill => this.level >= skill.needLevel && !skill.isLearned,
    )

    // 判断是否学习了最高等级技能
    const maxLearnLevel
      = this.learnableSkills.at(-1)?.needLevel ?? MAX_ELVE_LVEVL
    if (this.level >= maxLearnLevel) this.canLearnSkill = false

    if (newSkill) newSkill.isLearned = true
  }

  /** 升级
   * @param exp 经验
   */
  public levelUp(exp: number) {
    // 根据传入的经验值计算可以提升多少级
    let levelGain = 0
    while (
      this.exp + exp >= this.getExpNeededForLevel(this.level + levelGain + 1)
      && this.level + levelGain < MAX_ELVE_LVEVL
    )
      levelGain += 1

    for (let i = 0; i < levelGain; i++) {
      this.level += 1

      // 学习技能
      this.learnSkill()

      // 进化
      this.evolve()
    }
  }

  /** 根据前等级计算升到下一级所需的经验值 */
  public getExpNeededForLevel(level: number) {
    return level * 0.78
  }

  /** 增益 */
  public addBuff = () => {

  }

  /** 减益 */
  public addDeBuff = () => {

  }
}
