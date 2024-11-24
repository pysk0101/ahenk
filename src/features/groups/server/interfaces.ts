import { createGroupSchema } from '../validation';
import { InferType } from "yup";


interface IGroupRepository {
    createGroup: (data: InferType<typeof createGroupSchema>) => Promise<Result<null>>;
    getGroupsByUserId: (userId: string) => Promise<Result<{ name: string, id: string }[] | null[]>>;
    // deleteGroup: (id: string) => Promise<Result<null>>;
    // getGroupById: (id: string) => Promise<Result<null>>
}

interface IGroupService {
    createGroup: (data: InferType<typeof createGroupSchema>) => Promise<Result<null>>;
    getGroupsByUserId: (userId: string) => Promise<Result<{ name: string, id: string }[] | null[]>>;
    // deleteGroup: (id: string) => Promise<Result<null>>;
}

export type {
    IGroupRepository,
    IGroupService
}