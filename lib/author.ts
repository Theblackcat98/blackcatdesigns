export interface Author {
  name: string
  bio: string
  avatar?: string
  github?: string
  twitter?: string
  linkedin?: string
  website?: string
}

export const defaultAuthor: Author = {
  name: 'BlackCatDesigns',
  bio: 'Full-stack developer passionate about building beautiful and functional web applications.',
  avatar: '/avatar.png',
  github: 'https://github.com/theblackcat98',
  twitter: 'https://twitter.com/theblackcat98',
}

export function getAuthor(name?: string): Author {
  return defaultAuthor
}
