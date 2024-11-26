import { GroupRepository } from './repository';
import { IGroupService } from './interfaces';
import { createResult } from '@/src/utils/returnFunctions';

export const GroupService: IGroupService = {
    createGroup: async (data): Promise<Result<null>> => {
        try {
            const result = await GroupRepository.createGroup(data);
            if (!result.success) {
                return createResult(false, null, result.message);
            }
            return createResult(result.success, null, result.message);
        } catch (error) {
            console.error("Group Service Error:", error);
            return createResult(false, null, "Grup oluşturulamadı");
        }
    },
    checkGroupPermission: async (groupId: string, clientId: string): Promise<Result<boolean>> => {
        try {
            const isGroupPublic = await GroupRepository.isGroupPublic(groupId);
            if (isGroupPublic.message) {
                return createResult(false, false, isGroupPublic.message);
            }

            if (isGroupPublic.success) {
                return createResult(true, true);
            }

            const result = await GroupRepository.isUserMember(groupId, clientId);
            
            if (result.success) {
                return createResult(true, true);
            }
            return createResult(false, false);
        } catch (error) {
            console.error("Group Service Error:", error);
            return createResult(false, false, "Grup izni sorgulanırken hata oluştu");
        }
    },
    getLimitedGroupById: async (groupId: string): Promise<Result<{
        id: string,
        name: string,
        isPublic: boolean,
        leadersId: { id: string, name: string }[],
        membersCount: number
    } | null>> => {
        try {
            const result = await GroupRepository.getLimitedGroupById(groupId);
            if (!result.success) {
                return createResult(false, null, result.message);
            }
            return createResult(true, result.data);
        } catch (error) {
            console.error("Group Service Error:", error);
            return createResult(false, null, "Grup bilgileri getirilirken hata oluştu");
        }
    },
    getGroupById: async (groupId: string): Promise<Result<{
        groupInfos: {
            id: string;
            name: string;
            isPublic: boolean;
            leadersId: { id: string, name: string }[];
            membersCount: number;
        },
        members: { id: string, name: string }[];
        projects: { id: string, name: string }[];
        //events: { id: string, name: string }[];
    } | null>> => {
        try {
            const result = await GroupRepository.getGroupById(groupId);
            if (!result.success) {
                return createResult(false, null, result.message);
            }
            return createResult(true, result.data);
        } catch (error) {
            console.error("Group Service Error:", error);
            return createResult(false, null, "Grup bilgileri getirilirken hata oluştu");
        }
    }

}