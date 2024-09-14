import { auth } from "@/services/auth";

export const GET = auth((req: Request & { auth?: boolean }) => {
  if (req.auth) {
    return Response.json({ data: "Protected data" });
  }

  return Response.json({ message: "Not authenticated" }, { status: 401 });
});
