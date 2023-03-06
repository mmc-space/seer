import { useEffect, useRef, useState } from 'react'
import { Battle } from '@/core/battle'
import type { Player } from '@/core/player'
import { Robot } from '@/core/robot'

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
    new Battle(player1, player2 ?? new Robot(robotId ?? 31)),
  ).current
  const [loading, setLoading] = useState(false)
  const [round, setRound] = useState(0)

  /** 使用技能 */
  const useSkill = (skillId?: number) => {
    console.log('useSkill')
    setLoading(true)

    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    battle.takeTurn(skillId ?? battle.currentPlayer?.currentElve?.skills[0]?.id!)
    setLoading(false)

    setRound(round => round + 1)
  }

  useEffect(() => {
    console.log(battle, countdown, formattedRes)
    // 更新ui
  }, [round])

  return {
    useSkill,
    loading,
    round,
    ...battle,
  }
}
