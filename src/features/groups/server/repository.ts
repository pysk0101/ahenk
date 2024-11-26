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
                        isPublic: data.isPublic,
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
    isGroupPublic: async (groupId: string): Promise<Result<null>> => {
        try {
            const data = await prisma.group.findUnique({
                where: {
                    id: groupId,
                },
                select: {
                    isPublic: true,
                }
            })
            if (!data) {
                return createResult(false, null, "Grup bulunamadı");
            }

            if (!data.isPublic) {
                return createResult(false, null);
            }
            return createResult(true, null);
        } catch (error) {
            console.error("Group Repository Error:", error);
            return createResult(false, null, "Grup sorgulamada hata oluştu");
        }
    },
    isUserMember: async (groupId: string, clientId: string): Promise<Result<null>> => {
        try {
            const data = await prisma.group.findFirst({
                where: {
                    id: groupId,
                    members: {
                        some: {
                            id: clientId,
                        },
                    },
                },
            });

            if (!data) {
                return createResult(false, null);
            }
            return createResult(true, null);
        } catch (error) {
            console.error("Group Repository Error:", error);
            return createResult(false, null, "Kullacının katılımcı olduğu sorgulanırken hata oluştu");
        }
    },
    getLimitedGroupById: async (groupId: string): Promise<Result<
        {
            id: string;
            name: string;
            isPublic: boolean;
            leadersId: { id: string, name: string }[];
            membersCount: number;
        }
        | null>> => {
        try {
            const group = await prisma.group.findFirst({
                where: {
                    id: groupId,
                },
                select: {
                    id: true,
                    name: true,
                    isPublic: true,
                    leaders: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    members: {
                        select: {
                            id: true,
                        },
                    },
                },
            });

            if (!group) {
                return createResult(false, null, "Grup bulunamadı");
            }

            return createResult(true, {
                id: group.id,
                name: group.name,
                isPublic: group.isPublic,
                leadersId: group.leaders,
                membersCount: group.members.length,
            });
        } catch (error) {
            console.error("Group Repository Error:", error);
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
            const group = await prisma.group.findFirst({
                where: {
                    id: groupId,
                },
                select: {
                    id: true,
                    name: true,
                    isPublic: true,
                    leaders: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    members: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    projects: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    //events: {
                    //    select: {
                    //        id: true,
                    //        name: true,
                    //    },
                    //},
                },
            });

            if (!group) {
                return createResult(false, null, "Grup bulunamadı");
            }

            return createResult(true, {
                groupInfos: {
                    id: group.id,
                    name: group.name,
                    isPublic: group.isPublic,
                    leadersId: group.leaders,
                    membersCount: group.members.length,
                },
                members: group.members,
                projects: group.projects,
                //events: group.events,
            });
        } catch (error) {
            console.error("Group Repository Error:", error);
            return createResult(false, null, "Grup bilgileri getirilirken hata oluştu");
        }
    }
}