import { NextRequest, NextResponse } from 'next/server';
import { createResult } from '@/src/utils/returnFunctions';
import { createGroupSchema } from '@/src/features/groups/validation';
import { GroupService } from '@/src/features/groups/server/service';
export const GroupController = {
    createGroup: async (req: NextRequest): Promise<ResultResponse<null>> => {
        try {
            const leaderId = req.headers.get('x-user-id');
            if (!leaderId) {
                return NextResponse.json(createResult(false, null, "Yetkilendirilmemiş işlem"), { status: 401 });
            }
            const { name, isPublic } = await req.json();

            await createGroupSchema.validate({ name, leaderId, isPublic });

            const result = await GroupService.createGroup({ name, leaderId, isPublic });

            if (!result.success) {
                return NextResponse.json(createResult(false, null, result.message || "Grup oluşturulamadı"), { status: 400 });
            }

            return NextResponse.json(createResult(true, null), { status: 201 });
        } catch (error: any) {
            console.error("Create Group Error:", error);
            if (error.name === 'ValidationError') {
                return NextResponse.json(createResult(false, null, "Invalid data"), { status: 400 });
            }
            return NextResponse.json(createResult(false, null, "Grup oluşturulurken hata oluştu"), { status: 500 });
        }
    },
    getGroupById: async (req: NextRequest, groupId: string): Promise<ResultResponse<null>> => {
        try {
            const clientId = req.headers.get('x-user-id');
            if (!clientId) {
                return NextResponse.json(createResult(false, null, "Yetkilendirilmemiş işlem"), { status: 401 });
            }
            const isPermisible = await GroupService.checkGroupPermission(groupId, clientId);
            if (!isPermisible.success) {
                if (isPermisible.message) {
                    return NextResponse.json(createResult(false, null, isPermisible.message), { status: 400 });
                }
                const limitedResult = await GroupService.getLimitedGroupById(groupId);
                return NextResponse.json(createResult(true, limitedResult.data), { status: 200 });
            }

            const result = await GroupService.getGroupById(groupId);
            if (!result.success) {
                return NextResponse.json(createResult(false, null, result.message || "Grup bulunamadı"), { status: 404 });
            }
            return NextResponse.json(createResult(true, result.data));
        } catch (error) {
            console.error("Get Group Error:", error);
            return NextResponse.json(createResult(false, null, "Grup bilgileri getirilirken hata oluştu"), { status: 500 });
        }
    }
}