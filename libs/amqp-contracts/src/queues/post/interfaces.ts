export interface CreatePostRequest {
  /** Заголовок поста */
  title: string;

  /** сообщение поста */
  message: string;

  authorId: string;
}

export interface UpdatePostRequest {
  /** Идентификатор поста */
  id: string;

  /** Заголовок поста */
  title?: string;

  /** сообщение поста */
  message?: string;

  /** Идентификатор автора поста */
  authorId: string;
}

export interface PostResponse {
  /** Идентификатор поста */
  id: string;

  /** Заголовок поста */
  title: string;

  /** Сообщение поста */
  message: string;

  /** Идентификатор автора поста */
  authorId: string;

  /** Дата создания */
  createdAt: string;

  /** Дата обновления */
  updatedAt: string;
}

export interface IdentPostRequest {
  /** Идентификатор поста */
  id: string;
}

export interface SimpleResponse {
  /** Код ответа */
  code: number;

  /** Сообщение о выполнении */
  message: string;
}
