import { useBattle } from './useBattle'
import type { Skill } from '@/core/skill'
import { Player } from '@/core/player'
import { BattleLog } from '@/components/BattleLog'
import { Skills } from '@/components/Skills'

const player = new Player(31)

const BattlePage = () => {
  const { round, useSkill, logs } = useBattle(player)

  const handleUseSkill = (skill: Skill) => {
    useSkill(skill)
  }

  return (
    <div>
      <p>当前回合: {round}</p>
      <p>HP: {player.currentElve?.hp}</p>
      {/* logs */}
      <BattleLog logs={logs} />
      {/* skills */}
      <Skills skills={player.currentElve?.skills ?? []} handleUseSkill={handleUseSkill} />
    </div>
  )
}

export default BattlePage
