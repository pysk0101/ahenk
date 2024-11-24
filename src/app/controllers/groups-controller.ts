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
            const { name } = await req.json();

            await createGroupSchema.validate({ name, leaderId });

            const result = await GroupService.createGroup({ name, leaderId });

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
    getGroupsByUserId : async (req : NextRequest)  : Promise<ResultResponse<null>>=> {
        try {
            const userId = req.headers.get('x-user-id');
            if (!userId) {
                return NextResponse.json(createResult(false, null, "Yetkilendirilmemiş işlem"), { status: 401 });
            }
            const result = await GroupService.getGroupsByUserId(userId);

            if (!result.success) {
                return NextResponse.json(createResult(false, null, result.message || "Gruplar getirilemedi"), { status: 400 });
            }

            return NextResponse.json(createResult(true, result.data), { status: 200 });
        } catch (error) {
            console.error("Get Groups Error:", error);
            return NextResponse.json(createResult(false, null, "Gruplar getirilirken hata oluştu"), { status: 500 });    
        }
    }

}