export interface User {
  id: number,
  username: string,
  first_name: string,
  date_joined: string,
  dengons: Dengon[],
  posts: Post[]
}

export interface Dengon {
  id: number,
  theme: string,
  created_at: string,
  num: number,
  is_end: boolean,
  is_correct: boolean,
  create_by: number
}

export interface Post {
  id: number,
  post_at: string,
  post_by: number,
  post_to: number,
  image_url: string
}
