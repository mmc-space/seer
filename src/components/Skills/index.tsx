import type { FC } from 'react'
import type { Skill } from '@/core/skill'

interface SkillsProps {
  skills: Skill[]
  handleUseSkill: (skill: Skill) => void
}

export const Skills: FC<SkillsProps> = ({ skills, handleUseSkill }) => {
  return (
    <div>
      <ul className="flex">
        {skills.map((skill, index) => (
          <li
            key={`${skill.id}-${index}`}
            className="flex-1"
            onClick={() => handleUseSkill(skill)}
          >
            <p>{skill.skillType}</p>
            <p>{skill.name}</p>
            <p>
              次数{skill.times - skill.usedTimes} / {skill.times}
            </p>
            <p>威力{skill.harm}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
