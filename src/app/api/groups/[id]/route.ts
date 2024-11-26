import { NextRequest } from "next/server";
import { GroupController } from "@/src/app/controllers/groups-controller";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    return GroupController.getGroupById(req, params.id);
}