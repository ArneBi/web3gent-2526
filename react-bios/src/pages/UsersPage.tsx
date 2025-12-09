import { useQuery } from "@tanstack/react-query";
import React from "react";
import Axios from "axios";

const UsersPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["fetchUsers"],
    queryFn: () =>
      Axios.get("http://localhost:5001/users", { withCredentials: true }),
  });

  if (isLoading) {
    return <p>Loading....</p>;
  }

  return (
    <div>
      {data?.data.map((u) => (
        <p key={u.id} className="text-4xl font-bold">
          {u.email}
        </p>
      ))}
    </div>
  );
};

export default UsersPage;
