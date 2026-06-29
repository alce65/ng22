export interface Contact {
  [index: string]: any;
  id?: number;
  treatment?: string
  name: string;
  surname?: string
  email?: string;
  phone?: string;
  gender?: string
  birth?: string
  avatar?: string
  isConflictive?: boolean
  icon?: string
}


export const DEFAULT_CONTACT: Contact = {
  id: 0,
  // treatment: 'Sr.',
  name: '',
  // surname: '',
  // phone: '',
  // email: '',
  gender: 'M',
  // birth: '',
  // avatar: '',
  isConflictive: false,
  // icon: '',
}
