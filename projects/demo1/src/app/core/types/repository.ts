export interface Repository<T extends { id: string | number }, DTO> {

  getAll(): Promise<T[]>;

  getById(id: T['id']): Promise<T>;

  create(item: DTO): Promise<T>;

  update(id: T['id'], item: Partial<DTO>): Promise<T>;

  delete(id: T['id']): Promise<void>;
}
