import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Dashboard = async () => {  
  
  const session = await auth()

  if (!session?.user) redirect("/login");

  const isAdmin = session?.user?.role == "ADMIN";

  return (
    <div>Welcome, {isAdmin ? "Admin" : "User"}!</div>
  )
}

export default Dashboard;