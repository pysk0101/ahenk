import { createGroupSchema } from '../validation';
import { InferType } from "yup";


interface IGroupRepository {
    createGroup: (data: InferType<typeof createGroupSchema>) => Promise<Result<null>>;
    isGroupPublic: (groupId: string) => Promise<Result<null>>;
    isUserMember: (groupId: string, clientId: string) => Promise<Result<null>>;
    getLimitedGroupById: (groupId: string) => Promise<Result<{
        id: string;
        name: string;
        isPublic: boolean;
        leadersId: { id: string, name: string }[];
        membersCount: number;
    }| null>>;
    getGroupById: (groupId: string) => Promise<Result<{
        groupInfos:{
            id: string;
            name: string;
            isPublic: boolean;
            leadersId: { id: string, name: string }[];
            membersCount: number;
        },
        members: { id: string, name: string }[];    
        projects: { id: string, name: string }[];
        //events: { id: string, name: string }[];
    }|null>>;
    // deleteGroup: (id: string) => Promise<Result<null>>;
}

interface IGroupService {
    createGroup: (data: InferType<typeof createGroupSchema>) => Promise<Result<null>>;
    checkGroupPermission: (groupId: string, clientId: string) => Promise<Result<boolean>>;
    getLimitedGroupById: (groupId: string) => Promise<Result<{
            id: string;
            name: string;
            isPublic: boolean;
            leadersId: { id: string, name: string }[];
            membersCount: number;
        }| null>>;
    getGroupById: (groupId: string) => Promise<Result<{
        groupInfos:{
            id: string;
            name: string;
            isPublic: boolean;
            leadersId: { id: string, name: string }[];
            membersCount: number;
        },
        members: { id: string, name: string }[];    
        projects: { id: string, name: string }[];
        //events: { id: string, name: string }[];
    }|null>>;
    // deleteGroup: (id: string) => Promise<Result<null>>;
}

export type {
    IGroupRepository,
    IGroupService
}