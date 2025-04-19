export type ID = number;

export interface IUser {
  id: ID;
  first_name: string;
  last_name: string;
  image: string;
  stats: IUserStats;
}

export interface IUserStats {
  current_streak_in_days: number;
  skills: IUserSkills;
  total_sessions_played: number;
}

export interface IUserSkills {
  math: IUserSkillItem;
  reading: IUserSkillItem;
  speaking: IUserSkillItem;
  writing: IUserSkillItem;
}

export interface IUserSkillItem {
  current: number;
  level: string;
  max: number;
}
