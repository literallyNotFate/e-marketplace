import Navbar from "./Navbar";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function NavbarStatic() {
    const session = await getServerSession(authOptions);
    return <Navbar session={session}/>
}

export default NavbarStatic
