import { Button } from "@/components/ui/button";
import PeopleTable from "@/components/people/PeopleTable";
import { useAuth } from "@/hooks";

const Dashboard = () => {
  const { handleLogout, user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            {user && (
              <p className="text-gray-600 mt-1">Welcome back, {user.name}</p>
            )}
          </div>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">People</h2>
          <PeopleTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
