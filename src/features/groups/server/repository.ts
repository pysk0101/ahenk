import prisma from "@/src/lib/database/prisma";
import { IGroupRepository } from "./interfaces";
import { createResult } from "@/src/utils/returnFunctions";

export const GroupRepository: IGroupRepository = {
    createGroup: async (data): Promise<Result<null>> => {
        try {
            await prisma.$transaction(async (prisma) => {
                const group = await prisma.group.create({
                    data: {
                        name: data.name,
                        leaders: {
                            connect: { id: data.leaderId },
                        },
                    },
                });
                
                await prisma.group.update({
                    where: {
                        id: group.id,
                    },
                    data: {
                        members: {
                            connect: { id: data.leaderId },
                        },
                    },
                });
            });
            return createResult(true, null);
        } catch (error) {
            console.error("Group Repository Error:", error);
            return createResult(false, null, "Grup oluşturulamadı");
        }
    },
    getGroupsByUserId: async (userId: string): Promise<Result<{ name: string; id: string }[] | null[]>> => {
        try {
            const groups = await prisma.group.findMany({
                where: {
                    members: {
                        some: {
                            id: userId,
                        },
                    },
                }
                   ,
                select: {
                    name: true,
                    id: true,
                },
            });
            return createResult(true, groups);
        } catch (error) {
            console.error("Group Repository Error:", error);
            return createResult(false, [], "Gruplar getirilemedi");
        }
    }
    
}