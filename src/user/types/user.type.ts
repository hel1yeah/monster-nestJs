import { UserEntity } from '@app/user/user.entity';

export type UserType = Omit<UserEntity, 'hashPassword' | 'updateTimestamp'>;
