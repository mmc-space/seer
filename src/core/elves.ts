import { Player } from "./player";
import { Skill } from "./skill";

export class Elve {
  /** hp */
  public hp?: number = 0;

  /** 法术强度 */
  public ap?: number = 0;

  /** 攻击力 */
  public ad?: number = 0;

  /** 护甲 */
  public armor?: number = 0;

  /** 魔抗 */
  public magicResistance?: number = 0;

  /** 命中率 */
  public hitRate?: number = 1;

  /** 等级 */
  public level?: number = 1;

  /** name */
  public name?: string;

  /** id */
  public id?: number;

  /** 技能组 */
  public skills?: Skill[] = [];

  /** 被动[魂印] */
  public passive?: Skill[] = [];

  /** buff */
  public buff?: Record<
    keyof Required<
      Pick<Elve, "ap" | "ad" | "armor" | "magicResistance" | "hitRate">
    >,
    number
  >;

  constructor(id: number) {
    this.getElveDetailsById(id);
  }

  /** 获取精灵详情 */
  public getElveDetailsById(id: number) {
    this.hp = 1000;
    this.ad = 100;
    this.ap = 100;
  }

  /**
   * 使用技能
   * @param skillId 技能id
   * @param self 已方
   * @param target 对方
   */
  public useSkill(skillId: number, self: Player, target: Player) {
    const skill = this.skills?.find(({ id }) => id === skillId);
    if (!skill) throw new Error("not found skill");

    skill?.use(self, target);

    return skill;
  }

  /**
   * 更新精灵属性
   */
  public updateAttribute() {}
}
