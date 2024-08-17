"use client";
import React from "react";
import SignupWithPassword from "../SignupWithPassword";

export default function Signup({ error }: { error: string | undefined }) {
  return (
    <>
      {/* <GoogleSigninButton text="Sign in" /> */}

      <div className="my-6 flex items-center justify-center">
        <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
        <div className="block w-full min-w-fit bg-white px-3 text-center font-medium dark:bg-gray-dark">
          Sign up with email
        </div>
        <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
      </div>
      {error && (
        <div className="text-sm text-red-600" role="alert">
          Invalid details
        </div>
      )}
      <div>
        <SignupWithPassword />
      </div>

      <div className="mt-6 text-center">
        <p>Don&apos;t have any account? Contact Admin</p>
      </div>
    </>
  );
}
