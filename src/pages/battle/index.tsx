import { useBattle } from './useBattle'
import { Skill } from '@/core/skill'
import { Player } from '@/core/player'

const skill = new Skill(31)
const player = new Player(31)
const MockSkills = [skill, skill, skill, skill]

const BattlePage = () => {
  const { round, useSkill, logs } = useBattle(player)

  const handleUseSkill = (skillId: number) => {
    useSkill(skillId)
  }

  return (
    <div>
      <p>当前回合: {round}</p>
      <p>HP: {player.currentElve?.hp}</p>
      {/* logs */}
      <ul>
        {
          logs.map((log, index) => <li key={index}>{log}</li>)
        }
      </ul>
      {/* skills */}
      <ul className="flex">
        {
          MockSkills.map((skill, index) => (
            <li key={`${skill.id}-${index}`} className="flex-1" onClick={() => handleUseSkill(skill.id!)}>
              <p>{skill.skillType}</p>
              <p>{skill.name}</p>
              <p>次数{skill.usedTimes} / {skill.times}</p>
              <p>威力{skill.harm}</p>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default BattlePage
