
interface masterData {
  value: string;
  message: string;
};

export interface Gender extends masterData {
  value: 'm' | 'f' | 'o' | 'n' | '';
  message: 'hombre' | 'mujer' | 'otro' | 'prefiero no decirlo' | '';
};

export const GENDERS: Gender[] = [
  { value: 'm', message: 'hombre' },
  { value: 'f', message: 'mujer' },
  { value: 'o', message: 'otro' },
  { value: 'n', message: 'prefiero no decirlo' },
];

export interface Course extends masterData {
  value: 'a' | 'r' | 'n' | 'h' | 'j' | 't' | '';
  message: 'Angular' | 'React' | 'Node.js' | 'HTML/CSS' | 'JavaScript' | 'TypeScript' | '';
};

export const COURSES: Course[] = [
  { value: 'a', message: 'Angular' },
  { value: 'r', message: 'React' },
  { value: 'n', message: 'Node.js' },
  { value: 'h', message: 'HTML/CSS' },
  { value: 'j', message: 'JavaScript' },
  { value: 't', message: 'TypeScript' },
];


