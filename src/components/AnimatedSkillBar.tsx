import { useEffect, useMemo, useState } from 'react';
import './AnimatedSkillBar.css';
import { IUserSkillItem } from '../data/types/user';

const SKILL_COLORS: Record<string, string> = {
  math: '#24963c',
  reading: '#ff87a2',
  speaking: '#803b00',
  writing: '#0793a4',
};

interface Props {
  title: string;
  state: IUserSkillItem;
}
export function AnimatedSkillBar({ title, state }: Props) {
  const [filled, setFilled] = useState(0);

  const target = useMemo(() => {
    return (state.current / state.max) * 100;
  }, [state]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    if (filled < target) {
      timeoutId = setTimeout(() => {
        setFilled((prev) => (prev += 5));
      }, 10);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [filled, target]);

  const getBackgroundColor = () => {
    if (SKILL_COLORS[title]) return SKILL_COLORS[title];
    return 'white;';
  };

  return (
    <div className="skill-bar">
      <div
        className="animated"
        style={{
          width: `${filled}%`,
          backgroundColor: getBackgroundColor(),
        }}
      >
        <span className="title">{`${title[0].toUpperCase()}${title.slice(1)}`}</span>
      </div>
    </div>
  );
}
