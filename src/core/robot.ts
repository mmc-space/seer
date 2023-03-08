// 用于人机对战

import { Elve } from './elves'
import { Player } from './player'
import type { Effect } from './skill'
import { RobatUserId } from '@/constants/config'

export class Robot extends Player {
  constructor(elveIds: number[], effect?: Effect[]) {
    super(RobatUserId)

    const elves = elveIds.map((elveId) => {
      const elve = new Elve(elveId)
      if (effect) elve.updateAttribute(effect)

      return elve
    })

    this.currentElve = elves[0]
    this.elves = elves
  }
}
