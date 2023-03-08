import { useEffect, useRef, useState } from 'react'
import { Battle } from '@/core/battle'
import type { Player } from '@/core/player'
import { Robot } from '@/core/robot'
import { useStore } from '@/store'
import type { Skill } from '@/core/skill'
/**
 * 对战
 * @param player1
 * @param player2
 */
export const useBattle = (
  player1: Player,
  player2?: Player,
  robotId?: number,
) => {
  const battle = useRef(
    new Battle(player1, player2 ?? new Robot([robotId ?? 31])),
  ).current
  const { userStore } = useStore() ?? {}
  const [loading, setLoading] = useState(false)
  const [round, setRound] = useState(0)
  // const [myTurn, setMyTurn] = useState(false)

  /** 使用技能 */
  const useSkill = (skill: Skill) => {
    if (skill.disabled) return

    setLoading(true)

    battle.takeTurn(skill)
    setLoading(false)

    setRound(round => round + 1)
  }

  useEffect(() => {
    console.log(battle)

    // eslint-disable-next-line no-unused-expressions
    if (battle.currentPlayer?.id === userStore?.user?.id)
      console.log('你的回合')

    // 更新ui
  }, [round])

  return {
    useSkill,
    loading,
    round,
    ...battle,
  }
}
