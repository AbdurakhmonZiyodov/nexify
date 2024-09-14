import { User } from "@/api/api.types";
import { map } from "lodash";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import { useCallback } from "react";

const UserItem = ({ image, firstName, lastName, email, phone, age }: User) => (
  <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
    <Image
      src={image}
      width={200}
      height={200}
      alt={`${firstName} ${lastName}`}
      className="rounded-full w-24 h-24 mb-4"
    />
    <h2 className="text-xl font-semibold">
      {firstName} {lastName}
    </h2>
    <p className="text-gray-600 mb-2">{email}</p>
    <p className="text-gray-500">Phone: {phone}</p>
    <p className="text-gray-500">Age: {age}</p>
  </div>
);

function Users({ users = [] }: { users: User[] }) {
  const renderUser = useCallback(
    (user: User) => <UserItem {...user} key={user.id} />,
    []
  );
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Users </h1>
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6">
        {map(users, renderUser)}
      </div>
    </div>
  );
}

export default observer(Users);
