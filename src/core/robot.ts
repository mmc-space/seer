// 用于人机对战

import { Elve } from './elves'
import { Player } from './player'
import type { Effect } from './skill'
import { RobatUserId } from '@/data/config'

export class Robot extends Player {
  constructor(elveId: number, effect?: Effect[]) {
    super(RobatUserId)
    const elve = new Elve(elveId)
    this.currentElve = elve
    if (effect) elve.updateAttribute(effect)
  }
}
