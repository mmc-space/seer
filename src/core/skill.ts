import { Elve } from "./elves";
import { Player } from "./player";

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

interface Effect {
  /** 目标精灵 */
  targetElves: Elve[];

  /** 影响技能 */
  skill: Skill[];
}

export class Skill {
  /** 技能id */
  public id?: number;

  /** 名称 */
  public name?: string;

  /** 文字描述 */
  public desc?: string;

  /** 需要等级 */
  public needLevel?: number;

  /** 次数 */
  public times?: number;

  /** 伤害 */
  public harm?: number = 0;

  /** 类型 */
  public skillType?: SkillType;

  /** 持续回合 */
  public duration?: number = 0;

  /** 待生效效果 */
  private pendingEffects?: Effect[];

  constructor(id: number) {
    this.id = id;
    this.getSkillDetailById(id);
  }

  public getSkillDetailById(id: number) {
    this.name = "不充钱就是死";
  }

  /** 获取伤害 */
  private getHarm(skill: Skill, self: Player, target: Player) {
    const selfElve = self.currentElve;
    const targetElve = target.currentElve;

    /** 公式：(攻击方的LV×0.4＋2)×技巧威力×攻击方的攻击÷防御方的防御÷50＋2)×本系修正×克制系数×(217-255)÷255 */
    // todo 克制关系
    const harmFormula = (
      selfElveStat: number,
      targetDefense: number,
      skillHarm: number
    ) =>
      ((selfElveStat * 0.4 + 2) * skillHarm * selfElveStat) / targetDefense + 2;

    const skillHandlers: Record<SkillType, () => number> = {
      [SkillType.Attribute]: () => 0,
      [SkillType.AD]: () =>
        harmFormula(selfElve?.ad!, targetElve?.armor!, skill.harm!),
      [SkillType.AP]: () =>
        harmFormula(selfElve?.ap!, targetElve?.magicResistance!, skill.harm!),
      [SkillType.Passive]: () => 0,
    };

    const handler = skillHandlers[skill?.skillType!];
    if (handler) {
      return handler();
    }

    return 0;
  }

  /**
   * 使用技能
   * @param self
   * @param target
   */
  public use(self: Player, target: Player) {
    // 伤害
    const harm = this.getHarm(this, self, target);

    // 更新精灵状态
    self.currentElve?.updateAttribute();
    target.currentElve?.updateAttribute();
  }

  /** 处理待生效状态 */
  public applyPendingEffects() {}
}
