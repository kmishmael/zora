import api from "@/lib/axios/private";
import { Users } from "@/types/user";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { generateInitials } from "@/lib/utils";

export default async function UsersDashboard() {
  const usersData = (await api.get<Users>("/users")).data;

  return (
    <>
      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Name</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Email</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Role</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Branch</p>
        </div>
      </div>

      {usersData.users.map((user, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md">
                <Avatar className="">
                  <AvatarImage src="" />
                  <AvatarFallback>{generateInitials(user.name)}</AvatarFallback>
                </Avatar>
              </div>
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {user.name}
              </p>
            </div>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
              {user.email}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
              {user.role}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
              {user.branch_id}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}
