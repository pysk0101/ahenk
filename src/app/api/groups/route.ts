import { NextRequest} from "next/server";
import {GroupController} from "@/src/app/controllers/groups-controller";

export async function POST(req: NextRequest) {
    return  GroupController.createGroup(req);
}

export async function GET(req: NextRequest) {
    return  GroupController.getGroupsByUserId(req);
}