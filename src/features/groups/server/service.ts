import { GroupRepository } from './repository';
import { IGroupService } from './interfaces';
import { createResult } from '@/src/utils/returnFunctions';

export const GroupService : IGroupService = {
    createGroup: async (data) : Promise<Result<null>> => {
        try {
            const result =  await GroupRepository.createGroup(data);
            if (!result.success) {
                return createResult(false, null, result.message);
            }
            return createResult(result.success, null, result.message);
        } catch (error) {
            console.error("Group Service Error:", error);
            return createResult(false, null, "Grup oluşturulamadı");
        }
    },
    getGroupsByUserId: async (userId: string) : Promise<Result<{name : string, id: string}[]|null[]>> => {
        try {
            const result = await GroupRepository.getGroupsByUserId(userId);
            if (!result.success) {
                return createResult(false, [], result.message);
            }
            return createResult(result.success, result.data, result.message);
        } catch (error) {
            console.error("Group Service Error:", error);
            return createResult(false, [], "Gruplar getirilemedi");
        }
    }
}