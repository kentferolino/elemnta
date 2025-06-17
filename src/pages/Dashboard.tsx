import { Button } from "@/components/ui/button";
import PeopleTable from "@/components/people/PeopleTable";
import { useAuth } from "@/hooks";

const Dashboard = () => {
  const { handleLogout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
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
